#!/bin/bash
# Double-click this file on macOS to start Zintho.
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install it from https://nodejs.org (version 18 or newer), then try again."
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi
[ -f .env ] || cp .env.example .env
PORT=$(grep -E '^PORT=' .env | cut -d= -f2); PORT=${PORT:-4747}
(sleep 1.5 && open "http://localhost:$PORT") &
node server.js
