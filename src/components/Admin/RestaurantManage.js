//import "bootstrap/dist/css/bootstrap.min.css";
//import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";
import { adminService } from "../../services";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RestaurantManage.scss";
//Redux
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import moment from "moment";
import Dropzone from "react-dropzone";
import TimePicker from "react-time-picker";
import RestaurantItem from "./RestaurantItem";
import { Modal, Button } from "react-bootstrap";

const RestaurantsManage = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [showNewRestaurantModal, setShowNewRestaurantModal] = useState(false);
  const handleCloseNewRestaurantModal = () => {
    setShowNewRestaurantModal(false);
  };

  const handleShowNewRestaurantModal = () => {
    setShowNewRestaurantModal(true);
  };

  const handleSaveNewRestaurant = (restaurant) => {
    console.log("Save");
  };

  useEffect(async () => {
    try {
      let temp = await adminService.getAllRestaurants(props.token);
      setRestaurants(temp);
      //console.log(temp);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showNewRestaurantModal}
        dialogClassName="modal-modify"
        contentClassName="modal-modify-content"
      >
        <Modal.Header bsPrefix="modal-header-modify">
          <Modal.Title id="contained-modal-title-vcenter">
            Add restaurant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix="modal-body-modify">
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="dropzone-div-box">
                <div {...getRootProps()} style={{ textAlign: "center" }}>
                  <input {...getInputProps()} />
                  <div className="image-placeholder">
                    <div className="avatar-edit"></div>
                    <div className="avatar-preview">
                      <div className="imagePreview">
                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAeAB4AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9MooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAE3DcFyMkZApFkjZyiupZeoB5FVvKCamrhmJeJupyByvSo4Y0M8QgXKwZDyH+I4xj355NAF0SIzlFdSy9QDyKdWdAiiOxdeHfO5gOTlST+tPtJpp5ZI3cfuRscrj5m9fbgfnQBd3L83zD5evPSkWRHTejqy+oORVKKGNYbuN3byxLuZmOSRhScmmMu6KaQJ5cUrxqARgkbsEke+aANBHSRdyMrL6qcinVWhVUvZ1QAKURiB68j+QFWaACiiigAooooAKKKKACiiigBhjBmWXJ3BSo/HH+FQwWnkFds8zKvRWIx/KrNFAFdLNI3LKz99oJ4TPXFLFaRwsjIWBVdp5+8OvP4/zqeigCCS1SSOVNzjzGDkjGQRjp+QoFqPLeOSWSVXGPnI4+mAKnooAihgWHdhmdmOSzHJNS0UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//9k=" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="form-group">
            {/* Name */}
            <div className="box-input">
              <label htmlFor="name">Restaurant Name</label>
              <input type="text" className="form-control" id="name" />
            </div>
            {/* Address */}
            <div className="box-input">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" />
            </div>
            {/* Phone */}
            <div className="box-input">
              <label htmlFor="phone">Phone</label>
              <input type="text" className="form-control" id="phone" />
            </div>
            {/* Time from to */}
            <div className="time-input">
              <div className="time-input-flex">
                <label htmlFor="time-from">From</label>
                <input
                  type="number"
                  required
                  step="1000"
                  className="form-control"
                  id="time-from"
                  min={"0"}
                />
              </div>
              <div className="time-input-flex">
                <label htmlFor="time-to">To</label>
                <input
                  type="number"
                  required
                  step="1000"
                  className="form-control"
                  id="time-to"
                  min={"0"}
                />
              </div>
            </div>
            <div className="time-input" style={{ marginTop: "16px" }}>
              <div className="time-input-flex">
                <label htmlFor="time-from">From</label>
                <input
                  type="time"
                  required
                  step="60"
                  className="form-control"
                  id="time-from"
                />
              </div>
              <div className="time-input-flex">
                <label htmlFor="time-to">To</label>
                <input
                  type="time"
                  required
                  step="60"
                  className="form-control"
                  id="time-to"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer bsPrefix="modal-footer-modify">
          <button onClick={() => {}}>Add</button>
          <button
            style={{ backgroundColor: "#f03333" }}
            onClick={() => handleCloseNewRestaurantModal()}
          >
            Discard
          </button>
        </Modal.Footer>
      </Modal>

      {/* Container  */}
      <div className="restaurant-manage-container">
        <div className="new-restaurant">
          <div
            className="new-btn"
            onClick={() => handleShowNewRestaurantModal()}
          >
            + New Restaurant
          </div>
        </div>
        <div class="container-fluid">
          <div className="row">
            {restaurants?.map((restaurant) => {
              return (
                <div
                  className="col-xl-4 col-xxl-3 col-lg-6 col-md-6 col-sm-6"
                  key={restaurant.id}
                >
                  <div className="restaurant-item">
                    <div className="img-box">
                      <img
                        src="https://images.foody.vn/res/g106/1054374/prof/s576x330/file_restaurant_photo_w7wf_16054-2ff197c2-201116000342.jpeg"
                        alt=""
                      />
                    </div>
                    <div className="info-box">
                      <div className="header-text">
                        <div className="drop-down-btn">
                          <div className="drop-down-icon">
                            <i class="fas fa-ellipsis-v"></i>
                          </div>
                          <div className="list-box">
                            <div className="list-item">Edit</div>
                            <div className="list-item">Delete</div>
                          </div>
                        </div>
                        <div className="id">#{restaurant.id}</div>
                        <div className="name">{restaurant.name}</div>
                        <div className="created-at">
                          <i
                            class="fas fa-calendar"
                            style={{ marginRight: "10px" }}
                          ></i>
                          Created on &nbsp;
                          {moment(restaurant.created_at).format("D/M/YYYY")}
                        </div>
                      </div>
                      <div className="text">
                        <span>Location: </span>
                        &nbsp;
                        {restaurant.address}
                      </div>
                      <div className="text">
                        <span>Phone: &nbsp;</span>
                        {restaurant.phone}
                      </div>

                      <div className="text">
                        <span>From: &nbsp;</span>
                        {restaurant.time_from}&nbsp;<span>To: &nbsp;</span>
                        {restaurant.time_to}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.admin.isLoggedIn,
    token: state.admin.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsManage);
