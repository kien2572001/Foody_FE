import "./RestaurantManage.scss";
//import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";
import { adminService } from "../../services";
import { Modal, Button } from "react-bootstrap";

//Redux
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import moment from "moment";

const RestaurantsManage = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [showNewRestaurantModal, setShowNewRestaurantModal] = useState(false);
  const handleCloseNewRestaurantModal = () => setShowNewRestaurantModal(false);
  const handleShowNewRestaurantModal = () => setShowNewRestaurantModal(true);
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showNewRestaurantModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleCloseNewRestaurantModal()}>Close</Button>
        </Modal.Footer>
      </Modal>

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
