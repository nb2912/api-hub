from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.api import deps
from app.db.session import get_db
from app.models.api_hub import API, User
from app.schemas.api import APICreate, APIResponse, APIUpdate

router = APIRouter()

@router.get("/", response_model=List[APIResponse])
def read_apis(db: Session = Depends(get_db), skip: int = 0, limit: int = 100, search: Optional[str] = None) -> Any:
    query = db.query(API)
    if search:
        query = query.filter(or_(API.name.ilike(f"%{search}%"), API.description.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.post("/", response_model=APIResponse)
def create_api(*, db: Session = Depends(get_db), api_in: APICreate, current_user: User = Depends(deps.get_current_active_user)) -> Any:
    api = API(**api_in.model_dump(), owner_id=current_user.id)
    db.add(api)
    db.commit()
    db.refresh(api)
    return api

@router.get("/my-apis", response_model=List[APIResponse])
def read_my_apis(db: Session = Depends(get_db), current_user: User = Depends(deps.get_current_active_user)) -> Any:
    return db.query(API).filter(API.owner_id == current_user.id).all()

@router.get("/{api_id}", response_model=APIResponse)
def read_api(api_id: int, db: Session = Depends(get_db)) -> Any:
    api = db.query(API).filter(API.id == api_id).first()
    if not api:
        raise HTTPException(status_code=404, detail="API not found")
    return api
