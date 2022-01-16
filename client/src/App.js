import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import NewItem from './components/NewItem';
import Items from './components/Items';
import Footer from './components/Footer';
import { Button, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() {

  //gets and sets items in state
  const [items, setItems] = useState([]);
  const [addItemForm, setFormVisibility] = useState(false);

  //gets items from server on page load
  useEffect(() => {
    fetchItems();
  }, [])

  //fetches items from express server
  const fetchItems = async () => {
    const res = await fetch(`http://localhost:8000/items`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    const data = await res.json();
    //converting data to array to avoid errors
    const dataConverted = [];
    for (let item of Object.values(data)) {
      dataConverted.push(item);
    }
    //sets items in client state
    setItems(dataConverted);
  }

  //delete item
  const deleteItem = async (id) => {
    //delete items from server
    const deleteItem = await fetch(`http://localhost:8000/item/${id}`, {
      method: 'DELETE'
    })
    //checks item got deleted from server
    if (!deleteItem) {
      return;
    }
    //delete items from client state
    setItems(items.filter((item) => item.id !== id));
  }

  //add item
  const addItem = async (item) => {
    //add item to server
    await fetch("http://localhost:8000/item", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    })

    //add item to client state
    fetchItems();
  }

  return (
    <div>
      <Header />
      <Container fluid>
        <Button className='Button' variant={addItemForm ? "danger" : "primary"} size="lg" onClick={() => { setFormVisibility(!addItemForm) }}>
          {addItemForm ? "Close" : "Add Item"}
        </Button>{' '}
        {addItemForm && <NewItem addItem={addItem} />}
        <Items items={items} deleteItem={deleteItem} />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
