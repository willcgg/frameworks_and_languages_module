
const items = {
  1: {
    "id": 1,
    "user_id": "User Id",
    "keywords": ["list", "of", "key", "words"],
    "description": "Item Description",
    "image": "https://placekitten.com/301/302",
    "latitude": 0,
    "longitude": 0,
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z"
  },
  2: {
    "id": 2,
    "user_id": "test1",
    "keywords": ["list", "of", "key", "words", "again"],
    "description": "Test Item Description",
    "image": "https://placekitten.com/302/302",
    "latitude": 1,
    "longitude": 2,
    "date_from": "2020-08-24T14:15:22Z",
    "date_to": "2020-08-24T14:15:22Z"
  },
  3: {
    "id": 3,
    "user_id": "User Id",
    "keywords": ["list", "of", "key", "words"],
    "description": "Item Description",
    "image": "https://placekitten.com/301/302",
    "latitude": 0,
    "longitude": 0,
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z"
  },
  4: {
    "id": 4,
    "user_id": "User Id",
    "keywords": ["list", "of", "key", "words"],
    "description": "Item Description",
    "image": "https://placekitten.com/301/302",
    "latitude": 0,
    "longitude": 0,
    "date_from": "2019-08-24T14:15:22Z",
    "date_to": "2019-08-24T14:15:22Z"
  }
}
var nextId = Math.max(items.id) + 1;
module.exports = items;
