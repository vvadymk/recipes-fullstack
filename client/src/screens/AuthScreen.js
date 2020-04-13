import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";


export const AuthScreen = () => {
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async() => {
        try{
            const user = {
                email,
                password
            };
            console.log(user);
            await axios.post('http://localhost:9000/api/auth/register',{
                email: user.email,
                password: user.password
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (errors) {
                    console.log(errors);
                });
        }catch (error) {
            alert("Invalid input")
        }
    };

    const handleLogin = async() => {
        try{
            const user = {
                email,
                password
            };
            console.log(user);
            await axios.post('http://localhost:9000/api/auth/login',{
                email: user.email,
                password: user.password
            })
                .then(function (response) {
                    auth.login(response.data.token, response.data.userId)
                })
                .catch(function (errors) {
                    console.log(errors);
                });
        }catch (error) {
            alert("Invalid input")
        }
    };

    return(
        <Container>
            <Row>
                <Form>
                    <Form.Group
                        controlId="formBasicEmail"
                    >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={e=>setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={e=>setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default AuthScreen;
