import { Stack } from '@fluentui/react';

const NavbarLink = (props) => {
    return (            
        <Stack className="navbar-nav">
            <Stack.Item className="nav-link" href={props.link} target={"_blank"}>{props.name}</Stack.Item>
        </Stack>
    );
}


export default NavbarLink;