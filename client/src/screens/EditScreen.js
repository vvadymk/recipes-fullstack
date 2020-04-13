import React, {useEffect, useState} from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
import {Link} from "react-router-dom";
import services from '../services';

const EditScreen = ({match: { params }}) => {
    const id = params.id;
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [createDate, setCreateDate] = useState('');


    const loadChanges = async () => {
        try{
            const resp = await services.getRecipe(id);
            console.log(resp);
            const recipe = resp.data;
             setCategory(recipe.category);
             setLongDesc(recipe.longDesc);
             setName(recipe.name);
             setShortDesc(recipe.shortDesc);
             setCreateDate(recipe.createDate);
        }catch (error) {
            console.log(error);
            alert('Failed changes');
        }
    };

    useEffect(()=>{
        loadChanges()
    }, []);

    const handleSubmit = async () => {
        try{
            const recipe = {
                id,
                name,
                category,
                shortDesc,
                longDesc,
                createDate,
            };
            await services.updateRecipe(recipe);
            alert('Recipe updated successfully');
        }catch (error) {
            console.log(error);
            alert('Update recipe failed');
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
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                style={{marginRight:"10px"}}
                            >
                                Update
                            </Button>
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

export default EditScreen;
