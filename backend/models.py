from pydantic import BaseModel, Field

class ScoreCreateRequest(BaseModel):
    value: int = Field(..., gt=0, description="ZETAMAC COUNT")
    magic_phrase: str
