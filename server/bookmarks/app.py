from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from typing import List

from bookmarks.datastore import Database
from bookmarks.services import LinkService
from bookmarks.models.link import Link

api: FastAPI = FastAPI()
api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db: Database = Database("bookmarks/datastore/database.json")
service: LinkService = LinkService(db)

@api.get("/")
def read_root():
    return {"message": "Welcome to Bookmarks API"}

@api.post("/api/links", response_model=str)
def create_link(link: Link):
    link_id = service.create(link)
    return link_id

@api.get("/api/links/{link_id}", response_model=Link)
def get_link(link_id: str):
    link = service.get(link_id)
    if link is None:
        raise HTTPException(status_code=404, detail="Link not found")
    return link

@api.get("/api/links", response_model=List[Link])
def get_all_links():
    return service.getAll()

@api.delete("/api/links/{link_id}")
def delete_link(link_id: str):
    link = service.get(link_id)
    if link is None:
        raise HTTPException(status_code=404, detail="Link not found")
    service.delete(link_id)
    return {"message": "Link deleted successfully"} 
