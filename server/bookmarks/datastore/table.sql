-- Table stores browser bookmarks
CREATE TABLE links (
    link_id TEXT PRIMARY KEY, -- unique identifier for the bookmark
    url TEXT NOT NULL, -- URL of the bookmark
    image TEXT, -- image associated with the bookmark
    title TEXT, -- title of the bookmark
    category TEXT, -- category of the bookmark (e.g., "blog", "book", "paper", "github"))
    description TEXT, -- description of the bookmark
    created_on TEXT NOT NULL -- timestamp of when the bookmark was created
);
