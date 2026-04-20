import httpx
import time
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.api_hub import Analytics, API, User
from app.schemas.api import PlaygroundRequest, PlaygroundResponse

router = APIRouter()

@router.post("/proxy", response_model=PlaygroundResponse)
async def proxy_request(*, db: Session = Depends(get_db), req: PlaygroundRequest, current_user: User = Depends(deps.get_current_active_user)) -> Any:
    start_time = time.time()
    try:
        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=req.method,
                url=req.url,
                headers=req.headers,
                json=req.body if req.method in ["POST", "PUT", "PATCH"] else None,
                timeout=10.0
            )
            duration = time.time() - start_time
            
            # Log Analytics
            # Find API by URL (simple logic for MVP)
            api_obj = db.query(API).filter(API.base_url.in_([req.url.split('/')[0] + '//' + req.url.split('/')[2]])).first()
            if api_obj:
                analytics = Analytics(
                    api_id=api_obj.id,
                    user_id=current_user.id,
                    endpoint=req.url.replace(api_obj.base_url, ""),
                    method=req.method,
                    status_code=response.status_code,
                    response_time=duration
                )
                db.add(analytics)
                db.commit()

            return PlaygroundResponse(
                status_code=response.status_code,
                content=response.json() if "application/json" in response.headers.get("content-type", "") else response.text,
                headers=dict(response.headers),
                time=duration
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
