import json

from typing import Dict

class Database:
    def __init__(self, filename: str):
        self.filename = filename

    def read(self) -> Dict:
        with open(self.filename, 'r') as f:
            self.db = json.load(f)
        return self.db

    def write(self):
        with open(self.filename, 'w') as f:
            json.dump(self.db, f)
