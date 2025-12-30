from fastapi import FastAPI, HTTPException
from db import scores_collection, verify_mongo_connection
from models import ScoreCreateRequest, ScoreCreateResponse
from utils import current_ist_datetime, expected_magic_phrase

app = FastAPI(title="Zetamac API")


@app.on_event("startup")
async def on_startup():
    await verify_mongo_connection()
    print("✅ MongoDB connected successfully")


@app.post("/scores", response_model=ScoreCreateResponse)

async def create_score(payload: ScoreCreateRequest):
    # 1. Validate magic phrase
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
