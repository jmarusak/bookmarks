#!/bin/bash

# Kill frontend session
tmux kill-session -t frontend

# Kill backend session
tmux kill-session -t backend
