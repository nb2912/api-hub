from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = True
    is_admin: Optional[bool] = False

class UserCreate(UserBase):
    email: EmailStr
    username: str
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    class Config: from_attributes = True

class EndpointSchema(BaseModel):
    path: str
    method: str
    description: Optional[str] = None

class APIBase(BaseModel):
    name: str
    description: Optional[str] = None
    base_url: str
    github_url: Optional[str] = None
    category: Optional[str] = None
    endpoints: List[EndpointSchema] = []

class APICreate(APIBase): pass
class APIUpdate(APIBase): pass
class APIResponse(APIBase):
    id: int
    owner_id: int
    created_at: datetime
    class Config: from_attributes = True

class APIKeyBase(BaseModel): name: str
class APIKeyCreate(APIKeyBase): pass
class APIKeyResponse(APIKeyBase):
    id: int
    key_value: str
    created_at: datetime
    is_active: bool
    class Config: from_attributes = True

class PlaygroundRequest(BaseModel):
    method: str
    url: str
    headers: Optional[Dict[str, str]] = {}
    body: Optional[Any] = None

class PlaygroundResponse(BaseModel):
    status_code: int
    content: Any
    headers: Dict[str, str]
    time: float

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[int] = None
