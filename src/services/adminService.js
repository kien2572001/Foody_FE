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

  saveNewRestaurant(token, restaurant) {
    let headers = {
      accpet: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios.post("api/new-restaurants", restaurant, {
      headers: headers,
    });
  },

  deleteRestaurant(token, restaurantId) {
    let headers = {
      accpet: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`api/delete-restaurant/${restaurantId}`, {
      headers: headers,
    });
  },

  updateRestaurant(token, restaurant, id) {
    let headers = {
      accpet: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios.post(`api/update-restaurant/${id}`, restaurant, {
      headers: headers,
    });
  },

  getRestaurantById(token, id) {
    let headers = {
      accpet: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`api/restaurant/${id}`, {
      headers: headers,
    });
  },

  //Food CRUD
  addDish(token, dish) {
    let headers = {
      accpet: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios.post("api/add-dish", dish, {
      headers: headers,
    });
  },

  getDishesByRestaurantId(token, restaurantId) {
    let headers = {
      accpet: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`api/get-dishes-by-restaurant/${restaurantId}`, {
      headers: headers,
    });
  },
};

export default adminService;
