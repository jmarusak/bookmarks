#!/bin/bash

# Start backend session (FastAPI server)
tmux new-session -d -s backend 'cd ~/repos/bookmarks/server && source .venv/bin/activate && uvicorn bookmarks:api'

# Start frontend session (React Dev server)
tmux new-session -d -s frontend 'cd ~/repos/bookmarks/client && npm run dev'

# Attach to frontend session
#tmux attach -t frontend
