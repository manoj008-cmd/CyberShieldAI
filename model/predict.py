import joblib
from pathlib import Path
import pandas as pd

# Project directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load model
model = joblib.load(BASE_DIR / "model" / "model.pkl")

# Load label encoder
encoder = joblib.load(BASE_DIR / "model" / "label_encoder.pkl")

# Load dataset
df = pd.read_csv(BASE_DIR / "dataset" / "MSCAD.csv")

# Remove extra quotes from column names
df.columns = df.columns.str.replace("'", "", regex=False).str.strip()

# Features only
X = df.drop("Label", axis=1)

# Select one sample
sample = X.iloc[[0]]

# Predict
prediction = model.predict(sample)

# Decode prediction
attack_name = encoder.inverse_transform(prediction)

print("=" * 50)
print("Prediction Result")
print("=" * 50)
print("Predicted Attack:", attack_name[0])