from sanic import Sanic
from sanic.response import text, json

app = Sanic("MyHelloWorldApp")

@app.get("/")
async def hello_world(request):
    return text("Hello, world.")


@app.get("/test")
async def test(request):
    return json({"foo": "bar"})

