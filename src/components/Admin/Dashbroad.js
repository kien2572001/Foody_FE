import { useState } from "react";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import NavBar from "../NavBar/NavBar";
import "./Dashbroad.scss";
import SideBar from "../SideBar/SideBar";

//react router

import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../../redux";

import RestaurantManage from "./RestaurantManage";
import Home from "../Home/Home";
import UserManage from "./UserManage";
import RestaurantDetail from "../RestauirantDetail/RestaurantDetail";

const Dashbroad = () => {
  const [title, setTitle] = useState("Home");

  const changeTitle = (title) => {
    setTitle(title);
  };

  return (
    <>
      <Router history={history}>
        <NavBar title={title} />
        <div className="dash-container">
          <div className="left-side-container">
            <SideBar changeTitle={changeTitle} />
          </div>
          <div className="right-side-container">
            <Switch>
              <Route path="/users-manage" exact component={UserManage} />
              <Route
                path="/restaurants-manage"
                exact
                component={RestaurantManage}
                //component={RestaurantDetail}
              />
              <Route path="/restaurant/:id" children={<RestaurantDetail />} />
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default Dashbroad;
