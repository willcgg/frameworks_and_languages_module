from web_utils import json_response

from datamodel import datastore, LatLonRange

def get_index(request):
    body = """<html>
<head>
    <title>Test</title>
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
    data = json.loads(request.get('body'))
    data['date_from'] = 'now PLACEHOLDER'
    item = datastore.create_item(data)
    return json_response(item, {'code': 201})

def get_items(request):
    filters = []
    if latlonrange := LatLonRange.from_dict(request):
        filters.append(latlonrange.in_range)
    if not filters:
        filters.append(lambda item: True)
    def filter_items(item):
        return all(f(item) for f in filters)
    return json_response(tuple(datastore.filter_items(filter_items)))
