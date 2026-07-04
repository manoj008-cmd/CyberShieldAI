from sklearn.ensemble import RandomForestClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import accuracy_score
import joblib
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent

# Load processed data
X_train, X_test, y_train, y_test = joblib.load(
    BASE_DIR / "model" / "processed_data.pkl"
)

print("Training started...")
print("Training samples:", len(X_train))
print("Testing samples :", len(X_test))

# Base Random Forest
rf = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

# Calibrated Model
model = CalibratedClassifierCV(
    estimator=rf,
    method="sigmoid",
    cv=5
)

# Train
model.fit(X_train, y_train)
import numpy as np

# Average feature importances from all calibrated classifiers
importances = np.mean(
    [
        clf.estimator.feature_importances_
        for clf in model.calibrated_classifiers_
    ],
    axis=0,
)

importance = pd.DataFrame({
    "Feature": X_train.columns,
    "Importance": importances,
})
importance = importance.sort_values(
    by="Importance",
    ascending=False
)

print("\nTop 10 Important Features")
print(importance.head(10))

importance.to_csv(
    BASE_DIR / "model" / "feature_importance.csv",
    index=False
)

print("\nFeature importance saved.")
print("Training completed!")

# Evaluate
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"\nAccuracy : {accuracy * 100:.2f}%")

# Save
joblib.dump(model, BASE_DIR / "model" / "model.pkl")

print("\nModel Saved Successfully")