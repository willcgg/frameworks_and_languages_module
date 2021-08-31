"""
These tests are deliberately constucted for a learning activity.
There are lots of repeated patters that are design for a learner to see graduated progress.
As they construct more functionality, more tests should pass.

Profetional test would not be written like this.
"""

import random
import urllib.parse

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
def item_factory(ENDPOINT):
    _item_ids = set()
    def _item_factory(**kwargs):
        ITEM = {
            'user_id': "user1234",
            'keywords': ["hammer", "nails", "tools"],
            "description": "A hammer and nails set",
            "lat": (random.random() * (70*2)) - 70,
            "lon": (random.random() * (180*2)) - 180,
            **kwargs,
        }
        response = requests.post(ENDPOINT + '/item', json=ITEM)
        item = response.json()
        _item_ids.add(item['id'])
        return item
    yield _item_factory
    for _id in _item_ids:
        response = requests.delete(ENDPOINT + f"/item/{_id}")
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
    """
    /items responds with list
    """
    url = ENDPOINT + f"/items"
    response = requests.get(url)
    assert response.status_code == 200
    items = response.json()
    assert isinstance(items, list)

def test_items_filter_location(ENDPOINT, item_factory):
    def _get_items(**kwargs):
        return requests.get(ENDPOINT + f"/items?" + urllib.parse.urlencode(kwargs)).json()
    # Create mock items in sequence line
    for lat in (100+(i*0.1) for i in range(10)):
        item_factory(lat=lat, lon=20.0)
    
    items = _get_items(lat=100, lon=20.0, radius=0.21)
    assert len(items) == 3, "should return lat=100 + lat=100.1 + lat=100.2"

