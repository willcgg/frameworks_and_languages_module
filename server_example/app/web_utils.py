import re
import json

def json_response(data, response=None):
    r"""
    >>> json_response({'hello': 'world'}, response={'code': 201})
    {'code': 201, 'Content-type': 'application/json; charset=utf-8', 'body': '{"hello": "world"}'}
    """
    response = response or {}
    response['Content-type'] = 'application/json; charset=utf-8'
    response['body'] = json.dumps(data)
    return response


def find_route_func(request, routes):
    r"""
    >>> ROUTES = (
    ...   ('GET', r'/$', 'FUNCTION A'),
    ...   ('GET', r'/test/(?P<id>\d+)$', 'FUNCTION B'),
    ... )
    >>> find_route_func({'method': 'GET', 'path': '/test/1234'}, ROUTES)
    'FUNCTION B'
    >>> find_route_func({'method': 'GET', 'path': '/'}, ROUTES)
    'FUNCTION A'
    >>> find_route_func({'method': 'GET', 'path': '/moose'}, ROUTES)
    """
    for method, route, _func in routes:
        if request.get('method') == method:  # or request.get('Access-Control-Request-Method') == method:
            match = re.match(route, request.get('path'))
            if match:
                request.update(match.groupdict())
                return _func

def decode_json_request(request):
    r"""
    >>> REQUEST = {'Content-Type': 'application/json', 'body': '{"a": 1, "b": 2}'}
    >>> decode_json_request(REQUEST)
    {'Content-Type': 'application/json', 'body': {'a': 1, 'b': 2}}
    """
    if request.get('Content-Type') == 'application/json':
        request['body'] = json.loads(request.get('body'))
    return request

def options_response(request):
    """
    >>> options_response({'path': '*', method: 'OPTIONS'})
    {'code': 204, 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE'}

    https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
    Pre-Flight Options for use with real browsers

    curl -X OPTIONS https://example.org -i

    Request:
    OPTIONS /index.html HTTP/1.1

    Response:
    HTTP/1.1 204 No Content
    Date: Mon, 01 Dec 2008 01:15:39 GMT
    Server: Apache/2.0.61 (Unix)
    Access-Control-Allow-Origin: https://foo.example
    Access-Control-Allow-Methods: POST, GET, OPTIONS
    Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
    Access-Control-Max-Age: 86400
    Vary: Accept-Encoding, Origin
    Keep-Alive: timeout=2, max=100
    Connection: Keep-Alive
    """
    return {
        'code': 204,
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    }
