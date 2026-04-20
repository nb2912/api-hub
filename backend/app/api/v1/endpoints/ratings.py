from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.api import deps
from app.db.session import get_db
from app.models.api_hub import Rating, API
from app.models.user import User

router = APIRouter()

class RatingCreate(BaseModel):
    score: int
    comment: str
    api_id: int

@router.post("/", response_model=Any)
def create_rating(
    *,
    db: Session = Depends(get_db),
    rating_in: RatingCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if rating_in.score < 1 or rating_in.score > 5:
        raise HTTPException(status_code=400, detail="Score must be between 1 and 5")
    
    api_obj = db.query(API).filter(API.id == rating_in.api_id).first()
    if not api_obj:
        raise HTTPException(status_code=404, detail="API not found")
    
    db_obj = Rating(
        score=rating_in.score,
        comment=rating_in.comment,
        api_id=rating_in.api_id,
        user_id=current_user.id
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/api/{api_id}", response_model=List[Any])
def get_api_ratings(api_id: int, db: Session = Depends(get_db)) -> Any:
    return db.query(Rating).filter(Rating.api_id == api_id).all()
