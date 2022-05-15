import axios from "../axios";
import * as queryString from "query-string";

const adminService = {
  /**
   * Đăng nhập hệ thống
   * {
   *  "username": "string",
   *  "password": "string"
   * }
   */
  login(loginBody) {
    return axios.post("api/login", loginBody);
  },

  //Restaurant CRUD

  getAllRestaurants(token) {
    let headers = {
      accpet: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios.get("api/restaurants", {
      headers: headers,
    });
  },
};

export default adminService;
