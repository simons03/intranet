@echo off
start cmd /k "cd /d %~dp0 && npx json-server db.json --port 8000"
