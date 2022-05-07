import { useState } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "../NavBar/NavBar";
import "./Dashbroad.scss";
import SideBar from "../SideBar/SideBar";
const Dashbroad = () => {
  return (
    <>
      <div className="nav-top">
        <NavBar />
      </div>
      <div className="dash-container">
        <div className="left-side">
          <SideBar />
        </div>

        <div className="right-side">right</div>
      </div>
    </>
  );
};

export default Dashbroad;
