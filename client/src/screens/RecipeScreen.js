import React, {useEffect, useState} from 'react';
import {
    Container,
    Row,
    Col,
    Button, Card
} from 'react-bootstrap';
import services from '../services';
import faker from "faker";
import {Link} from "react-router-dom";

const RecipeScreen = ({match: { params }, props}) => {
    const id = params.id;
    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [createDate, setCreateDate]=useState('');
    const [userId, setUserId] = useState('');

    const creator = props.creator;

    const loadChanges = async () => {
        try{
            const resp = await services.getRecipe(id);
            console.log(resp);
            const recipe = resp.data;
            setLongDesc(recipe.longDesc);
            setName(recipe.name);
            setShortDesc(recipe.shortDesc);
            setCreateDate(recipe.createDate);
            setUserId(recipe.userId);
        }catch (error) {
            console.log(error);
            alert('Failed changes');
        }
    };

    useEffect(()=>{
        loadChanges()
    }, []);

    const deleteRecipe = async () => {
        try{
            await services.deleteRecipe(id);
            window.location.reload();
        }catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    };

    return (
        <Container>
            <Row style={{margin: "10px"}}>
                <Col lg={4}>
                    <Card.Img variant="top" src={faker.image.food()} />
                </Col>
                <Col lg={5}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {createDate}
                    </Card.Text>
                    <Card.Text>
                        {shortDesc}
                    </Card.Text>
                    <Link to={`/edit/${id}`}>
                        <Button
                            variant="primary"
                            style={{marginRight: "10px"}}
                            disabled={userId!=creator}
                        >
                            Edit
                        </Button>
                    </Link>
                    <Link to={`/`}>
                        <Button
                            variant="danger"
                            style={{marginRight: "10px"}}
                            onClick={deleteRecipe}
                            disabled={userId!=creator}
                        >
                            Delete
                        </Button>
                    </Link>
                    <Link to={`/`}>
                        <Button
                            variant="success"
                        >
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row className="justify-content-md-center" >
                <Col lg={0}>
                    <h2>Full recipe:</h2>
                    <Card.Text>
                        {longDesc}
                    </Card.Text>
                </Col>
            </Row>
        </Container>
    )
};

export default RecipeScreen;
