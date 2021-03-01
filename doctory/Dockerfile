FROM python:3.8

ENV PYTHONUNBUFFERED=1

RUN mkdir /doctory
WORKDIR /doctory

COPY requirements.txt /doctory/

RUN pip install -r requirements.txt

COPY . /doctory/