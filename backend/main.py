from fastapi import FastAPI
from db import scores_collection, verify_mongo_connection
from models import ScoreCreateRequest

app = FastAPI(title="Nandeeshak API")

@app.on_event("startup")
async def on_startup():
    await verify_mongo_connection()
    print("✅ MongoDB connected successfully")


@app.get("/scores")
async def get_scores():
    return []
