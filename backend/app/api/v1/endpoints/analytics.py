from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.api import deps
from app.db.session import get_db
from app.models.api_hub import Analytics, API, User

router = APIRouter()

@router.get("/stats", response_model=Any)
def get_user_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    # Total calls to user's APIs
    total_calls = db.query(func.count(Analytics.id))\
        .join(API)\
        .filter(API.owner_id == current_user.id)\
        .scalar()
    
    # Calls per API
    api_breakdown = db.query(API.name, func.count(Analytics.id).label('count'))\
        .join(Analytics)\
        .filter(API.owner_id == current_user.id)\
        .group_by(API.id)\
        .all()
    
    return {
        "total_calls": total_calls or 0,
        "api_breakdown": [{"name": name, "calls": count} for name, count in api_breakdown]
    }

@router.get("/global-top", response_model=List[Any])
def get_top_apis(db: Session = Depends(get_db)) -> Any:
    top_apis = db.query(API.name, func.count(Analytics.id).label('count'))\
        .join(Analytics)\
        .group_by(API.id)\
        .order_by(func.count(Analytics.id).desc())\
        .limit(5)\
        .all()
    return [{"name": name, "calls": count} for name, count in top_apis]

@router.get("/global-stats", response_model=Any)
def get_global_stats(db: Session = Depends(get_db)) -> Any:
    total_apis = db.query(func.count(API.id)).scalar()
    total_users = db.query(func.count(User.id)).scalar()
    total_requests = db.query(func.count(Analytics.id)).scalar()
    return {
        "total_apis": total_apis or 0,
        "total_users": total_users or 0,
        "total_requests": total_requests or 0,
        "avg_uptime": "99.9%"
    }
