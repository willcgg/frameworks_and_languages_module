from web_utils import json_response

ITEMS = {
    1: {
        'some': 'data',
    },
    2: {
        'some': 'more',
    }
}
ITEMS_max = max(ITEMS.keys())

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
    item = ITEMS.get(_id)
    if not item:
        return {'code': 404}
    return json_response(item)

def delete_item(request):
    _id = int(request.get('id'))
    if _id not in ITEMS:
        return {'code': 404}
    del ITEMS[_id]
    return {'code': 201}

def post_item(request):
    data = json.loads(request.get('body'))
    data['date_from'] = 'now PLACEHOLDER'
    ITEMS_max += 1
    ITEMS[ITEMS_next] = data
    return {'code': 201}

def get_items(request):
    return json_response({'body': 'get_items'})
