import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
BASE_DIR = Path(__file__).resolve().parent.parent
csv_path = BASE_DIR / "dataset" / "MSCAD.csv"

df = pd.read_csv(csv_path)

print("Dataset Loaded Successfully!")
print("Shape:", df.shape)

# Remove extra quotes from column names
df.columns = df.columns.str.replace("'", "", regex=False).str.strip()

# Display attack classes
print("\nAttack Classes:")
print(df["Label"].value_counts())

# Split Features and Label
X = df.drop("Label", axis=1)
y = df["Label"]

# Encode labels
encoder = LabelEncoder()
y = encoder.fit_transform(y)

# Save encoder
joblib.dump(encoder, BASE_DIR / "model" / "label_encoder.pkl")

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining Samples:", len(X_train))
print("Testing Samples :", len(X_test))

# Save processed data
joblib.dump((X_train, X_test, y_train, y_test),
            BASE_DIR / "model" / "processed_data.pkl")

print("\nPreprocessing Completed Successfully!")