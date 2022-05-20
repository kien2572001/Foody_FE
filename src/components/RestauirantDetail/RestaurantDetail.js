import { useEffect, useState } from "react";
import "./RestaurantDetail.scss";
import { adminService } from "../../services";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import CommentModal from "./CommentModal";
import moment from "moment";
const RestaurantDetail = (props) => {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    time_from: "",
    time_to: "",
    price_from: "",
    price_to: "",
    phone: "",
    image: "",
    rate: {
      overall: "9.9",
      location: "9.9",
      price: "9.9",
      service: "9.9",
      quality: "9.9",
      space: "9.9",
      countComment: 410,
    },
  });
  const [rating, setRating] = useState({
    overall: 9.9,
    location: 9.9,
    price: 9.9,
    service: 9.9,
    quality: 9.9,
    space: 9.9,
    countComment: 410,
  });

  const [posts, setPosts] = useState([]);
  const [showDishDetail, setShowDishDetail] = useState(false);
  const [showAddDish, setAddDish] = useState(false);
  const [nameDish, setNameDish] = useState("");
  const [priceDish, setPriceDish] = useState("");
  const [imageDish, setImageDish] = useState("");
  const [descriptionDish, setDescriptionDish] = useState("");

  const [dish, setDish] = useState([]);

  const [menu, setMenu] = useState([]);
  const handleShowDishDetail = (id) => {
    let dish = menu.find((item) => item.id === id);
    setDish(dish);
    setShowDishDetail(true);
  };

  const resetAddDish = () => {
    setNameDish("");
    setPriceDish("");
    setImageDish("");
    setDescriptionDish("");
  };

  const addDish = async () => {
    try {
      let dish = {
        restaurant_id: id,
        name: nameDish,
        price: priceDish,
        image: imageDish,
        description: descriptionDish,
      };
      console.log(dish);
      let res = await adminService.addDish(props.token, dish);
      console.log(res);
      if (res) {
        setAddDish(false);
        resetAddDish();
        getDishByRestaurantId();
        alert("Thêm món ăn thành công");
      } else {
        alert("Thêm thất bại");
      }
    } catch (error) {
      console.log(error);
      alert("Thêm thất bại");
    }
  };

  const getRestaurantById = async () => {
    try {
      let temp = await adminService.getRestaurantById(props.token, id);
      setRestaurant({
        name: temp.name,
        address: temp.address,
        time_from: temp.time_from,
        time_to: temp.time_to,
        price_from: temp.price_from,
        price_to: temp.price_to,
        phone: temp.phone,
        image: temp.image,
        rate: {
          overall: "9.9",
          location: "9.9",
          price: "9.9",
          service: "9.9",
          quality: "9.9",
          space: "9.9",
          countComment: 410,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDishByRestaurantId = async () => {
    try {
      let temp = await adminService.getDishesByRestaurantId(props.token, id);
      console.log(temp);
      setMenu(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsByRestaurantId = async () => {
    try {
      let temp = await adminService.getAllPostsByRestaurantId(props.token, id);
      let count = temp.length;
      if (count === 0) {
        setRating({
          overall: 0,
          location: 0,
          price: 0,
          service: 0,
          quality: 0,
          space: 0,
          countComment: 0,
        });

        return;
      }
      let overall = 0;
      let location = 0;
      let price = 0;
      let service = 0;
      let quality = 0;
      let space = 0;
      for (let i = 0; i < temp.length; i++) {
        location += parseFloat(temp[i].location);
        price += parseFloat(temp[i].price);
        service += parseFloat(temp[i].service);
        quality += parseFloat(temp[i].quality);
        space += parseFloat(temp[i].space);
        overall +=
          (parseFloat(temp[i].location) +
            parseFloat(temp[i].price) +
            parseFloat(temp[i].service) +
            parseFloat(temp[i].quality) +
            parseFloat(temp[i].space)) /
          5;
      }
      setRating({
        overall: overall / count,
        location: location / count,
        price: price / count,
        service: service / count,
        quality: quality / count,
        space: space / count,
      });
      setPosts(temp);
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurantById();
    getDishByRestaurantId();
    getPostsByRestaurantId();
  }, []);

  const nav = [
    "Trang chủ",
    "Giao tận nơi",
    "Ảnh & video",
    "Bình luận",
    "Chi nhánh",
    "Bản đồ",
    "Bãi đỗ xe",
  ];

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", "vx9d0mtd");
    formData.append("cloud_name", "kien-save-img");
    formData.append("folder", "foody");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/kien-save-img/image/upload",
      formData
    );
    setImageDish(res.data.url);
  };

  return (
    <div className="restaurant-detail-container">
      {/* Dish detail */}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showDishDetail}
        onHide={() => setShowDishDetail(false)}
        dialogClassName="dish-modal-modify"
      >
        <Modal.Body bsPrefix="dish-detail-modal-body">
          <div className="dish-detail-container">
            <div className="dish-detail-image">
              <img src={dish.image} alt="" />
            </div>
            <div className="img-content">
              <div className="dish-detail-name">{dish.name}</div>
              <div className="dish-detail-price">{dish.price}đ</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer bsPrefix="dish-detail-footer">
          <Button onClick={() => setShowDishDetail(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add dish */}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showAddDish}
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
                            imageDish
                              ? imageDish
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
              <label htmlFor="name">Tên món ăn: </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={nameDish}
                onChange={(e) => setNameDish(e.target.value)}
              />
            </div>

            <div className="box-input">
              <label htmlFor="price">Giá: </label>
              <input
                type="number"
                className="form-control"
                id="price"
                min={0}
                step={1000}
                value={priceDish}
                onChange={(e) => setPriceDish(e.target.value)}
              />
            </div>

            <div className="box-input">
              <label htmlFor="description">Mô tả: </label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                value={descriptionDish}
                onChange={(e) => setDescriptionDish(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer bsPrefix="modal-footer-modify">
          <button onClick={() => addDish()}>Thêm</button>
          <button
            style={{ backgroundColor: "#f03333" }}
            onClick={() => {
              setAddDish(false);
              resetAddDish();
            }}
          >
            Hủy
          </button>
        </Modal.Footer>
      </Modal>

      {/* Khac */}
      <div className="restaurant-detail">
        <div className="restaurant-detail-header">
          <div className="img-container">
            <img src={restaurant.image} alt="restaurant" />
          </div>
          <div className="restaurant-detail-header-info">
            <div className="name">{restaurant.name}</div>
            <div className="rating">
              <div className="rating-total">{rating.overall.toFixed(1)}</div>
              <div className="rating-count">
                <div className="number">{rating.location.toFixed(1)}</div>
                <div className="text">Vị trí</div>
              </div>
              <div className="rating-count">
                <div className="number">{rating.price.toFixed(1)}</div>
                <div className="text">Giá cả</div>
              </div>
              <div className="rating-count">
                <div className="number">{rating.service.toFixed(1)}</div>
                <div className="text">Phục vụ</div>
              </div>
              <div className="rating-count">
                <div className="number">{rating.quality.toFixed(1)}</div>
                <div className="text">Chất lượng</div>
              </div>
              <div className="rating-count">
                <div className="number">{rating.space.toFixed(1)}</div>
                <div className="text">Không gian</div>
              </div>
              <div className="rating-comment">
                <div className="number">{posts.length}</div>
                <div className="text">Bình luận</div>
              </div>
            </div>
            <div className="address box">
              <i class="fas fa-location-arrow"></i>
              {restaurant.address}
            </div>
            <div className="time box">
              <i class="fas fa-clock"></i>
              {restaurant.time_from} - {restaurant.time_to}
            </div>
            <div className="price box">
              <i class="fas fa-tag"></i>
              {restaurant.price_from}đ - {restaurant.price_to}đ
            </div>
          </div>
        </div>
        <div className="restaurant-detail-body">
          <div className="left-side">
            {nav.map((item, index) => {
              return (
                <div className="nav-item" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
          {/* Ben phai */}
          <div className="right-side">
            <div className="menu-box">
              <div className="menu-box-header">
                <div className="text">Thực đơn</div>
                {props.isAdmin === 1 ? (
                  <div
                    className="add-dish-btn"
                    onClick={() => setAddDish(!showAddDish)}
                  >
                    Thêm món
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="menu-box-body">
                {menu.map((item, index) => {
                  return (
                    <div className="menu-item" key={index}>
                      <div
                        className="menu-item-img"
                        onClick={() => handleShowDishDetail(item.id)}
                      >
                        <img src={item.image} alt="menu" />
                      </div>
                      <div
                        className="menu-item-name"
                        onClick={() => handleShowDishDetail(item.id)}
                      >
                        {item.name}
                      </div>
                      <div className="menu-item-price">
                        <span className="price">{item.price}đ</span>
                        <div className="btn-add">
                          <span>+</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="more-detail-btn">
                <span>Xem thêm</span>
              </div>
            </div>
            <div className="comment-box">
              <div className="list-comment">
                {posts?.map((item, index) => {
                  return (
                    <>
                      <div className="comment-item">
                        <div className="comment-item-header">
                          <div className="avatar">
                            <img
                              src={
                                item.user.image ||
                                "https://images.foody.vn/usr/g2727/27263966/avt/c40x40/foody-avatar-1a56d9f9-cc86-49c8--553ba977-220412110440.jpg"
                              }
                              alt="avatar"
                            />
                          </div>
                          <div className="info">
                            <div className="name">{item.user.name}</div>
                            <div className="time">
                              {moment(item.created_at).format(
                                "DD/MM/YYYY hh:mm"
                              )}
                            </div>
                          </div>
                          <div className="rating">
                            <span>
                              {(
                                (parseFloat(item.location) +
                                  parseFloat(item.price) +
                                  parseFloat(item.service) +
                                  parseFloat(item.quality) +
                                  parseFloat(item.space)) /
                                5
                              ).toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="comment-item-body">
                          <div className="restaurant-name">{item.title}</div>
                          <br />
                          <div className="comment-content">
                            <span>{item.content}</span>
                          </div>
                        </div>
                        <div className="comment-item-footer">
                          <div className="like-btn comment-btn">
                            <i class="fas fa-heart"></i>
                            Thích
                          </div>
                          <div className="reply-btn comment-btn">
                            <i class="fas fa-comment"></i>
                            Thảo luận
                          </div>
                          <div className="report-btn comment-btn">
                            <i class="fas fa-exclamation-triangle"></i>
                            Báo lỗi
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="comment-summary">
                <div className="comment-summary-header">
                  <span className="number">414</span>
                  &nbsp; Bình luận đã chia sẻ
                </div>
                <div className="comment-summary-body">
                  <div className="comment-detail">
                    <div className="rating-item">
                      <div className="number" style={{ color: "#8E44AD" }}>
                        406
                      </div>
                      <div className="text">Tuyệt vời</div>
                    </div>
                    <div className="rating-item">
                      <div className="number" style={{ color: "#03ae03" }}>
                        2
                      </div>
                      <div className="text">Khá tốt</div>
                    </div>
                    <div className="rating-item">
                      <div className="number" style={{ color: "#333" }}>
                        1
                      </div>
                      <div className="text">Trung bình</div>
                    </div>
                    <div className="rating-item">
                      <div className="number" style={{ color: "#c00" }}>
                        3
                      </div>
                      <div className="text">Kém</div>
                    </div>
                  </div>
                  <div className="rating-total">
                    <div className="rating-total-box">
                      <div className="number">
                        9.9 <span>điểm</span>
                      </div>
                      <div className="text"> - Tuyệt vời</div>
                    </div>
                  </div>
                </div>

                <div className="blank-box"></div>

                {props.isAdmin === 0 ? (
                  <CommentModal
                    restaurant={restaurant}
                    restaurant_id={id}
                    user_id={props.adminInfo.id}
                    token={props.token}
                    rating={rating}
                  />
                ) : (
                  <></>
                )}
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
    isLoggedIn: state.admin.isLoggedIn,
    token: state.admin.token,
    isAdmin: state.admin.isAdmin,
    adminInfo: state.admin.adminInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail);
