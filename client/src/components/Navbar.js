import "../Sidenav.css";
import Sidenav from './Sidenav';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-primary flex-container" style={{display:"flex", justifyContent: "left"}}>
                <Sidenav />
                <div className="navbar-brand">HW</div>
                <div className="navbar-nav ">
               
                <a className="nav-link" href="https://canvas.mit.edu/" target={"_blank"}>Canvas</a>
        
                </div>
                <div className="navbar-nav"> <a className="nav-link" href="http://websis.mit.edu/" target={"_blank"}>WebSIS</a></div>
            </nav>
        </div>

//         <nav class="navbar navbar-expand-lg navbar-light bg-light">

//   <div >
//     <ul class="navbar-nav">
//       <li class="nav-item active">
//         <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="#">Features</a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="#">Pricing</a>
//       </li>
//       <li class="nav-item dropdown">
//         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Dropdown link
//         </a>
//         <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//           <a class="dropdown-item" href="#">Action</a>
//           <a class="dropdown-item" href="#">Another action</a>
//           <a class="dropdown-item" href="#">Something else here</a>
//         </div>
//       </li>
//     </ul>
//   </div>
// </nav>

    );
}


export default Navbar;