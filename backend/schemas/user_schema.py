from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None

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