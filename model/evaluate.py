import joblib
from pathlib import Path
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay
)
import matplotlib.pyplot as plt

# Project directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load processed data
X_train, X_test, y_train, y_test = joblib.load(
    BASE_DIR / "model" / "processed_data.pkl"
)

# Load trained model
model = joblib.load(BASE_DIR / "model" / "model.pkl")

# Load label encoder
encoder = joblib.load(BASE_DIR / "model" / "label_encoder.pkl")

# Predict
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print("=" * 60)
print(f"Accuracy : {accuracy * 100:.2f}%")
print("=" * 60)

# Classification Report
print("\nClassification Report:\n")
print(classification_report(
    y_test,
    y_pred,
    target_names=encoder.classes_
))

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)

disp = ConfusionMatrixDisplay(
    confusion_matrix=cm,
    display_labels=encoder.classes_
)

disp.plot(xticks_rotation=45)

plt.title("Confusion Matrix")
plt.tight_layout()

# Save image
plt.savefig(BASE_DIR / "model" / "confusion_matrix.png")

plt.show()