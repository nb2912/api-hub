from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api import deps
from app.core import security
from app.core.config import settings
from app.db.session import get_db
from app.models.api_hub import User
from app.schemas.user import User as UserSchema, UserCreate
from app.schemas.token import Token

router = APIRouter()

@router.post("/register", response_model=UserSchema)
def register(*, db: Session = Depends(get_db), user_in: UserCreate) -> Any:
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = db.query(User).filter(User.username == user_in.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username taken")
    db_obj = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=security.get_password_hash(user_in.password),
        full_name=user_in.full_name,
        is_admin=user_in.is_admin,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.post("/login", response_model=Token)
def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(user.id, expires_delta=access_token_expires),
        "token_type": "bearer",
    }

@router.get("/me", response_model=UserSchema)
def get_me(current_user: User = Depends(deps.get_current_active_user)) -> Any:
    return current_user
