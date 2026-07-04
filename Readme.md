# 🛡️ CyberShield AI

CyberShield AI is an AI-powered Network Intrusion Detection and Security Operations Center (SOC) platform that monitors network traffic, detects cyber attacks in real time using Machine Learning, visualizes security analytics, and assists security analysts in responding to threats.

---

## 🚀 Features

- 🔐 Secure JWT Authentication
- 👥 Role-Based User Management
- 📊 Real-Time Security Dashboard
- 🤖 AI-Powered Attack Detection
- 📡 Live Network Traffic Monitoring
- 🚨 Real-Time Alerts
- 📂 Incident Management
- 📈 Security Analytics
- 🛡 MITRE ATT&CK Mapping
- 📜 Event & Activity Logs
- 📥 PDF & Excel Report Generation
- 🌍 Attack Source Visualization
- 💡 AI-Based Security Recommendations
- 📦 Packet Capture Monitoring
- ❤️ System Health Monitoring
- 📉 Risk Score Analysis

---

# 🏗️ Project Architecture

```
                 Network Traffic
                        │
                        ▼
              Packet Capture Engine
                        │
                        ▼
              Feature Extraction Engine
                        │
                        ▼
          Machine Learning Prediction
                        │
                        ▼
      Attack Classification & Risk Score
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
 Incident Management             Alert Generation
        │                               │
        └───────────────┬───────────────┘
                        ▼
               SOC Dashboard
```

---

# 🧠 Machine Learning

Dataset:
- MSCAD (Multi-Step Cyber Attack Dataset)

Model:
- Random Forest Classifier

Evaluation Metrics:
- Accuracy
- Precision
- Recall
- F1 Score

Detected Attack Types:
- Normal
- Brute Force
- HTTP DDoS
- ICMP Flood
- Port Scan
- Web Crawling

---

# 💻 Tech Stack

## Frontend

- React.js
- Vite
- Axios
- Chart.js
- Leaflet
- React Router
- React Icons
- React Toastify

## Backend

- FastAPI
- Python
- SQLite
- Pandas
- NumPy
- Scikit-Learn
- Joblib
- Scapy
- JWT Authentication
- Bcrypt

---

# 📂 Project Structure

```
CyberShield/
│
├── backend/
│   ├── auth/
│   ├── capture/
│   ├── database/
│   ├── services/
│   ├── utils/
│   ├── predictor.py
│   ├── schemas.py
│   └── main.py
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── dataset/
│
├── requirements.txt
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CyberShield-AI.git

cd CyberShield-AI
```

---

## Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn backend.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔑 Default Login

Administrator

```
Username : admin
Password : admin123
```

---

# 📊 Dashboard Modules

- Dashboard
- Live Traffic
- Alerts
- Analytics
- Reports
- Incidents
- Users
- Event Logs
- Activity Logs
- Settings

---



---

# 🌐 Deployment

Frontend

- Vercel

Backend

- Render

---

# 🔮 Future Enhancements

- Docker Support
- Kubernetes Deployment
- PostgreSQL Integration
- SIEM Integration
- Threat Intelligence APIs
- Real-Time Packet Streaming
- AI Explainability Dashboard
- Multi-Factor Authentication
- Email & SMS Alerting
- Cloud Deployment on AWS

---

# 👨‍💻 Author

**Manoj Kumar**

Bachelor of Engineering (Computer Science & Engineering)

Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM)

---

# 📄 License

This project is developed for educational and research purposes.