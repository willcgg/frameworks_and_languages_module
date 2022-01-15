import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import '../index.css';

const Item = ({ item, deleteItem }) => {
    const src = item.image;
    return (
        <Card className="card">
            <Card.Img variant="top" src={src} />
            <Card.Body>
                <Card.Title>Item {item.id}</Card.Title>
                <Card.Text>
                    Username: {item.user_id} <br />
                    Latitude: {item.latitude} <br />
                    Longitude: {item.longitude} <br />
                    Keywords: {item.keywords.map((keyword) => {
                        return <li>{keyword}</li>;
                    })} <br />
                    Description: {item.description}<br />
                    Date posted: {item.date_from} <br />
                </Card.Text>
                <Button variant="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default Item
