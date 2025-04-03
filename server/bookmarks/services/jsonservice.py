from ..models import Link
from ..datastore import JsonStore

class JsonService:
    def __init__(self, store: JsonStore):
        self.store = store

    def create(self, link: Link) -> str:
        data = self.store.read()
        data["links"].append(link.model_dump())
        self.store.write()
        return link.link_id

    def getAll(self) -> list[Link]:
        data = self.store.read()
        links = data["links"]
        return [Link.model_validate(link) for link in links]

    def delete(self, link_id: str) -> None:
        data = self.store.read()
        for i, row in enumerate(data["links"]):
            if row["link_id"] == link_id:
                data["links"].pop(i)
        self.store.write()
        return
