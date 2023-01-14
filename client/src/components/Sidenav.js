import "../Sidenav.css";

const Sidenav = () => {

    const openNav = () => {
      document.getElementById("mySidenav").style.width = "250px";
    }

    const closeNav = () => {
      document.getElementById("mySidenav").style.width = "0";
    }

    return (
      <div style={{paddingLeft: 8}}>
        <div id="mySidenav" className="sidenav">
          <a className="closebtn" onClick={closeNav}>&times;</a>        
          <a href="/">Home</a>
          <a href="/assignments">Assignments</a>
        </div>
        {/* <span style={{fontSize: '30px', cursor: 'pointer'}} onClick={openNav}>&#9776;</span> */}
        <div className="navbar-toggler" style={{cursor: 'pointer'}} >
        <span className="navbar-toggler-icon" onClick={openNav}></span>
        </div>
      </div>
    );
};

export default Sidenav;
