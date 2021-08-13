from web_utils import json_response

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
    return json_response({'body': 'get_item'})

def delete_item(request):
    return json_response({'body': 'del_item'})

def post_item(request):
    return json_response({'body': 'post_item'})

def get_items(request):
    return json_response({'body': 'get_items'})
