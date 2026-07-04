import sqlite3

conn = sqlite3.connect("cybershield.db")

cursor = conn.cursor()

rows = cursor.execute("SELECT * FROM attacks").fetchall()

print("Total Rows:", len(rows))

for row in rows:
    print(row)

conn.close()