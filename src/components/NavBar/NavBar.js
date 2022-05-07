import { useState } from "react";
//import "bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.scss";
import logo from "../../assets/images/logo.png";
import logoText from "../../assets/images/logo-text.png";
const NavBar = (props) => {
  return (
    <div className="nav-wrapper">
      <div className="brand-logo">
        <Link to="/">
          <img src={logo} alt="logo" className="logo-icon" />
          <img src={logoText} alt="logo-text" className="logo-text" />
        </Link>
      </div>
      <div className="header-content">
        <div className="title">Task</div>
        <div className="avatar-block">
          <div className="name-tag">
            <div className="say-hello">Good morning</div>
            <div className="name">James Sullivan</div>
          </div>
          <img
            src="https://koki.dexignzone.com/react/demo/static/media/12.99ac3757.png"
            alt="avatar"
            className="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
