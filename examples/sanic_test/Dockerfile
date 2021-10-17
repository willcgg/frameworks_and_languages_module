FROM python:slim

WORKDIR /app/

RUN pip install sanic

COPY *.py .

ENTRYPOINT ["sanic", "--host", "0.0.0.0", "server.app"]
