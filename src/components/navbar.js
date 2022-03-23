import {Link} from "react-router-dom";
import '../styling/navbar.scss';
import SVG from "./svg";


export default function NavBar(){
    return (
        <div className="navBar-container">
            <div className="navbar-left-container">
                <Link to="/">
                    <SVG name='home' color='white' />
                </Link>
            </div>
            <div className="navbar-right-container">
                <Link to="/about">About</Link>
            </div>
      </div>
    );
}

 