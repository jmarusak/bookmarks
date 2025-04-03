CREATE TABLE links (
    link_id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    image TEXT,
    title TEXT,
    category TEXT,
    description TEXT,
    created_on TEXT NOT NULL
);
