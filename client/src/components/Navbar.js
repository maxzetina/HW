import "../css/Navbar.css";

import NavbarLink from "./NavbarLink";
import Sidenav from './Sidenav';
import { Stack } from '@fluentui/react';
import { useCallback } from "react";

const Navbar = () => {
    const links = [
        {name: "Canvas", link: "https://canvas.mit.edu/"},
        {name: "WebSIS", link: "http://websis.mit.edu/"},
    ];

    const displayLinks = useCallback(() => {
       return links.map((x, key) => <NavbarLink key={key} name={x.name} link={x.link} />)
    }, [links]);

    return (
        <Stack>
            <nav className="navbar navbar-dark flex-container" style={{display:"flex", justifyContent: "left", backgroundColor: "#0078d4"}}>
                <Sidenav />
                <Stack className="navbar-brand">HW</Stack>
                {displayLinks()}
            </nav>
        </Stack>
    );
}


export default Navbar;