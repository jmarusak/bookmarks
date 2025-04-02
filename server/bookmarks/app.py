from fastapi import FastAPI

from bookmarks.datastore import Database
from bookmarks.services import LinkService

api: FastAPI = FastAPI()
db: Database = Database("bookmarks/datastore/database.json")

@api.get("/")
def read_root():
    linkService = LinkService(db)
    links = linkService.getAll()
    return links 
