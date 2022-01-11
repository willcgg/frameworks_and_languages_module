import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NewItem = () => {
    return (
        <div>
            <Container >
                <h1>New Item</h1>
                <Row>
                    <Col>
                        <p>Username: </p>
                        <input></input>
                        <p>Lat:</p>
                        <input></input>
                        <p>Lon:</p>
                        <input></input>
                    </Col>
                    <Col>
                        <p>Image:</p>
                        <input></input>
                        <p>Keywords:</p>
                        <input></input>
                        <p>Description:</p>
                        <input></input>
                    </Col>
                    <Col><Button variant='secondary'>Add</Button></Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default NewItem
