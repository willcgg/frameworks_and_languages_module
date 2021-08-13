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
