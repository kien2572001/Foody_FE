import "./SideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
const SideBar = (props) => {
  const [selection, setSelection] = useState("Home");

  const admin = [
    {
      name: "Home",
      icon: "fas fa-home",
      link: "/",
    },
    {
      name: "Restaurants",
      icon: "fas fa-utensils",
      link: "/restaurants-manage",
    },
    {
      name: "Users",
      icon: "fas fa-users",
      link: "/users-manage",
    },
  ];

  return (
    <>
      <div className="side-bar">
        {admin.map((item, index) => {
          return (
            <Link
              to={item.link}
              className={
                selection === index ? "sidebar-item-active" : "sidebar-item"
              }
              onClick={() => {
                setSelection(index);
                props.changeTitle(item.name);
              }}
            >
              <div className="sidebar-icon">
                <i class={item.icon}></i>
              </div>
              <div className="sidebar-text">{item.name}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;
