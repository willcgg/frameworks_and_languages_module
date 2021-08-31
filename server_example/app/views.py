import datetime

from .web_utils import json_response

from .datamodel import datastore, LatLonRange

def get_index(request):
    body = """<html>
<head>
    <title>Test</title>
    <meta charSet="utf-8" />
</head>
<body>
    <h1>Test</h1>
</body>
<html>"""
    response = {'body': body}
    return response


def get_item(request):
    _id = int(request.get('id'))
    item = datastore.get_item(_id)
    if not item:
        return {'code': 404}
    return json_response(item)

def delete_item(request):
    _id = int(request.get('id'))
    item = datastore.get_item(_id)
    if not item:
        return {'code': 404}    
    datastore.delete_item(_id)
    return {'code': 201}

def post_item(request):
    data = request.get('body')
    REQUIRED_FIELDS = frozenset({'user_id', 'keywords', 'description', 'lat', 'lon'})
    FIELDS = frozenset(data.keys())
    if not REQUIRED_FIELDS.issubset(FIELDS):
        return json_response({'error': f"missing fields", 'fields': tuple(REQUIRED_FIELDS - FIELDS)}, {'code': 405})
    # TODO: check data types of input? lat,lon
    data['date_from'] = datetime.datetime.now().isoformat()
    item = datastore.create_item(data)
    return json_response(item, {'code': 201})

def get_items(request):
    filters = []
    if latlonrange := LatLonRange.from_dict(request['query']):
        filters.append(latlonrange.in_range)
    if not filters:
        filters.append(lambda item: True)
    def filter_items(item):
        return all(f(item) for f in filters)
    return json_response(tuple(datastore.filter_items(filter_items)))
