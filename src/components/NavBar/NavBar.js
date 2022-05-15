import { useState } from "react";
//import "bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.scss";
import logo from "../../assets/images/logo.png";
import logoText from "../../assets/images/logo-text.png";
import adminService from "../../services/adminService";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

const NavBar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="nav-top">
      <div className="nav-wrapper">
        <div className="brand-logo">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-icon" />
            <img src={logoText} alt="logo-text" className="logo-text" />
          </Link>
        </div>
        <div className="header-content">
          <div className="title">{props.title}</div>
          <div
            className="avatar-block"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="name-tag">
              <div className="say-hello">Good morning</div>
              <div className="name">James Sullivan</div>
            </div>
            <img
              src="https://koki.dexignzone.com/react/demo/static/media/12.99ac3757.png"
              alt="avatar"
              className="avatar"
            />
            <div className={showDropdown ? "dropbox active" : "dropbox"}>
              <div className="dropbox-item ">
                <svg
                  id="icon-user1"
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-primary"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </div>
              <div className="dropbox-item">
                <svg
                  id="icon-inbox"
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-success"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Inbox
              </div>
              <div
                className="dropbox-item"
                onClick={() => props.processLogout()}
              >
                <svg
                  id="icon-logout"
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-danger"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.admin.isLoggedIn,
    adminInfo: state.admin.adminInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
    processLogout: () => dispatch(actions.processLogout()),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
