from pydantic import BaseModel, Field

class ScoreCreateRequest(BaseModel):
    value: int = Field(..., gt=0)
    magic_phrase: str


class ScoreCreateResponse(BaseModel):
    success: bool
    message: str
