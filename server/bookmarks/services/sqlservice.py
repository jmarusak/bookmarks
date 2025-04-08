import sqlite3

from ..models import Link

columns = ["link_id", "url", "image", "title", "category", "description", "created_on"]
columnlist = ", ".join(columns)
placeholders = ", ".join(["?" for _ in columns])

class SqlService:
    def __init__(self, store: str):
        self.store = store

    def create(self, link: Link) -> str:
        conn = sqlite3.connect(self.store)
        cursor = conn.cursor()
        cursor.execute(
            f"INSERT INTO links ({columnlist}) VALUES ({placeholders})",
            (link.link_id, link.url, link.image, link.title, link.category, link.description, link.created_on)
        )
        conn.commit()
        conn.close()
        return link.link_id

    def getAll(self) -> list[Link]:
        conn = sqlite3.connect(self.store)
        cursor = conn.cursor()
        cursor.execute(
            f"SELECT {columnlist} FROM links ORDER BY created_on DESC"
        )
        rows = cursor.fetchall()
        links = [
            {columns[column]: value for column, value in enumerate(row)}
            for row in rows
        ]
        conn.close()
        return [Link.model_validate(link) for link in links]

    def getCustom(self, query: str) -> list[Link]:
        conn = sqlite3.connect(self.store)
        cursor = conn.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        links = [
            {columns[column]: value for column, value in enumerate(row)}
            for row in rows
        ]
        conn.close()
        return [Link.model_validate(link) for link in links]

    def delete(self, link_id: str) -> None:
        conn = sqlite3.connect(self.store)
        cursor = conn.cursor()
        print(f"Service link with ID: {link_id}")
        cursor.execute("DELETE FROM links WHERE link_id = ?", (link_id,))
        conn.commit()
        conn.close()
        return
