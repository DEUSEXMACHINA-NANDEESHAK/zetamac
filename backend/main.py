from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from db import scores_collection, verify_mongo_connection
from models import CreateScoreRequest, CreateScoreResponse
from utils import current_ist_datetime, expected_magic_phrase
from typing import List
from models import FetchScoreFromDBResponse
app = FastAPI(title="Zetamac API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "http://localhost:5173",          # local dev
        "https://nandeeshak.com",          # prod
        "https://www.nandeeshak.com",      # prod
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await verify_mongo_connection()
    print("✅ MongoDB connected successfully")


@app.post("/scores", response_model=CreateScoreResponse)
async def create_score(payload: CreateScoreRequest):
    if payload.magic_phrase != expected_magic_phrase():
        raise HTTPException(
            status_code=401,
            detail="Invalid magic phrase"
        )

    # 2. Generate IST timestamp
    now_ist = current_ist_datetime()

    # 3. Prepare DB document
    document = {
        "value": payload.value,
        "timestamp": now_ist,
        "date": now_ist.strftime("%Y-%m-%d"),
        "created_at": now_ist,
    }

    # 4. Insert into MongoDB
    await scores_collection.insert_one(document)

    # 5. Respond
    return {
        "success": True,
        "message": "Score saved successfully"
    }


@app.get("/scores", response_model=List[FetchScoreFromDBResponse])
async def get_scores():
    cursor = scores_collection.find(
        {},
        {"_id": 0, "value": 1, "timestamp": 1}
    ).sort("timestamp", 1)

    scores = []
    async for doc in cursor:
        scores.append(doc)

    return scores
