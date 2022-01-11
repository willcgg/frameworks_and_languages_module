import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import NewItem from './components/NewItem';
import Items from './components/Items';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

function App() {

  const [items, setItems] = useState([
    {
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
    {
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
    {
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

  ])

  return (
    <div>
      <Header />
      <Container fluid>
        <NewItem />
        <Items items = {items}/>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
