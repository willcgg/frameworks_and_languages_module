import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

const Item = ({ item }) => {
    const src = item.image;
    return (
        <div>
            <Card>
                <Card.Img variant="top" src={src} />
                <Card.Body>
                    <Card.Title>Item {item.id}</Card.Title>
                    <Card.Text>
                        <p>Username: {item.user_id} </p>
                        <p>Lat: {item.latitude} </p>
                        <p>Lon: {item.longitude} </p>
                        <p>Keywords: {item.keywords.map(keyword => <label>ㅤ{keyword},ㅤ</label>)} </p>
                        <p>Description: {item.description}</p>
                        <p>Date posted: {item.date_from} </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Item
