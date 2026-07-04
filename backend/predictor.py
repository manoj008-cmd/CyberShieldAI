from backend.model_loader import model, encoder
import numpy as np

def predict_attack(features):

    X = np.array(features).reshape(1, -1)

    prediction = model.predict(X)[0]

    probabilities = model.predict_proba(X)[0]

    print("Prediction:", prediction)
    print("Probabilities:", probabilities)

    confidence = probabilities[prediction]

    attack = encoder.inverse_transform([prediction])[0]

    return {
        "prediction": attack,
        "confidence": round(float(confidence * 100), 2)
    }