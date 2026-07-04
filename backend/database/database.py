import sqlite3
import os
from pathlib import Path
from backend.utils.security import hash_password

# Project root folder
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Database path
DB_ENV = os.getenv("DATABASE_PATH")

if DB_ENV:
    DB = Path(DB_ENV)
else:
    DB = BASE_DIR / "cybershield.db"

conn = sqlite3.connect(
    DB,
    check_same_thread=False
)

cursor = conn.cursor()

# ==========================
# ATTACKS
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS attacks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time TEXT,
    ip TEXT,
    attack TEXT,
    confidence REAL,
    severity TEXT
)
""")

# ==========================
# INCIDENTS
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS incidents(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attack TEXT,
    ip TEXT,
    severity TEXT,
    confidence REAL,
    status TEXT,
    created_at TEXT
)
""")

# ==========================
# ALERTS
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS alerts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attack TEXT,
    ip TEXT,
    severity TEXT,
    confidence REAL,
    status TEXT,
    created_at TEXT
)
""")

# ==========================
# USERS
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
)
""")

# ==========================
# EVENTS (SIEM Logs)
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS events(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event TEXT,
    level TEXT,
    created_at TEXT
)
""")

# ==========================
# ACTIVITY LOGS
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS activity_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    action TEXT,
    created_at TEXT
)
""")

# ==========================
# LOGIN HISTORY
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS login_history(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    login_time TEXT,
    ip_address TEXT
)
""")

conn.commit()

# ==========================
# DEFAULT ADMIN USER
# ==========================

cursor.execute(
    "SELECT password FROM users WHERE username=?",
    ("admin",)
)
admin_row = cursor.fetchone()

if admin_row is None:
    cursor.execute(
        """
        INSERT INTO users(username,password,role)
        VALUES(?,?,?)
        """,
        (
            "admin",
            hash_password("admin123"),
            "Administrator"
        )
    )
    conn.commit()
elif admin_row[0] == "admin123":
    # Migrate plain text password to bcrypt hashed password
    cursor.execute(
        "UPDATE users SET password=? WHERE username=?",
        (hash_password("admin123"), "admin")
    )
    conn.commit()