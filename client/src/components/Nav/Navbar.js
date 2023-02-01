import "../../css/Navbar.css";

import NavbarLink from "./NavbarLink";
import Sidenav from './Sidenav';
import { Stack } from '@fluentui/react';

const Navbar = () => {
    const links = [
        {name: "Canvas", link: "https://canvas.mit.edu/"},
        {name: "WebSIS", link: "http://websis.mit.edu/"},
        {name: "ATLAS", link: "https://atlas.mit.edu/atlas/Home.action"}
    ];

    return (
        <Stack>
            <nav className="navbar navbar-dark flex-container" style={{display:"flex", justifyContent: "left", backgroundColor: "#0078d4"}}>
                <Sidenav />
                <Stack className="navbar-brand">HW</Stack>
                {links.map((x, key) => <NavbarLink key={key} name={x.name} link={x.link} />)}
            </nav>
        </Stack>
    );
}


export default Navbar;