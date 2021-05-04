#!/bin/sh
cd ./app && yarn relocate && cd ..
docker-compose run --rm doctory python manage.py collectstatic --noinput

docker-compose down