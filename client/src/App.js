import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import NewItem from './components/NewItem';
import Items from './components/Items';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() {

  //gets items from server on page load
  useEffect(() => {
    const getItems = async() =>{
      const items = await fetchItems();
      setItems(items);
    }
    getItems();
  }, [])

  //fetches items from express server
  const fetchItems = async() =>{
    const res = await fetch('/items');
    const data = await res.json();
    const dataConverted = [];
    for (let item of Object.values(data)) {
      dataConverted.push(item);
    }
    return dataConverted;
  }

  const [items, setItems] = useState([]);

  return (
    <div>
      <Header />
      <Container fluid>
        <NewItem />
        <Items items={items} />
      <Footer />
      </Container>
    </div>
  );
}

export default App;
