@echo off
py manage.py migrate %*
py manage.py makemigrations faktury %*
pause