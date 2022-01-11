import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import Item from './Item';

const Items = ({items}) => {
    return (
        <div>
            <Container >
                <h1>Items</h1>
                <>
                {
                    items.map((item) => (
                        <Item item = {item}/>
                    ))}
                </>
                
            </Container>

        </div>
    )
}

export default Items
