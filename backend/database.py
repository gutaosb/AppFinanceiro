from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

#carrega variaveis do dotenv
load_dotenv()

#le url do banco
DB_URL = os.getenv("DB_URL")

#cria o mecanismo de conexao
engine = create_engine(DB_URL)

#cria uma sessao para enviar consultas
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#base para os modelos ORM
Base = declarative_base()