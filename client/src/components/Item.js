import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import '../index.css';

const Item = ({ item }) => {
    const src = item.image;
    return (
        <div>
            <Card className = "card">
                <Card.Img variant="top" src={src} />
                <Card.Body>
                    <Card.Title>Item {item.id}</Card.Title>
                    <Card.Text>
                        <p>Username: {item.user_id} </p>
                        <p>Latitude: {item.latitude} </p>
                        <p>Longitude: {item.longitude} </p>
                        <p>Keywords: {item.keywords.map(keyword => <label>ㅤ{keyword},ㅤ</label>)} </p>
                        <p>Description: {item.description}</p>
                        <p>Date posted: {item.date_from} </p>
                    </Card.Text>
                    <Button variant = "danger">Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Item
