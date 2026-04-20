import secrets
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.api_hub import APIKey, User
from app.schemas.api import APIKeyCreate, APIKeyResponse

router = APIRouter()

@router.get("/", response_model=List[APIKeyResponse])
def read_keys(db: Session = Depends(get_db), current_user: User = Depends(deps.get_current_active_user)) -> Any:
    return db.query(APIKey).filter(APIKey.user_id == current_user.id).all()

@router.post("/", response_model=APIKeyResponse)
def create_key(*, db: Session = Depends(get_db), key_in: APIKeyCreate, current_user: User = Depends(deps.get_current_active_user)) -> Any:
    new_key = f"sk_{secrets.token_urlsafe(32)}"
    db_obj = APIKey(key_value=new_key, name=key_in.name, user_id=current_user.id)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.delete("/{key_id}")
def delete_key(key_id: int, db: Session = Depends(get_db), current_user: User = Depends(deps.get_current_active_user)) -> Any:
    key = db.query(APIKey).filter(APIKey.id == key_id, APIKey.user_id == current_user.id).first()
    if not key:
        raise HTTPException(status_code=404, detail="Key not found")
    db.delete(key)
    db.commit()
    return {"detail": "Key deleted"}
