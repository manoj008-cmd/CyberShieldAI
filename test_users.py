from backend.database.database import cursor

rows = cursor.execute(
    "SELECT * FROM users"
).fetchall()

print(rows)