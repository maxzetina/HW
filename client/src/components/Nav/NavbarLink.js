import { Nav } from 'react-bootstrap';
import { Stack } from '@fluentui/react';

const NavbarLink = (props) => {
    return (            
        <Stack className="navbar-nav">
            <Nav.Link className="nav-link" href={props.link} target={"_blank"} style={{fontSize: 20}}>{props.name}</Nav.Link>
        </Stack>
    );
}

export default NavbarLink;