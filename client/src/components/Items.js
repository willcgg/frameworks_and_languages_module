import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Item from './Item';

const Items = ({ items, deleteItem }) => {
    return (
        <div>
            <h1>Items</h1>
            <Container>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <>
                        {
                            items.map((item) => (
                                <Item key={item.id} item={item} deleteItem={deleteItem} />
                            ))}
                    </>
                </div>
            </Container>
        </div>
    )
}

export default Items
