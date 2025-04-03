from pydantic import BaseModel

class Link(BaseModel):
    """
    Link model
    """
    link_id: str
    url: str
    title: str
    description: str
    created_on: str
