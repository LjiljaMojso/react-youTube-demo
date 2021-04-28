import React, {Fragment} from "react";
import "./Header.css";
import logo from "../../img/logo.png";
import { Search } from "./Search/Search";

const Header = () => {
    return(
        <Fragment>
        <header>
            <img src ={ logo } className="logo" alt="youTube"/> 
            <Search/>
        </header>
        </Fragment>
    )   
}
export { Header }