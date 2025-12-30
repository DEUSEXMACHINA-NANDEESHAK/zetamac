from datetime import datetime
from zoneinfo import ZoneInfo

IST = ZoneInfo("Asia/Kolkata")
MAGIC_PASSWORD = "WolfieIsHere@!%)#@))!"


def current_ist_datetime():
    return datetime.now(IST)


def expected_magic_phrase() -> str:
    today_ist = current_ist_datetime().strftime("%Y-%m-%d")
    return f"{today_ist}{MAGIC_PASSWORD}"
