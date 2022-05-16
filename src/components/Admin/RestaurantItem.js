import moment from "moment";
import { useState } from "react";
import { adminService } from "../../services";
import { Link } from "react-router-dom";
const RestaurantItem = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm("Are you sure?")) {
      adminService.deleteRestaurant(props.token, id);
      props.getAllRestaurants();
    }
    setShowDropdown(false);
  };

  const handleEdit = () => {
    props.handleEdit(props.restaurant.id);
    setShowDropdown(false);
  };

  return (
    <>
      <div
        className="col-xl-4 col-xxl-3 col-lg-6 col-md-6 col-sm-6"
        key={props.restaurant.id}
      >
        <div className="restaurant-item">
          <div className="img-box">
            <img src={props.restaurant.image} alt="" />
          </div>
          <div className="info-box">
            <div className="header-text">
              <div
                className="drop-down-btn"
                onClick={() => handleShowDropdown()}
              >
                <div className="drop-down-icon">
                  <i class="fas fa-ellipsis-v"></i>
                </div>
              </div>
              <div className={showDropdown ? "list-box display" : "list-box"}>
                <div className="list-item" onClick={() => handleEdit()}>
                  Edit
                </div>
                <div
                  className="list-item"
                  style={{ color: "red" }}
                  onClick={() => {
                    handleDelete(props.restaurant.id);
                  }}
                >
                  Delete
                </div>
              </div>

              <div className="id">#{props.restaurant.id}</div>
              <Link to={`/restaurant/${props.restaurant.id}`} className="name">
                {props.restaurant.name}
              </Link>
              <div className="created-at">
                <i class="fas fa-calendar" style={{ marginRight: "10px" }}></i>
                Created on &nbsp;
                {moment(props.restaurant.created_at).format("D/M/YYYY")}
              </div>
            </div>
            <div className="text">
              <span>Location: </span>
              &nbsp;
              {props.restaurant.address}
            </div>
            <div className="text">
              <span>Phone: &nbsp;</span>
              {props.restaurant.phone}
            </div>

            <div className="text">
              <span>From: &nbsp;</span>
              {props.restaurant.time_from}&nbsp;<span>To: &nbsp;</span>
              {props.restaurant.time_to}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantItem;
