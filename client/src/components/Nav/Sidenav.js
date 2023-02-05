import "../../css/Sidenav.css";
import { Stack } from '@fluentui/react';

const Sidenav = () => {
    
    const openNav = () => {
      document.getElementById("mySidenav").style.width = "250px";
    }

    const closeNav = () => {
      document.getElementById("mySidenav").style.width = "0";
    }

    return (
      <Stack style={{paddingLeft: 16, paddingRight: 24}}> 
        <span className="navbar-toggler-icon" onClick={openNav} style={{cursor: 'pointer', fontSize: 20}}></span>

        <Stack.Item id="mySidenav" className="sidenav">
          <a className="closebtn" onClick={closeNav} style={{cursor: 'pointer'}}>&times;</a>        
          <a href="/">Home</a>
          <a href="/assignments">Assignments</a>
        </Stack.Item>
      </Stack>
    );
};

export default Sidenav;
