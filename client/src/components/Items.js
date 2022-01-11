import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, CardGroup, Card } from 'react-bootstrap';

const Items = () => {
    return (
        <div>
            <Container >
                <h1>Items</h1>
                <CardGroup>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" />
                                <Card.Body>
                                    <Card.Title>Item 1</Card.Title>
                                    <Card.Text>
                                        <p>Username: Will</p>
                                        <p>Lat: 10</p>
                                        <p>Lon: 20</p>
                                        <p>Keywords: phone, small, camera</p>
                                        <p>Description: a small pocket size phone with a camera</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" />
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" />
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" />
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" />
                            </Card>
                        </Col>
                    </Row>
                </CardGroup>
            </Container>

        </div>
    )
}

export default Items
