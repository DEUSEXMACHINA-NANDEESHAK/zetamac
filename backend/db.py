from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os

# Load environment variables explicitly
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not set")

# Mongo client (single instance for entire app)
mongo_client = AsyncIOMotorClient(MONGO_URI)

# Database & collection handles
database = mongo_client["nandeeshak"]
scores_collection = database["scores"]


async def verify_mongo_connection() -> None:
    """Ping MongoDB to verify connectivity on startup."""
    await mongo_client.admin.command("ping")
