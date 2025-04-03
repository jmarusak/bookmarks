import sqlite3
import json

def sql2json(database: str, table: str, filename: str):
    conn = sqlite3.connect(database)
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM {table} ORDER BY created_on DESC")
    rows = cursor.fetchall()

    # Get column names from the cursor description
    column_names = [description[0] for description in cursor.description]

    # Convert rows to a list of dictionaries, where each row is a dictionary
    links = [dict(zip(column_names, row)) for row in rows]

    # Prepare the JSON structure
    data = {"links": links}

    # Write data to a JSON file
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)

    cursor.close()
    conn.close()

# Usage
sql2json("store.sqlite", "links", "store.json")
