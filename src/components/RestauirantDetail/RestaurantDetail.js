import "./RestaurantDetail.scss";

const RestaurantDetail = (props) => {
  const restaurant = {
    name: "Restaurant 1",
    address: "123 Main St",
    from: "12:00",
    to: "23:00",
    phone: "1234567890",
    website: "www.restaurant.com",
    rate: {
      overall: "9.9",
      location: "9.9",
      price: "9.9",
      service: "9.9",
      quality: "9.9",
      space: "9.9",
      countComment: 410,
    },
  };

  const nav = [
    "Trang chủ",
    "Giao tận nơi",
    "Ảnh & video",
    "Bình luận",
    "Chi nhánh",
    "Bản đồ",
    "Bãi đỗ xe",
  ];

  const menu = [
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
    {
      name: "Chào sườn Sụn+ ruốc Heo",
      img: "https://images.foody.vn/res/g106/1054374/s120x120/22666e9d-b604-4ae3-89f2-557195c5-5f56f16e-201226164158.jpeg",
    },
  ];

  return (
    <div className="restaurant-detail">
      <div className="restaurant-detail-header">
        <div className="img-container">
          <img
            src="https://images.foody.vn/res/g106/1054374/prof/s576x330/file_restaurant_photo_w7wf_16054-2ff197c2-201116000342.jpeg"
            alt="restaurant"
          />
        </div>
        <div className="restaurant-detail-header-info">
          <div className="name">{restaurant.name}</div>
          <div className="rating">
            <div className="rating-total">9.9</div>
            <div className="rating-count">
              <div className="number">9.9</div>
              <div className="text">Vị trí</div>
            </div>
            <div className="rating-count">
              <div className="number">9.9</div>
              <div className="text">Giá cả</div>
            </div>
            <div className="rating-count">
              <div className="number">9.9</div>
              <div className="text">Phục vụ</div>
            </div>
            <div className="rating-count">
              <div className="number">9.9</div>
              <div className="text">Chất lượng</div>
            </div>
            <div className="rating-count">
              <div className="number">9.9</div>
              <div className="text">Không gian</div>
            </div>
            <div className="rating-comment">
              <div className="number">410</div>
              <div className="text">Bình luận</div>
            </div>
          </div>
          <div className="address box">
            <i class="fas fa-location-arrow"></i>
            {restaurant.address}
          </div>
          <div className="time box">
            <i class="fas fa-clock"></i>
            {restaurant.from} - {restaurant.to}
          </div>
          <div className="price box">
            <i class="fas fa-tag"></i>
            30000đ - 50000đ
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
            <div className="menu-box-header">Thực đơn</div>
            <div className="menu-box-body">
              {menu.map((item, index) => {
                return (
                  <div className="menu-item" key={index}>
                    <div className="menu-item-img">
                      <img src={item.img} alt="menu" />
                    </div>
                    <div className="menu-item-name">{item.name}</div>
                    <div className="menu-item-price">
                      <span className="price">40,000đ</span>
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
              <div className="comment-item">
                <div className="comment-item-header">
                  <div className="avatar">
                    <img
                      src="https://images.foody.vn/usr/g2727/27263966/avt/c40x40/foody-avatar-1a56d9f9-cc86-49c8--553ba977-220412110440.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div className="info">
                    <div className="name">Hieu Minh</div>
                    <div className="time">13/5/2022 11:27</div>
                  </div>
                  <div className="rating">
                    <span>10</span>
                  </div>
                </div>
                <div className="comment-item-body">
                  <div className="restaurant-name">
                    Cháo Sườn Sụn 88 - Cháo Gia Truyền - Shop Online
                  </div>
                  <br />
                  <div className="comment-content">
                    <span>Cháo ăn rất ngon . Sụn ăn mềm ăn đã cái miệng</span>
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

              <div className="comment-btn">
                <span>
                  <i class="fas fa-comment"></i>
                  Viết bình luận
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
