import logging

from http_server import serve_app
from web_utils import find_route_func

log = logging.getLogger(__name__)


from views import get_index, get_item, post_item, delete_item, get_items
ROUTES = (
    ('GET', r'/$', get_index),
    ('POST', r'/item$', post_item),
    ('GET', r'/item/(?P<id>\d+)$', get_item),
    ('DELETE', r'/item/(?P<id>\d+)$', delete_item),
    ('GET', r'/items$', get_items),
)

def app(request):
    #log.debug(request)

    if _func := find_route_func(request, ROUTES):
        return _func(request)

    return {'code': 404, 'body': 'no route'}


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    serve_app(app, port=8000)
