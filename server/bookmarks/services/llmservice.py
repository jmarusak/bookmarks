import os
import re
import textwrap
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.environ["GEMINI_API_KEY"]
client = genai.Client(api_key=api_key)

def compose_final_prompt(user_prompt: str) -> str:
    prompt = f"""You are an expert SQL assistant. Based on the following `links` table schema:

```sql
CREATE TABLE links (
    link_id TEXT PRIMARY KEY,      -- unique identifier for the bookmark
    url TEXT NOT NULL,             -- URL of the bookmark
    image TEXT,                    -- image associated with the bookmark
    title TEXT,                    -- title of the bookmark
    category TEXT,                 -- category of the bookmark (e.g., "blog", "book", "paper", "github")
    description TEXT,              -- description of the bookmark
    created_on TEXT NOT NULL       -- timestamp of when the bookmark was created
);
```

Generate a valid SELECT SQL query that fulfills the user's request. Return only the SQL statement. Do not include explanations or comments.

Examples:

    Input: Order links with newest on top
    Output: `SELECT * FROM links ORDER BY created_on DESC;`

    Input: Give me all links with category blog
    Output: `SELECT * FROM links WHERE category = 'blog';`

Now, interpret the following request and return only a valid SQL SELECT statement:

{user_prompt} """.strip()
    return textwrap.dedent(prompt)

def generate_sql_query(user_query: str) -> str:
    sql_query = "SELECT * FROM links ORDER BY created_on DESC;"

    prompt = compose_final_prompt(user_query)
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
 
    markdown = response.text
    if not markdown or "```sql" not in markdown:
        return sql_query

    match = re.search(r"```sql\s*(.*?)\s*```", markdown, re.DOTALL)
    if match:
        sql_query = match.group(1).strip()
    return sql_query

if __name__ == "__main__":
    # Example usage
    user_query = "Give me all recent links with category 'blog'"
    sql_query = generate_sql_query(user_query)
    print(sql_query)
