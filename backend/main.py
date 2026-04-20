from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import auth, apis, playground, keys, analytics, ratings
from app.db.session import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json")

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(apis.router, prefix=f"{settings.API_V1_STR}/apis", tags=["APIs"])
app.include_router(playground.router, prefix=f"{settings.API_V1_STR}/playground", tags=["Playground"])
app.include_router(keys.router, prefix=f"{settings.API_V1_STR}/keys", tags=["API Keys"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_STR}/analytics", tags=["Analytics"])
app.include_router(ratings.router, prefix=f"{settings.API_V1_STR}/ratings", tags=["Ratings"])

@app.get("/")
def root():
    return {"message": "Student API Hub API", "docs": "/docs"}
