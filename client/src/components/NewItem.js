import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../index.css';

const NewItem = () => {
    return (
        <div>
            <h1>New Item</h1>
            <Container >
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
                    <Button style={{ margin: "20px" }} variant="light" >Add New Item</Button>
                </Row>

            </Container>
        </div>
    )
}

export default NewItem
