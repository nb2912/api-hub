from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Float, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    apis = relationship("API", back_populates="owner")
    api_keys = relationship("APIKey", back_populates="user")
    ratings = relationship("Rating", back_populates="user")

class API(Base):
    __tablename__ = "apis"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text)
    base_url = Column(String, nullable=False)
    github_url = Column(String, nullable=True)
    category = Column(String, index=True)
    endpoints = Column(JSON)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    owner = relationship("User", back_populates="apis")
    ratings = relationship("Rating", back_populates="api")
    analytics = relationship("Analytics", back_populates="api")

class APIKey(Base):
    __tablename__ = "api_keys"
    id = Column(Integer, primary_key=True, index=True)
    key_value = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="api_keys")

class Rating(Base):
    __tablename__ = "ratings"
    id = Column(Integer, primary_key=True, index=True)
    score = Column(Integer, nullable=False)
    comment = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))
    api_id = Column(Integer, ForeignKey("apis.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="ratings")
    api = relationship("API", back_populates="ratings")

class Analytics(Base):
    __tablename__ = "analytics"
    id = Column(Integer, primary_key=True, index=True)
    api_id = Column(Integer, ForeignKey("apis.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    endpoint = Column(String)
    method = Column(String)
    status_code = Column(Integer)
    response_time = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    api = relationship("API", back_populates="analytics")
