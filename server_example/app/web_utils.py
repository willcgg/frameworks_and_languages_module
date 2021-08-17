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
        if request.get('method') == method:
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