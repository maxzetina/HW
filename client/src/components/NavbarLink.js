import { Stack } from '@fluentui/react';

const NavbarLink = (props) => {
    return (            
        <Stack className="navbar-nav">
            <a className="nav-link" href={props.link} target={"_blank"}>{props.name}</a>
        </Stack>
    );
}


export default NavbarLink;