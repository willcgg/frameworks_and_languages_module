import logging

from http_server import serve_app

log = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


def app(request):
    log.debug(request)
    body = """<html>
<head>
    <title>Test</title>
</head>
<body>
    <h1>Test</h1>
</body>
<html>"""
    response = {'body': body}
    log.debug(response)
    return response


if __name__ == "__main__":
    serve_app(app, port=8000)


