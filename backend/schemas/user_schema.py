from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class UserDelete(BaseModel):
    id: int

class UserResponse(UserBase):
    id: int
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    

class Config:
    orm_mode = True