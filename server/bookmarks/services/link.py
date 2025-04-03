from typing import Optional
from uuid import uuid4

from ..models import Link
from ..datastore import Database

class LinkService:
    def __init__(self, db: Database):
        self.db = db

    def create(self, link: Link) -> str:
        data = self.db.read()
        link.link_id = str(uuid4())
        data["link"].append(link.model_dump())
        self.db.write()
        return link.link_id

    def get(self, link_id: str) -> Optional[Link]:
        data = self.db.read()
        for row in data["link"]:
            if row["link_id"] == link_id:
               return Link.model_validate(row)
        return None

    def getAll(self) -> list[Link]:
        data = self.db.read()
        parties = data["link"]
        return [Link.model_validate(link) for link in parties]

    def delete(self, link_id: str) -> None:
        data = self.db.read()
        for i, row in enumerate(data["link"]):
            if row["link_id"] == link_id:
                data["link"].pop(i)
        self.db.write()
