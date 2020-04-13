import React, { Component } from 'react';
import { Container, Row, Form } from 'react-bootstrap';
import axios from "axios";
import Recipes from '../components/Recipes';

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipes: [],
            searchInput: '',
            categoryFilter: '',
        };
        this.props = {
            isAuthenticated: props.isAuthenticated,
            userId: props.userId
        }
        this.searchHandler = this.searchHandler.bind(this);
    };

    searchHandler(event){
        this.setState({searchInput:event.target.value})
    };

    handleChange = (event) => {
        this.setState({ categoryFilter: event.target.value});
        localStorage.setItem('categoryFilter', event.target.value);
    };

    componentDidMount() {
        const categoryFilter  =localStorage.getItem('categoryFilter');
        this.setState({categoryFilter});
        axios.get('http://localhost:9000/api/recipes/').then((response)=>{
            this.setState({
                recipes: response.data
            })
        })
    };

    render(){
        const {searchInput, recipes, categoryFilter} = this.state;
            return (
            <Container>
                <Row>
                    <div>
                        <form>
                            <label htmlFor="input"
                                   className="label"
                            >
                                Search
                            </label>
                            <input type='text'
                                   placeholder={this.state.searchInput}
                                   onChange={this.searchHandler} />
                        </form>
                    </div>
                    <Form>
                        <Form.Group style={{display:"flex", marginLeft: "20px"}}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control value={localStorage.getItem('categoryFilter')}
                                          as="select"
                                          custom
                                          onChange={this.handleChange}>
                                <option value="">All</option>
                                <option value="Meat&Poultry">Meat&Poultry</option>
                                <option value="Comfort food">Comfort food</option>
                                <option value="Soups">Soups</option>
                                <option value="Breakfast&Brunch">Breakfast&Brunch</option>
                                <option value="Salads">Salads</option>
                                <option value="Desserts">Desserts</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    {
                    recipes
                        .filter(searchingFor(searchInput))
                        .filter(searchingForCategory(categoryFilter))
                        .map((recipe)=>{
                            console.log(recipe._id);
                    return(
                    <Recipes isAuthenticated = {this.props.isAuthenticated}
                    key={recipe._id}
                    id={recipe._id}
                    name={recipe.name}
                    shortDesc={recipe.shortDesc}
                    createDate={recipe.createDate}
                    category={recipe.category}
                             creator={recipe.userId}
                             userId={this.props.userId}

                    />
                    )
                    })
                    }
                </Row>
            </Container>
        )
    }
}

function searchingFor(searchInput) {
    return function(x){
        return x.name
            .toLowerCase()
            .includes(searchInput.toLowerCase()) || !searchInput;
    }
}

function searchingForCategory(searchInput) {
    return function(x){
        return x.category
            .toLowerCase()
            .includes(searchInput.toLowerCase()) || !searchInput;
    }
}

export default HomeScreen;
