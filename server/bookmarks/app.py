from typing import List

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from bookmarks.models.link import Link

api: FastAPI = FastAPI()
api.mount("/static", StaticFiles(directory="bookmarks/static", html=True), name="static")
api.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the JSON store
#from bookmarks.datastore import JsonStore 
#from bookmarks.services import JsonService
#store: JsonStore = JsonStore("bookmarks/datastore/store.json")
#service: JsonService = JsonService(store)

# Initialize the SQLite database
from bookmarks.services import SqlService
store: str = "bookmarks/datastore/store.sqlite"
service: SqlService = SqlService(store)

@api.get("/")
def read_root():
    return "Welcome to the Bookmarks API"

@api.post("/api/links", response_model=str)
def create_link(link: Link):
    link_id = service.create(link)
    return link_id

@api.get("/api/links", response_model=List[Link])
def get_all_links():
    return service.getAll()

@api.delete("/api/links/{link_id}")
def delete_link(link_id: str):
    print(f"Deleting link with ID: {link_id}")
    service.delete(link_id)
    return {"message": "Link deleted successfully"} 
