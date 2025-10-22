from fastapi import FastAPI, Depends
# from sqlalchemy import text
from sqlalchemy.orm import Session
from database import Base, engine
from routes.user_routes import router as user_router
from routes.transaction_routes import router as transaction_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(transaction_router)


# rota raiz
@app.get("/")
def root():
    return {"message": "server rodando"}