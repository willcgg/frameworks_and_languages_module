import re
import logging

from http_server import serve_app

log = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)

from views import get_index, get_item, post_item, delete_item, get_items

ROUTES = (
    ('GET', r'/$', get_index),
    ('POST', r'/item$', post_item),
    ('GET', r'/item/(?P<id>\d+)$', get_item),
    ('DELETE', r'/item/(?P<id>\d+)$', delete_item),
    ('GET', r'/items$', get_items),
)


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


def app(request):
    #log.debug(request)

    if _func := find_route_func(request, ROUTES):
        return _func(request)


    return {'code': 404, 'body': 'no route'}


if __name__ == "__main__":
    serve_app(app, port=8000)


