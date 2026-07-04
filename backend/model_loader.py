import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

model = joblib.load(BASE_DIR / "model" / "model.pkl")
encoder = joblib.load(BASE_DIR / "model" / "label_encoder.pkl")