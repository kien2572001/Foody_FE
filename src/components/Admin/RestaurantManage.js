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
import { useDropzone } from "react-dropzone";
import TimePicker from "react-time-picker";
import RestaurantItem from "./RestaurantItem";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import validator from "validator";

const RestaurantsManage = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [showNewRestaurantModal, setShowNewRestaurantModal] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [time_from, setTimeFrom] = useState("");
  const [time_to, setTimeTo] = useState("");
  const [price_from, setPriceFrom] = useState("");
  const [price_to, setPriceTo] = useState("");
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    phone: "",
    time_from: "",
    time_to: "",
    price_from: "",
    price_to: "",
    image: "",
  });
  const [editOrAdd, setEditOrAdd] = useState(0); //0 la add, >1 la edit cung la so id cua cai edit
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });
  const handleCloseNewRestaurantModal = () => {
    setShowNewRestaurantModal(false);
  };

  const handleShowNewRestaurantModal = () => {
    setShowNewRestaurantModal(true);
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setPhone("");
    setTimeFrom("");
    setTimeTo("");
    setPriceFrom("");
    setPriceTo("");
    setUrl("");
  };

  const handleDiscart = () => {
    handleCloseNewRestaurantModal();
    resetForm();
  };

  const handleEdit = (id) => {
    let restaurant = restaurants.find((restaurant) => restaurant.id === id);
    setName(restaurant.name);
    setAddress(restaurant.address);
    setPhone(restaurant.phone);
    setTimeFrom(restaurant.time_from);
    setTimeTo(restaurant.time_to);
    setPriceFrom(restaurant.price_from);
    setPriceTo(restaurant.price_to);
    setUrl(restaurant.image);
    setNewRestaurant(restaurant);
    handleShowNewRestaurantModal();
    setEditOrAdd(id);
  };

  const handleUpdateRestaurant = () => {
    let restaurant = {
      name: name,
      address: address,
      phone: phone,
      time_from: time_from,
      time_to: time_to,
      price_from: price_from,
      price_to: price_to,
      image: url,
    };
    try {
      let res = adminService.updateRestaurant(
        props.token,
        restaurant,
        editOrAdd
      );
      if (res) {
        alert("Update success");
        handleCloseNewRestaurantModal();
        resetForm();
        getAllRestaurants();
        setEditOrAdd(0);
      } else {
        alert("Update fail");
      }
    } catch (error) {
      console.log(error);
      alert("Update fail");
    }
  };

  const handleSaveNewRestaurant = async () => {
    //console.log("Save");

    let temp = {
      name: name,
      address: address,
      phone: phone,
      time_from: time_from,
      time_to: time_to,
      price_from: price_from,
      price_to: price_to,
      image: url,
    };

    //console.log(temp);

    try {
      let res = await adminService.saveNewRestaurant(props.token, temp);
      if (res === true) {
        alert("Thêm mới thành công");
        resetForm();
        setShowNewRestaurantModal(false);
        await getAllRestaurants();
      } else {
        alert("Thêm mới thất bại");
      }
    } catch (error) {
      console.log(error);
      alert("Thêm mới thất bại");
    }
  };

  const getAllRestaurants = async () => {
    try {
      let res = await adminService.getAllRestaurants(props.token);
      setRestaurants(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    let res = await getAllRestaurants();
  }, []);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        576,
        333,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const uploadImage = async (file) => {
    const formData = new FormData();
    let img = await resizeFile(file[0]);
    formData.append("file", img);
    formData.append("upload_preset", "vx9d0mtd");
    formData.append("cloud_name", "kien-save-img");
    formData.append("folder", "foody");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/kien-save-img/image/upload",
      formData
    );
    setUrl(res.data.url);
  };

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
          <Dropzone
            onDrop={(acceptedFiles) => {
              uploadImage(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="dropzone-div-box">
                <div {...getRootProps()} style={{ textAlign: "center" }}>
                  <input {...getInputProps()} />
                  <div className="image-placeholder">
                    <div className="avatar-edit"></div>
                    <div className="avatar-preview">
                      <div className="imagePreview">
                        <img
                          src={
                            url
                              ? url
                              : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAeAB4AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9MooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAE3DcFyMkZApFkjZyiupZeoB5FVvKCamrhmJeJupyByvSo4Y0M8QgXKwZDyH+I4xj355NAF0SIzlFdSy9QDyKdWdAiiOxdeHfO5gOTlST+tPtJpp5ZI3cfuRscrj5m9fbgfnQBd3L83zD5evPSkWRHTejqy+oORVKKGNYbuN3byxLuZmOSRhScmmMu6KaQJ5cUrxqARgkbsEke+aANBHSRdyMrL6qcinVWhVUvZ1QAKURiB68j+QFWaACiiigAooooAKKKKACiiigBhjBmWXJ3BSo/HH+FQwWnkFds8zKvRWIx/KrNFAFdLNI3LKz99oJ4TPXFLFaRwsjIWBVdp5+8OvP4/zqeigCCS1SSOVNzjzGDkjGQRjp+QoFqPLeOSWSVXGPnI4+mAKnooAihgWHdhmdmOSzHJNS0UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//9k="
                          }
                        />
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
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            {/* Address */}
            <div className="box-input">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            {/* Phone */}
            <div className="box-input">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            {/* Time from to */}
            <div className="time-input">
              <div className="time-input-flex">
                <label htmlFor="price-from">From</label>
                <input
                  type="number"
                  required
                  step="1000"
                  className="form-control"
                  id="price-from"
                  min={"0"}
                  value={price_from}
                  onChange={(e) => {
                    setPriceFrom(e.target.value);
                  }}
                />
              </div>
              <div className="time-input-flex">
                <label htmlFor="price-to">To</label>
                <input
                  type="number"
                  required
                  step="1000"
                  className="form-control"
                  id="price-to"
                  value={price_to}
                  min={"0"}
                  onChange={(e) => {
                    setPriceTo(e.target.value);
                  }}
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
                  value={time_from}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setTimeFrom(e.target.value);
                  }}
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
                  value={time_to}
                  onChange={(e) => {
                    setTimeTo(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer bsPrefix="modal-footer-modify">
          {editOrAdd === 0 ? (
            <button
              onClick={() => {
                handleSaveNewRestaurant();
              }}
            >
              Add
            </button>
          ) : (
            <button onClick={() => handleUpdateRestaurant()}>Save</button>
          )}

          <button
            style={{ backgroundColor: "#f03333" }}
            onClick={() => handleDiscart()}
          >
            Discard
          </button>
        </Modal.Footer>
      </Modal>

      {/* Container  */}
      <div className="restaurant-manage-container">
        <div className="new-restaurant">
          {props.isAdmin === 1 ? (
            <div
              className="new-btn"
              onClick={() => handleShowNewRestaurantModal()}
            >
              + New Restaurant
            </div>
          ) : (
            <></>
          )}
        </div>
        <div class="container-fluid">
          <div className="row">
            {restaurants?.map((restaurant) => {
              return (
                <RestaurantItem
                  restaurant={restaurant}
                  key={restaurant.id}
                  token={props.token}
                  getAllRestaurants={getAllRestaurants}
                  handleEdit={handleEdit}
                  isAdmin={props.isAdmin}
                />
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
    isAdmin: state.admin.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsManage);
