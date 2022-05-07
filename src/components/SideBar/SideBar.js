import "./SideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const SideBar = () => {
  const [selection, setSelection] = useState("Home");

  const admin = [
    {
      name: "Home",
      icon: "fas fa-home",
    },
    {
      name: "Restaurants",
      icon: "fas fa-utensils",
    },
    {
      name: "Users",
      icon: "fas fa-users",
    },
  ];

  return (
    <>
      <div className="side-bar">
        {admin.map((item, index) => {
          return (
            <div
              className={
                selection === index ? "sidebar-item-active" : "sidebar-item"
              }
              onClick={() => {
                setSelection(index);
              }}
            >
              <div className="sidebar-icon">
                <i class={item.icon}></i>
              </div>
              <div className="sidebar-text">{item.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;
