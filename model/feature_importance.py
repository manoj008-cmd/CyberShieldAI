import joblib
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Load model
model = joblib.load(BASE_DIR / "model" / "model.pkl")

# Load dataset
df = pd.read_csv(BASE_DIR / "dataset" / "MSCAD.csv")

# Clean column names
df.columns = df.columns.str.replace("'", "", regex=False).str.strip()

X = df.drop("Label", axis=1)

# Get feature importance
importance = model.feature_importances_

feature_importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": importance
})

feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)

print(feature_importance.head(20))

plt.figure(figsize=(12,8))
plt.barh(
    feature_importance["Feature"][:15],
    feature_importance["Importance"][:15]
)

plt.gca().invert_yaxis()
plt.title("Top 15 Important Features")
plt.tight_layout()

plt.savefig(BASE_DIR / "model" / "feature_importance.png")

plt.show()