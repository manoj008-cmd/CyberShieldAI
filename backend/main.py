from unittest import result

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from datetime import datetime
from threading import Thread
import pandas as pd
import random
from backend.services.email_service import send_alert
from backend.schemas import PredictionInput
from backend.predictor import predict_attack
from backend.database.database import conn, cursor
from backend.capture.packet_capture import start_capture, packet_stats
from backend.schemas import LoginRequest
from backend.auth.auth import create_access_token
from backend.utils.security import hash_password, verify_password
import psutil 
from fastapi.responses import FileResponse
import csv
from openpyxl import Workbook
app = FastAPI(title="CyberShield AI")

# -----------------------------
# Start Packet Capture Thread
# -----------------------------
capture_thread = Thread(
    target=start_capture,
    daemon=True
)
capture_thread.start()
from fastapi.middleware.cors import CORSMiddleware
import os
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent

# -----------------------------
# Global Dataset Caching
# -----------------------------
try:
    df_global = pd.read_csv(BASE_DIR / "dataset" / "MSCAD.csv")
    df_global.columns = df_global.columns.str.replace("'", "", regex=False).str.strip()
except Exception as e:
    df_global = None
    print("Dataset Caching Error:", e)

notifications = []

# -----------------------------
# Home
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "CyberShield AI Running"
    }


# -----------------------------
# Dashboard
# -----------------------------
@app.get("/dashboard")
def dashboard():
    return {
        "threats": 128,
        "alerts": 52,
        "accuracy": "99.82%",
        "status": "ONLINE",
    }


# -----------------------------
# Predict API
# -----------------------------
@app.post("/predict")
def predict(data: PredictionInput):
    return predict_attack(data.features)


# -----------------------------
# Sample Prediction
# -----------------------------
@app.get("/sample")
def sample():
    global df_global
    if df_global is None:
        df_global = pd.read_csv(BASE_DIR / "dataset" / "MSCAD.csv")
        df_global.columns = df_global.columns.str.replace("'", "", regex=False).str.strip()

    row = df_global.sample(1)

    features = row.drop("Label", axis=1).values.tolist()[0]

    actual = row["Label"].values[0]

    result = predict_attack(features)

    result["actual"] = actual

    return result


# -----------------------------
# Live Prediction
# -----------------------------
@app.get("/live")
def live():
    global df_global
    if df_global is None:
        df_global = pd.read_csv(BASE_DIR / "dataset" / "MSCAD.csv")
        df_global.columns = df_global.columns.str.replace("'", "", regex=False).str.strip()

    cur = conn.cursor()
    try:
        row = df_global.sample(1)

        features = row.drop("Label", axis=1).values.tolist()[0]

        result = predict_attack(features)

        severities = ["Low", "Medium", "High", "Critical"]

        severity = (
            "Low"
            if result["prediction"] == "Normal"
            else random.choice(severities[1:])
        )

        cur.execute(
            """
            INSERT INTO attacks(
                time,
                ip,
                attack,
                confidence,
                severity
            )
            VALUES(?,?,?,?,?)
            """,
            (
                datetime.now().strftime("%H:%M:%S"),
                f"192.168.1.{random.randint(2,254)}",
                result["prediction"],
                result["confidence"],
                severity,
            ),
        )

        conn.commit()

        if result["prediction"] != "Normal":

            cur.execute(
                """
                INSERT INTO incidents(
                    attack,
                    ip,
                    severity,
                    confidence,
                    status,
                    created_at
                )
                VALUES(?,?,?,?,?,?)
                """,
                (
                    result["prediction"],
                    f"192.168.1.{random.randint(2,254)}",
                    severity,
                    result["confidence"],
                    "Open",
                    datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                ),
            )

            conn.commit()

            cur.execute("""
                INSERT INTO alerts(
                    attack,
                    ip,
                    severity,
                    confidence,
                    status,
                    created_at
                )
                VALUES(?,?,?,?,?,?)
            """,
            (
                result["prediction"],
                f"192.168.1.{random.randint(2,254)}",
                severity,
                result["confidence"],
                "New",
                datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            ))

            conn.commit()

        notifications.insert(
            0,
            {
                "time": datetime.now().strftime("%H:%M:%S"),
                "attack": result["prediction"],
                "confidence": result["confidence"],
            },
        )

        if len(notifications) > 20:
            notifications.pop()

        if (
            result["prediction"] != "Normal"
            and result["confidence"] >= 95
        ):
            try:
                send_alert(
                    result["prediction"],
                    result["confidence"],
                )
            except Exception as e:
                print("Email Error:", e)

        return {
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "severity": severity
        }
    finally:
        cur.close()
@app.get("/attacks")
def attacks(search: str = ""):

    cur = conn.cursor()

    if search == "":
        rows = cur.execute("""
            SELECT *
            FROM attacks
            ORDER BY id DESC
            LIMIT 100
        """).fetchall()
    else:
        rows = cur.execute("""
            SELECT *
            FROM attacks
            WHERE
                attack LIKE ?
                OR ip LIKE ?
                OR severity LIKE ?
            ORDER BY id DESC
        """, (
            f"%{search}%",
            f"%{search}%",
            f"%{search}%"
        )).fetchall()

    cur.close()

    return [
        {
            "id": row[0],
            "time": row[1],
            "ip": row[2],
            "attack": row[3],
            "confidence": row[4],
            "severity": row[5],
        }
        for row in rows
       
]
@app.get("/traffic")
def traffic():

    protocols = ["TCP", "UDP", "ICMP"]

    data = []

    for _ in range(15):

        packets = random.randint(200, 12000)

        if packets > 8000:
            status = "Attack"
        elif packets > 4000:
            status = "Suspicious"
        else:
            status = "Normal"

        data.append({
            "time": datetime.now().strftime("%H:%M:%S"),
            "protocol": random.choice(protocols),
            "packets": packets,
            "status": status
        })

    return data
@app.get("/importance")
def importance():

    return {
        "labels": [
            "Fwd Pkts/s",
            "Bwd Pkts/s",
            "Flow Pkts/s",
            "Init Bwd Win Byts",
            "Flow IAT Mean"
        ],
        "values": [
            0.158,
            0.084,
            0.079,
            0.071,
            0.067
        ]
    }
@app.get("/explanation")
def explanation():

    return {
        "prediction": "Brute_Force",
        "confidence": 99.84,
        "reason": "Repeated connection attempts and abnormal packet flow indicate a brute-force attack.",
        "features": [
            "Fwd Pkts/s",
            "Bwd Pkts/s",
            "Flow Pkts/s",
            "Init Bwd Win Byts"
        ]
    }
# -----------------------------
# Statistics
# -----------------------------
@app.get("/statistics")
def statistics():

    cur = conn.cursor()

    total = cur.execute(
        "SELECT COUNT(*) FROM attacks"
    ).fetchone()[0]

    brute = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE attack='Brute_Force'"
    ).fetchone()[0]

    normal = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE attack='Normal'"
    ).fetchone()[0]

    critical = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE severity='Critical'"
    ).fetchone()[0]

    cur.close()

    return {
        "total_attacks": total,
        "brute_force": brute,
        "normal": normal,
        "critical": critical,
    }
@app.get("/analytics")
def analytics():

    cur = conn.cursor()

    total = cur.execute(
        "SELECT COUNT(*) FROM attacks"
    ).fetchone()[0]

    brute = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE attack='Brute_Force'"
    ).fetchone()[0]

    normal = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE attack='Normal'"
    ).fetchone()[0]

    critical = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE severity='Critical'"
    ).fetchone()[0]

    attack_types = cur.execute("""
        SELECT attack, COUNT(*)
        FROM attacks
        GROUP BY attack
    """).fetchall()

    top_ips = cur.execute("""
        SELECT ip, COUNT(*)
        FROM attacks
        GROUP BY ip
        ORDER BY COUNT(*) DESC
        LIMIT 5
    """).fetchall()

    cur.close()

    return {
        "total": total,
        "brute_force": brute,
        "normal": normal,
        "critical": critical,
        "top_ips": [
            {
                "ip": ip,
                "count": count
            }
            for ip, count in top_ips
        ],
        "attack_distribution": [
            {
                "attack": attack,
                "count": count
            }
            for attack, count in attack_types
        ]
    }

@app.get("/capture")
def capture():
    return {
        "total": packet_stats["TOTAL"],
        "tcp": packet_stats["TCP"],
        "udp": packet_stats["UDP"],
        "icmp": packet_stats["ICMP"],
        "other": packet_stats["OTHER"],
    }
@app.get("/notifications")
def get_notifications():
    return notifications
@app.get("/incidents")
def incidents():

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT
            id,
            attack,
            ip,
            severity,
            confidence,
            status,
            created_at
        FROM incidents
        ORDER BY id DESC
    """).fetchall()

    cur.close()

    return [
        {
            "id": row[0],
            "attack": row[1],
            "ip": row[2],
            "severity": row[3],
            "confidence": row[4],
            "status": row[5],
            "created_at": row[6],
        }
        for row in rows
    ]
@app.post("/login")
def login(user: LoginRequest):
    print("Username received:", user.username)
    print("Password received:", user.password)

    cur = conn.cursor()
    try:
        # Find user
        print("Searching database...")
        row = cur.execute(
            """
            SELECT username, password, role
            FROM users
            WHERE username = ?
            """,
            (user.username,)
        ).fetchone()
        print("Database result:", row)
        if row is None:
            return {
                "success": False,
                "message": "User not found"
            }

        # Verify password
        if not verify_password(user.password, row[1]):
            return {
                "success": False,
                "message": "Invalid password"
            }

        # Store login event
        cur.execute(
            """
            INSERT INTO events(event, level, created_at)
            VALUES (?, ?, ?)
            """,
            (
                f"User '{row[0]}' logged in",
                "INFO",
                datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            )
        )

        # Store login history
        cur.execute(
            """
            INSERT INTO login_history(
                username,
                login_time,
                ip_address
            )
            VALUES (?, ?, ?)
            """,
            (
                row[0],
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "127.0.0.1"
            )
        )

        # Store activity log
        cur.execute(
            """
            INSERT INTO activity_logs(
                username,
                action,
                created_at
            )
            VALUES (?, ?, ?)
            """,
            (
                row[0],
                "Logged In",
                datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            )
        )

        conn.commit()

        token = create_access_token(row[0])

        return {
            "success": True,
            "token": token,
            "username": row[0],
            "role": row[2]
        }
    finally:
        cur.close()
    
@app.get("/attack/{attack_id}")
def attack_details(attack_id: int):

    cur = conn.cursor()

    row = cur.execute("""
        SELECT *
        FROM attacks
        WHERE id=?
    """, (attack_id,)).fetchone()

    cur.close()

    if row is None:
        return {"message": "Attack not found"}

    return {
        "id": row[0],
        "time": row[1],
        "ip": row[2],
        "attack": row[3],
        "confidence": row[4],
        "severity": row[5],
    }
    # ===========================
# USERS
# ===========================

@app.post("/users")
def add_user(user: LoginRequest):

    cur = conn.cursor()

    # Check if user already exists
    existing = cur.execute(
        "SELECT * FROM users WHERE username=?",
        (user.username,)
    ).fetchone()

    if existing:
        cur.close()
        return {
            "success": False,
            "message": "Username already exists"
        }

    # Hash password
    hashed_password = hash_password(user.password)

    cur.execute(
        """
        INSERT INTO users(username,password,role)
        VALUES(?,?,?)
        """,
        (
            user.username,
            hashed_password,
            "Analyst"
        )
    )

    conn.commit()
    cur.execute("""
INSERT INTO activity_logs(username, action, created_at)
VALUES (?, ?, ?)
""", (
    user.username,
    "User Created",
    datetime.now().strftime("%Y-%m-%d %H:%M:%S")
))

    conn.commit()
    cur.close()

    return {
        "success": True,
        "message": "User created successfully"
    }


@app.get("/users")
def get_users(role: str = ""):

    if role != "Administrator":
        return {
            "success": False,
            "message": "Access Denied"
        }

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT id, username, role
        FROM users
        ORDER BY id
    """).fetchall()

    cur.close()

    return [
        {
            "id": row[0],
            "username": row[1],
            "role": row[2]
        }
        for row in rows
    ]


@app.delete("/users/{id}")
def delete_user(id: int, role: str = ""):

    if role != "Administrator":
        return {
            "success": False,
            "message": "Access Denied"
        }

    cur = conn.cursor()

    cur.execute(
        "DELETE FROM users WHERE id=?",
        (id,)
    )

    conn.commit()
    cur.execute("""
INSERT INTO activity_logs(username, action, created_at)
VALUES (?, ?, ?)
""", (
    "Administrator",
    f"Deleted User ID {id}",
    datetime.now().strftime("%Y-%m-%d %H:%M:%S")
))

    conn.commit()
    cur.close()

    return {
        "success": True,
        "message": "User deleted successfully"
    }
@app.get("/alerts")
def alerts():

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT *
        FROM alerts
        ORDER BY id DESC
    """).fetchall()

    cur.close()

    return [
        {
            "id": row[0],
            "attack": row[1],
            "ip": row[2],
            "severity": row[3],
            "confidence": row[4],
            "status": row[5],
            "created_at": row[6]
        }
        for row in rows
    ]
@app.put("/alerts/{id}")
def acknowledge_alert(id: int):

    cur = conn.cursor()

    cur.execute(
        "UPDATE alerts SET status='Acknowledged' WHERE id=?",
        (id,)
    )

    conn.commit()
    cur.close()

    return {
        "message": "Alert Acknowledged"
    }
@app.get("/history")
def attack_history():

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT time, attack
        FROM attacks
        ORDER BY id DESC
        LIMIT 50
    """).fetchall()

    cur.close()

    return [
        {
            "time": row[0],
            "attack": row[1]
        }
        for row in rows
    ]
@app.get("/response")
def ai_response():

    cur = conn.cursor()

    row = cur.execute("""
        SELECT attack,severity
        FROM attacks
        ORDER BY id DESC
        LIMIT 1
    """).fetchone()

    cur.close()

    if row is None:
        return {}

    attack = row[0]
    severity = row[1]

    actions = []

    if severity == "Critical":
        actions = [
            "Block Source IP",
            "Enable Firewall Rule",
            "Notify SOC Team",
            "Capture Network Packets",
            "Generate Incident Report"
        ]

    elif severity == "High":
        actions = [
            "Increase Firewall Protection",
            "Monitor Traffic",
            "Notify Administrator"
        ]

    elif severity == "Medium":
        actions = [
            "Monitor Network",
            "Log Activity"
        ]

    else:
        actions = [
            "No Action Required"
        ]

    return {
        "attack": attack,
        "severity": severity,
        "actions": actions
    }
@app.get("/system-health")
def system_health():

    cpu = psutil.cpu_percent(interval=1)

    ram = psutil.virtual_memory().percent

    disk = psutil.disk_usage("/").percent

    return {
        "cpu": cpu,
        "ram": ram,
        "disk": disk,
        "backend": "Online",
        "database": "Connected",
        "model": "Loaded"
    }
@app.get("/risk-score")
def risk_score():

    cur = conn.cursor()

    critical = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE severity='Critical'"
    ).fetchone()[0]

    high = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE severity='High'"
    ).fetchone()[0]

    medium = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE severity='Medium'"
    ).fetchone()[0]

    low = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE severity='Low'"
    ).fetchone()[0]

    cur.close()

    score = (
        critical * 5 +
        high * 3 +
        medium * 2 +
        low
    )

    score = min(score,100)

    if score >= 80:
        status = "Critical"

    elif score >= 50:
        status = "Medium"

    else:
        status = "Safe"

    return {
        "score": score,
        "status": status
    }
@app.get("/mitre")
def mitre_mapping():

    cur = conn.cursor()

    row = cur.execute("""
        SELECT attack
        FROM attacks
        ORDER BY id DESC
        LIMIT 1
    """).fetchone()

    cur.close()

    if row is None:
        return {}

    attack = row[0]

    mapping = {

        "Brute_Force": {
            "id": "T1110",
            "technique": "Brute Force"
        },

        "Port_Scan": {
            "id": "T1046",
            "technique": "Network Service Discovery"
        },

        "HTTP_DDoS": {
            "id": "T1498",
            "technique": "Network Denial of Service"
        },

        "SQL_Injection": {
            "id": "T1190",
            "technique": "Exploit Public-Facing Application"
        },

        "Normal": {
            "id": "-",
            "technique": "No Threat"
        }

    }

    return {
        "attack": attack,
        **mapping.get(
            attack,
            {
                "id": "-",
                "technique": "Unknown"
            }
        )
    }
@app.get("/recommendations")
def recommendations():

    cur = conn.cursor()

    row = cur.execute("""
        SELECT attack
        FROM attacks
        ORDER BY id DESC
        LIMIT 1
    """).fetchone()

    cur.close()

    if row is None:
        return {
            "attack": "Unknown",
            "actions": []
        }

    attack = row[0]

    recommendations = {

        "Brute_Force":[
            "Block Source IP",
            "Enable Account Lockout",
            "Notify SOC Team",
            "Capture Network Packets",
            "Reset User Password"
        ],

        "Port_Scan":[
            "Block Scanning IP",
            "Close Unused Ports",
            "Enable IDS",
            "Increase Firewall Rules",
            "Monitor Network"
        ],

        "HTTP_DDoS":[
            "Enable Rate Limiting",
            "Activate DDoS Protection",
            "Redirect Traffic",
            "Notify Administrator",
            "Capture Logs"
        ],

        "SQL_Injection":[
            "Sanitize Inputs",
            "Enable WAF",
            "Audit Database",
            "Block Attacker",
            "Notify Security Team"
        ],

        "Normal":[
            "No Action Required"
        ]

    }

    return {
        "attack": attack,
        "actions": recommendations.get(
            attack,
            ["Monitor Network"]
        )
    }
@app.get("/events")
def get_events():

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT event,level,created_at
        FROM events
        ORDER BY id DESC
        LIMIT 20
    """).fetchall()

    cur.close()

    return [
        {
            "event": r[0],
            "level": r[1],
            "time": r[2]
        }
        for r in rows
    ]
@app.get("/threat-feed")
def threat_feed():

    return [
        {
            "cve": "CVE-2025-1234",
            "title": "Apache Remote Code Execution",
            "severity": "Critical"
        },
        {
            "cve": "CVE-2025-2231",
            "title": "SQL Injection Vulnerability",
            "severity": "High"
        },
        {
            "cve": "Mirai Botnet",
            "title": "IoT DDoS Campaign",
            "severity": "Critical"
        },
        {
            "cve": "CVE-2025-3012",
            "title": "Privilege Escalation",
            "severity": "Medium"
        }
    ]
@app.get("/timeline")
def timeline():

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT time, attack
        FROM attacks
        ORDER BY id DESC
        LIMIT 20
    """).fetchall()

    cur.close()

    return [
        {
            "time": row[0],
            "attack": row[1]
        }
        for row in rows
    ]
@app.get("/export/csv")
def export_csv():

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT time,ip,attack,confidence,severity
        FROM attacks
        ORDER BY id DESC
    """).fetchall()

    cur.close()

    filename = "attacks.csv"

    with open(filename, "w", newline="") as file:

        writer = csv.writer(file)

        writer.writerow([
            "Time",
            "IP",
            "Attack",
            "Confidence",
            "Severity"
        ])

        writer.writerows(rows)

    return FileResponse(
        filename,
        media_type="text/csv",
        filename="CyberShield_Attacks.csv"
    )

@app.get("/export/excel")
def export_excel():

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT time,ip,attack,confidence,severity
        FROM attacks
        ORDER BY id DESC
    """).fetchall()

    cur.close()

    wb = Workbook()

    ws = wb.active

    ws.title = "Attack Logs"

    ws.append([
        "Time",
        "IP",
        "Attack",
        "Confidence",
        "Severity"
    ])

    for row in rows:
        ws.append(row)

    filename = "CyberShield_Attacks.xlsx"

    wb.save(filename)

    return FileResponse(
        filename,
        filename="CyberShield_Attacks.xlsx"
    )
@app.get("/explain-ai")
def explain_ai():

    cur = conn.cursor()

    row = cur.execute("""
        SELECT attack
        FROM attacks
        ORDER BY id DESC
        LIMIT 1
    """).fetchone()

    cur.close()

    attack = row[0] if row else "Normal"

    explanations = {

        "Brute_Force":{
            "reason":"Large number of authentication attempts detected.",
            "features":[
                ("SYN Packets",35),
                ("Failed Logins",28),
                ("Packet Size",18),
                ("Destination Port",12),
                ("Protocol",7)
            ]
        },

        "Port_Scan":{
            "reason":"Sequential port access detected.",
            "features":[
                ("Destination Ports",40),
                ("TCP Flags",25),
                ("Packet Count",20),
                ("Duration",10),
                ("Protocol",5)
            ]
        },

        "HTTP_DDoS":{
            "reason":"High HTTP request rate detected.",
            "features":[
                ("HTTP Requests",42),
                ("Packet Rate",25),
                ("Flow Duration",15),
                ("Bytes",10),
                ("Protocol",8)
            ]
        },

        "Normal":{
            "reason":"Normal network behaviour.",
            "features":[
                ("Traffic",100)
            ]
        }

    }

    return explanations.get(
        attack,
        explanations["Normal"]
    )
@app.get("/soc-status")
def soc_status():

    cur = conn.cursor()

    total = cur.execute(
        "SELECT COUNT(*) FROM attacks"
    ).fetchone()[0]

    critical = cur.execute(
        "SELECT COUNT(*) FROM attacks WHERE severity='Critical'"
    ).fetchone()[0]

    alerts = cur.execute(
        "SELECT COUNT(*) FROM alerts"
    ).fetchone()[0]

    incidents = cur.execute(
        "SELECT COUNT(*) FROM incidents"
    ).fetchone()[0]

    latest = cur.execute("""
        SELECT attack,ip,confidence
        FROM attacks
        ORDER BY id DESC
        LIMIT 1
    """).fetchone()

    cur.close()

    return {
        "total": total,
        "critical": critical,
        "alerts": alerts,
        "incidents": incidents,
        "latest": latest
    }
@app.get("/activity-logs")
def activity_logs():

    cur = conn.cursor()

    rows = cur.execute("""
        SELECT username, action, created_at
        FROM activity_logs
        ORDER BY id DESC
        LIMIT 50
    """).fetchall()

    cur.close()

    return [
        {
            "username": r[0],
            "action": r[1],
            "time": r[2]
        }
        for r in rows
    ]