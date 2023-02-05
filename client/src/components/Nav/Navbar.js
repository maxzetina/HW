import "../../css/Navbar.css";

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavbarLink from "./NavbarLink";
import Sidenav from './Sidenav';
import { Stack } from '@fluentui/react';

const Navbar_ = () => {
    const links = [
        {name: "Canvas", link: "https://canvas.mit.edu/"},
        {name: "WebSIS", link: "http://websis.mit.edu/"},
        {name: "ATLAS", link: "https://atlas.mit.edu/atlas/Home.action"},
        {name: "Piazza", link: "https://piazza.com/"}
    ];

    return (
        <Stack>
            {/* <nav className="navbar navbar-dark flex-container" style={{display:"flex", justifyContent: "left", backgroundColor: "#0078d4"}}>
                <Sidenav />
                <Stack className="navbar-brand">HW</Stack>
                {links.map((x, key) => <NavbarLink key={key} name={x.name} link={x.link} />)}
                <NavDropdown title="031" id="basic-nav-dropdown" bg='primary'>
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                </NavDropdown>
            </nav> */}
                
                <Navbar variant='dark' style={{height: 62, backgroundColor: "#0078d4"}}>
                    <Sidenav />
                    <Navbar.Brand>HW</Navbar.Brand>
                    <Nav className="me-auto">
                        {links.map((x, key) => <NavbarLink key={key} name={x.name} link={x.link} />)}
                        <NavDropdown title="031" id="basic-nav-dropdown" style={{fontSize: 20}}>
                            <NavDropdown.Item href="https://clicker.mit.edu/6.102" target={"_blank"}>Clicker</NavDropdown.Item>
                            <NavDropdown.Item href="https://quiz.mit.edu/" target={"_blank"}>Quiz</NavDropdown.Item>
                            <NavDropdown.Item href="https://caesar.mit.edu/" target={"_blank"}>Caesar</NavDropdown.Item>
                            <NavDropdown.Item href="https://omni.mit.edu/6.102/sp23/" target={"_blank"}>Omnivore</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
        </Stack>
    );
}


export default Navbar_;