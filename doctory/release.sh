#!/bin/sh

python manage.py migrate
python manage.py loaddata 0001_BackgroundTypes.json
python manage.py loaddata 0002_BackgroundSubtypes.json