import random

import pytest
import requests


@pytest.fixture
def new_item(ENDPOINT):
    ITEM = {
        'user_id': "user1234",
        'keywords': ["hammer", "nails", "tools"],
        "description": "A hammer and nails set",
        "lat": (random.random() * (70*2)) - 70,
        "lon": (random.random() * (180*2)) - 180,
    }
    response = requests.post(ENDPOINT + '/item', json=ITEM)
    yield response.json()

@pytest.fixture
def temp_item(ENDPOINT, new_item):
    yield new_item
    response = requests.delete(ENDPOINT + f"/item/{new_item['id']}")
    assert response.status_code == 201



def test_index(ENDPOINT):
    """
    Base endpoint should return html of some form to the user.
    """
    response = requests.get(ENDPOINT)
    assert response.status_code == 200
    assert 'text/html' in response.headers['Content-type']
    assert response.text


def test_item_post_missing_fields(ENDPOINT):
    ITEM = {
        "a": 1,
        "b": 2,
    }
    response = requests.post(ENDPOINT + '/item', json=ITEM)
    assert response.status_code == 405


def test_item_post(ENDPOINT):
    ITEM = {
        'user_id': "user1234",
        'keywords': ["hammer", "nails", "tools"],
        "description": "A hammer and nails set. In canterbury",
        "lat": 51.2798438,
        "lon": 1.0830275,
    }
    response = requests.post(ENDPOINT + '/item', json=ITEM)
    assert response.status_code == 201
    assert 'application/json' in response.headers.get('Content-type')
    assert response.json().get('id')


def test_item_get(ENDPOINT, new_item):
    url = ENDPOINT + f"/item/{new_item['id']}"
    response = requests.get(url)
    assert response.status_code == 200
    assert response.json() == new_item


def test_item_delete_invalid_item(ENDPOINT):
    _id = 99999999999
    url = ENDPOINT + f"/item/{_id}"
    response = requests.get(url)
    assert response.status_code == 404
    response = requests.delete(url)
    assert response.status_code == 404


def test_item_delete(ENDPOINT, new_item):
    url = ENDPOINT + f"/item/{new_item['id']}"
    response = requests.get(url)
    assert response.status_code == 200
    response = requests.delete(url)
    assert response.status_code == 201
    response = requests.get(url)
    response.status_code == 404


def test_items(ENDPOINT):
    url = ENDPOINT + f"/items"
    response = requests.get(url)
    assert response.status_code == 200
    items = response.json()
    assert isinstance(items, list)
