from pydantic import BaseModel, Field
from datetime import datetime
class CreateScoreRequest(BaseModel):
    value: int = Field(..., gt=0)
    magic_phrase: str
class CreateScoreResponse(BaseModel):
    success: bool
    message: str


class FetchScoreFromDBResponse(BaseModel):
    value: int
    timestamp: datetime

