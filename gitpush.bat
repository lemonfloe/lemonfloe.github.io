@echo off
set /p msg=Enter commit message: 
git add --all
git commit -m "%msg%"
git push -u origin main