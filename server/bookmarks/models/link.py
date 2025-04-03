from pydantic import BaseModel

class Link(BaseModel):
    """
    Link model
    """
    link_id: str
    url: str
    image: str
    title: str
    category: str
    description: str
    created_on: str
