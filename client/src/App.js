import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import NewItem from './components/NewItem';
import Items from './components/Items';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Header />
      <Container fluid>
        <NewItem />
        <Items />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
