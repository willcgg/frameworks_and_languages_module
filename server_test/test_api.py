import os

from pytest import fixture
import requests

ENDPOINT = os.environ.get('URI_SERVER', 'http://localhost:8000')


def test_index():
    """
    Base endpoint should return html of some form to the user.
    """
    response = requests.get(ENDPOINT)
    assert response.status_code == 200
    assert 'text/html' in response.headers['Content-type']
    assert response.text


@fixture
def new_item():
    ITEM = {
        'a': 1,
        'b': 2,
    }
    response = requests.post(ENDPOINT + '/item', json=ITEM)
    yield response.json()

@fixture
def temp_item(new_item):
    yield new_item
    response = requests.delete(ENDPOINT + f"/item/{new_item['id']}")
    assert response.status_code == 201


def test_item_post():
    ITEM = {
        'a': 1,
        'b': 2,
    }
    response = requests.post(ENDPOINT + '/item', json=ITEM)
    assert response.status_code == 201
    assert 'application/json' in response.headers.get('Content-type')
    assert response.json().get('id')


def test_item_get(new_item):
    url = ENDPOINT + f"/item/{new_item['id']}"
    response = requests.get(url)
    assert response.status_code == 200
    assert response.json() == new_item


def test_item_delete(new_item):
    url = ENDPOINT + f"/item/{new_item['id']}"
    response = requests.get(url)
    assert response.status_code == 200
    response = requests.delete(url)
    assert response.status_code == 201
    response = requests.get(url)
    response.status_code == 404
