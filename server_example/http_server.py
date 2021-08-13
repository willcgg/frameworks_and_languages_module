"""
My own hand rolled HTTP Server
This was created as a learning exercise.
DO NOT EVER DO THIS!
DO NOT EVER USE THIS OUTSIDE A CLASSROOM!

Python already has a built in mini http framework
https://docs.python.org/3/library/http.server.html
"""

import socket
import re
import logging
import traceback

log = logging.getLogger(__name__)


# https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
RE_HTTP_HEADER = re.compile(r'(?P<method>GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH) (?P<path>.+) HTTP/(?P<version>.+)\r\n')
RE_HTTP_HEADER_KEY_VALUE = re.compile(r'(?P<key>.+): (?P<value>.+)\r\n')
RE_HTTP_BODY = re.compile(r'\r\n\r\n(?P<body>.*)', flags=re.MULTILINE)
def parse_request(data):
    r"""
    >>> parse_request(b'GET / HTTP/1.1\r\nHost: localhost:8000\r\nUser-Agent: curl/7.68.0\r\nAccept: */*\r\n\r\n')
    {'method': 'GET', 'path': '/', 'version': '1.1', 'Host': 'localhost:8000', 'User-Agent': 'curl/7.68.0', 'Accept': '*/*', 'body': ''}
    """
    data = data.decode('utf8')
    request = RE_HTTP_HEADER.search(data).groupdict()
    for header in RE_HTTP_HEADER_KEY_VALUE.finditer(data):
        key, value = header.groupdict().values()
        request[key] = value
    request.update(RE_HTTP_BODY.search(data).groupdict())
    return request

# https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
RESPONSE_CODES = {
    200: 'OK',
    201: 'Created',
    301: 'Moved Permanently',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    500: 'Internal Server Error',
    501: 'Not Implemented',
}
RESPONSE_DEFAULTS = {
    'code': 200, 
    'body': '',
    'Content-type': 'text/html; charset=utf-8',
    'Server': 'CustomHTTP/0.0 Python/3.9.0+',
    'Date': 'Thu, 12 Aug 2021 10:02:02 GMT',  # TODO replace with strp format
}
RESPONSE_SEPARATOR = b'\r\n'
def encode_response(response):
    r"""
    >>> encode_response({'body': '<html></html>'})
    b'HTTP/1.0 200 OK\r\nContent-type: text/html; charset=utf-8\r\nServer: CustomHTTP/0.0 Python/3.9.0+\r\nDate: Thu, 12 Aug 2021 10:02:02 GMT\r\nContent-Length: 15\r\n\r\n\r\n<html></html>'
    """
    response = {**RESPONSE_DEFAULTS, **response}
    code = response.pop('code')
    head = f"HTTP/1.0 {code} {RESPONSE_CODES[code]}".encode('utf8')
    body = response.pop('body')
    if isinstance(body, str):
        body = body.encode('utf8')
    response['Content-Length'] = len(body) + len(RESPONSE_SEPARATOR)
    return RESPONSE_SEPARATOR.join((
        head,
        RESPONSE_SEPARATOR.join(
            f'{k}: {v}'.encode('utf8')
            for k, v in response.items()
        ),
        RESPONSE_SEPARATOR,
        body,
    ))


def serve_app(func_app, port, host=''):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((host, port))
        while True:
            s.listen()
            conn, addr = s.accept()
            with conn:
                #log.debug(f'Connected by ')
                while True:
                    data = conn.recv(1024)
                    if not data: break
                    request = parse_request(data)
                    try:
                        response = func_app(request)
                    except Exception as ex:
                        log.error(request)
                        traceback.print_exc()
                        response = {'code': 500, 'body': traceback.format_exc()}
                    # TODO: the code and content length do not work here - they are currently applied in encode response.
                    log.info(f"{addr} - {request.get('path')} - {response.get('code')} {response.get('Content-length')}")
                    conn.send(encode_response(response))
                    


# python3 -m http.server
#  curl http://localhost:8000/ -vvv

#< HTTP/1.0 200 OK
#< Server: SimpleHTTP/0.6 Python/3.9.0+
#< Date: Thu, 12 Aug 2021 10:02:02 GMT
#< Content-type: text/html; charset=utf-8
#< Content-Length: 471
#<