import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { userService } from "../../services";
import axios from "axios";
import "./CommentModal.scss";
const CommentModal = (props) => {
  const [show, setShow] = useState(false);
  const [imageOrRating, setImageOrRating] = useState(1); // 1: image, 2: rating
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [footer, setFooter] = useState("");
  const [vitri, setVitri] = useState(0);
  const [giaca, setGiaca] = useState(0);
  const [chatluong, setChatluong] = useState(0);
  const [phucvu, setPhucvu] = useState(0);
  const [khonggian, setKhonggian] = useState(0);

  const [anh, setAnh] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const resetState = () => {
    setTitle("");
    setContent("");
    setFooter("");
    setVitri(0);
    setGiaca(0);
    setChatluong(0);
    setPhucvu(0);
    setKhonggian(0);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    let img = file[0];
    formData.append("file", img);
    formData.append("upload_preset", "vx9d0mtd");
    formData.append("cloud_name", "kien-save-img");
    formData.append("folder", "foody");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/kien-save-img/image/upload",
      formData
    );
    return res.data.url;
  };

  const handleOnChangeImageInput = async (e) => {
    let file = acceptedFiles[0];
    let url = await uploadImage(file);
    setAnh({
      ...anh,
      url,
    });
    setTimeout(() => {
      console.log(anh);
    }, 100);
  };

  const handleSubmit = async () => {
    let post = {
      title: title,
      content: content,
      footer: "footer",
      vitri: vitri,
      giaca: giaca,
      chatluong: chatluong,
      phucvu: phucvu,
      khonggian: khonggian,
      restaurant_id: props.restaurant_id,
      user_id: props.user_id,
    };
    console.log(post);
    try {
      let temp = await userService.sendPost(post, props.token);
      if (temp) {
        alert("????ng b??i th??nh c??ng");
        resetState();
        setShow(false);
      } else {
        alert("????ng b??i th???t b???i");
      }
    } catch (error) {
      console.log(error);
      alert("????ng b??i th???t b???i");
    }
  };

  return (
    <>
      <div className="comment-btn" onClick={() => setShow(true)}>
        <span>
          <i class="fas fa-comment"></i>
          Vi???t b??nh lu???n
        </span>
      </div>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        dialogClassName="get-comment-modal"
        contentClassName="get-comment-modal-content"
      >
        <Modal.Header bsPrefix="get-comment-modal-header">
          Vi???t b??nh lu???n:
        </Modal.Header>
        <Modal.Body bsPrefix="get-comment-modal-body">
          <div className="infor-box">
            <div className="infor-box-left">
              <div className="img-container">
                <img src={props.restaurant.image} />
              </div>
              <div className="restaurant-infor-box">
                <div className="rating">5.3</div>
                <div className="text-container">
                  <div className="restaurant-name">{props.restaurant.name}</div>
                  <div className="restaurant-address">
                    {props.restaurant.address}
                  </div>
                </div>
              </div>
              <div className="summary-box">
                <div className="comment-count">2 B??nh lu???n</div>
                <div className="rating-box">
                  <div className="rating-item">
                    <div className="rating-item-number">0</div>
                    <div className="rating-item-text">Tuy???t v???i</div>
                  </div>
                  <div className="rating-item">
                    <div className="rating-item-number">0</div>
                    <div className="rating-item-text">Tuy???t v???i</div>
                  </div>
                  <div className="rating-item">
                    <div className="rating-item-number">0</div>
                    <div className="rating-item-text">Tuy???t v???i</div>
                  </div>
                  <div className="rating-item">
                    <div className="rating-item-number">0</div>
                    <div className="rating-item-text">Tuy???t v???i</div>
                  </div>
                </div>
                <div className="process-box">
                  <div className="title">????nh gi??</div>
                  <img
                    className="ruler"
                    src="https://www.foody.vn/style/images/icons/ratin-rank.png"
                  />
                  <ul>
                    <li>
                      <label>V??? tr??</label>
                      <div className="process-bar">
                        <div
                          className="process-bar-inner"
                          style={{ width: `${props.rating.location * 10}px` }}
                        ></div>
                      </div>
                      <span>{props.rating.location}</span>
                    </li>
                    <li>
                      <label>Gi?? c???</label>
                      <div className="process-bar">
                        <div
                          className="process-bar-inner"
                          style={{ width: `${props.rating.price * 10}px` }}
                        ></div>
                      </div>
                      <span>{props.rating.price}</span>
                    </li>
                    <li>
                      <label>Ch???t l?????ng</label>
                      <div className="process-bar">
                        <div
                          className="process-bar-inner"
                          style={{ width: `${props.rating.quality * 10}px` }}
                        ></div>
                      </div>
                      <span>{props.rating.quality}</span>
                    </li>
                    <li>
                      <label>Ph???c v???</label>
                      <div className="process-bar">
                        <div
                          className="process-bar-inner"
                          style={{ width: `${props.rating.service * 10}px` }}
                        ></div>
                      </div>
                      <span>{props.rating.service}</span>
                    </li>
                    <li>
                      <label>Kh??ng gian</label>
                      <div className="process-bar">
                        <div
                          className="process-bar-inner"
                          style={{ width: `${props.rating.space * 10}px` }}
                        ></div>
                      </div>
                      <span>{props.rating.space}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="infor-box-right">
              <div className="input-box">
                {imageOrRating === 1 ? (
                  <>
                    <input
                      className="title-input"
                      placeholder='Nh???p ti??u ?????, v?? d???: "M??n ??n ??? ????y th???t tuy???t"'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      className="content-input"
                      placeholder="Nh???p n???i dung b??nh lu???n"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="upload-box">
                      {/* Input  */}
                      <section className="container">
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input
                            {...getInputProps()}
                            onChange={(e) => handleOnChangeImageInput(e)}
                          />
                          <p>Th??m ???nh</p>
                        </div>
                      </section>

                      {/* Previews  */}
                      {/* <div className="image-box">
                        <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" />
                      </div>
                      <div className="image-box">
                        <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" />
                      </div>
                      <div className="image-box">
                        <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" />
                      </div>
                      <div className="image-box">
                        <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" />
                      </div>
                      <div className="image-box">
                        <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" />
                      </div> */}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rating-title">????nh gi??</div>
                    <div className="rating-box">
                      <ul>
                        {/* Vi tri */}
                        <li>
                          <label for="customRange1" class="form-label">
                            V??? tr??
                          </label>
                          <input
                            type="range"
                            class="form-range"
                            id="customRange1"
                            min="0"
                            max="10"
                            step="1"
                            value={vitri}
                            onChange={(e) => setVitri(e.target.value)}
                          />
                          <label className="score">{vitri}</label>
                        </li>
                        {/* Gia ca */}
                        <li>
                          <label for="customRange1" class="form-label">
                            Gi?? c???
                          </label>
                          <input
                            type="range"
                            class="form-range"
                            id="customRange1"
                            min="0"
                            max="10"
                            step="1"
                            value={giaca}
                            onChange={(e) => setGiaca(e.target.value)}
                          />
                          <label className="score">{giaca}</label>
                        </li>
                        {/* Chat luong */}
                        <li>
                          <label for="customRange1" class="form-label">
                            Ch???t l?????ng
                          </label>
                          <input
                            type="range"
                            class="form-range"
                            id="customRange1"
                            min="0"
                            max="10"
                            step="1"
                            value={chatluong}
                            onChange={(e) => setChatluong(e.target.value)}
                          />
                          <label className="score">{chatluong}</label>
                        </li>
                        {/* Phuc vu */}
                        <li>
                          <label for="customRange1" class="form-label">
                            Ph???c v???
                          </label>
                          <input
                            type="range"
                            class="form-range"
                            id="customRange1"
                            min="0"
                            max="10"
                            step="1"
                            value={phucvu}
                            onChange={(e) => setPhucvu(e.target.value)}
                          />
                          <label className="score">{phucvu}</label>
                        </li>
                        {/* Khong gian */}
                        <li>
                          <label for="customRange1" class="form-label">
                            Kh??ng gian
                          </label>
                          <input
                            type="range"
                            class="form-range"
                            id="customRange1"
                            min="0"
                            max="10"
                            step="1"
                            value={khonggian}
                            onChange={(e) => setKhonggian(e.target.value)}
                          />
                          <label className="score">{khonggian}</label>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <div className="btn-box">
                <ul>
                  <li
                    className={imageOrRating === 1 ? "active" : ""}
                    onClick={() => setImageOrRating(1)}
                  >
                    H??nh ???nh
                  </li>
                  <li
                    className={imageOrRating === 2 ? "active" : ""}
                    onClick={() => setImageOrRating(2)}
                  >
                    ????nh gi??
                  </li>
                </ul>
                <div className="btn" onClick={() => setShow(false)}>
                  {" "}
                  Hu???
                </div>
                <div className="btn" onClick={() => handleSubmit()}>
                  Ho??n t???t
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentModal;
