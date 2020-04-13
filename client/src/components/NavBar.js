import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';

const NavBar = (props) => {
    if(props.isAuthenticated) {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Recipe Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/add">Add</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }else{
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Recipe Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/auth">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
};

export default NavBar;
