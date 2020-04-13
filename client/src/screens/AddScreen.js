import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap'
import services from '../services'
import {Link} from "react-router-dom";

const AddScreen = (props) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const userId = props.userId
    let createDate;

    const handleSubmit = async () => {
        try{
            createDate = getDate('.');
            const recipe = {
                name,
                category,
                shortDesc,
                longDesc,
                createDate,
                userId
            };
            await services.addRecipe(recipe);
        }catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter recipe name"
                                onChange={e=>setName(e.target.value)}
                                value={name}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={e=>setCategory(e.target.value)}
                                value={category}
                            >
                                <option>Meat&Poultry</option>
                                <option>Comfort food</option>
                                <option>Soups</option>
                                <option>Breakfast&Brunch</option>
                                <option>Salads</option>
                                <option>Desserts</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Short description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="2"
                                onChange={e=>setShortDesc(e.target.value)}
                                value={shortDesc}
                                maxlength="200"
                                style={{resize:"none"}}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                onChange={e=>setLongDesc(e.target.value)}
                                value={longDesc}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Link to={`/`}>
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                style={{marginRight:"10px"}}
                            >
                                Add
                            </Button>
                            </Link>
                            <Link to={`/`}>
                                <Button
                                    variant="danger"
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

function getDate(sp){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
}

export default AddScreen;
