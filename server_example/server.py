import socket
import logging
import re
from functools import reduce

log = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)
#s = socket.create_server(("", 8080))

HOST = ''                 # Symbolic name meaning all available interfaces
PORT = 8000              # Arbitrary non-privileged port


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

RESPONSE_DEFAULTS = {
    'code': 200, 
    'body': '',
    'Content-type': 'text/html; charset=utf-8',
    'Server': 'CustomHTTP/0.0 Python/3.9.0+',
    'Date': 'Thu, 12 Aug 2021 10:02:02 GMT',  # TODO replace with strp format
}
def encode_response(response):
    r"""
    >>> encode_response({'body': '<html></html>'})
    """
    response = {**RESPONSE_DEFAULTS, **response}
    body = response['body']
    del response['body']
    response['Content-Length'] = len(response['body'])
    raise NotImplementedError()


if __name__ == "__main__":
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        while True:
            s.listen()
            conn, addr = s.accept()
            with conn:
                log.debug(f'Connected by {addr}')
                while True:
                    data = conn.recv(1024)
                    if not data: break
                    print(data)
                    conn.send(b'test')
                    #conn.sendall(data)


# python3 -m http.server
#  curl http://localhost:8000/ -vvv

#< HTTP/1.0 200 OK
#< Server: SimpleHTTP/0.6 Python/3.9.0+
#< Date: Thu, 12 Aug 2021 10:02:02 GMT
#< Content-type: text/html; charset=utf-8
#< Content-Length: 471
#<