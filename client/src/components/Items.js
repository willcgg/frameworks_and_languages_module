import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Item from './Item';

const Items = ({ items }) => {
    return (
        <div>
            <h1>Items</h1>
            <Container>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <>
                        {
                            items.map((item) => (
                                <Item item={item} />
                            ))}
                    </>
                </div>
            </Container>
        </div>
    )
}

export default Items
