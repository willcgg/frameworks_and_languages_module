import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import '../index.css';

const NewItem = ({ addItem }) => {

    //variables in state
    const [user_id, setUserId] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [image, setImage] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [description, setDescription] = useState('');

    //add item function
    const onAddItem = (e) => {
        e.preventDefault();
        //pre-flight checks before add item is called upwards to server
        if (!user_id || !latitude || !longitude || !keywords || !description) {
            alert('Please add required fields (Username, Keywords, Description, Latitude and Longitude) ');
            return;
        }


        //reading new item values from state
        const newItem = {
            user_id: user_id,
            keywords: keywords,
            description: description,
            image: image,
            latitude: latitude,
            longitude: longitude,
        };
        //call upwards to add the item
        addItem(newItem);
        //clearing state and therefore the form
        setUserId('');
        setLatitude('');
        setLongitude('');
        setImage('');
        setKeywords('');
        setDescription('');
    }

    return (
        <Form className='NewItem' onSubmit={onAddItem}>
            <h1>New Item</h1>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter Username" value={user_id} onChange={(e) => setUserId(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLatitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control placeholder="Enter Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLongitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control placeholder="Enter Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control placeholder="Enter Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKeywords">
                <Form.Label>Keywords</Form.Label>
                <Form.Control placeholder="Enter any Keywords e.g List, of, words" value={keywords} onChange={(e) => {
                    //converting keywords input string to array before setting in state
                    var content = (e.target.value);
                    setKeywords(content.split(','))
                }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control placeholder="Enter a Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <div className='ButtonHolder'>
            <Button className = "NewItemButton" type='submit' size = 'lg' variant='success' >Save Item</Button>
            </div>
        </Form>
    )
}

export default NewItem
