import pandas as pd
from pathlib import Path

# Project root folder
BASE_DIR = Path(__file__).resolve().parent.parent

# Path to dataset
csv_path = BASE_DIR / "dataset" / "MSCAD.csv"

print("Dataset path:", csv_path)

# Load dataset
df = pd.read_csv(csv_path)

print("=" * 50)
print("First 5 Rows")
print(df.head())

print("=" * 50)
print("Shape")
print(df.shape)

print("=" * 50)
print("Columns")
print(df.columns.tolist())

print("=" * 50)
print("Missing Values")
print(df.isnull().sum())