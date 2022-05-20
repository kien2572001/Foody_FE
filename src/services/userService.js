import axios from "../axios";
import * as queryString from "query-string";

const userService = {
  sendPost(postBody, token) {
    let headers = {
      accpet: "application/json",
      Authorization: `Bearer ${token}`,
    };
    return axios.post("api/send-post", postBody, {
      headers: headers,
    });
  },
};

export default userService;
