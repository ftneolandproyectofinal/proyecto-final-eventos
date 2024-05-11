import axios from "axios";
import { updateToken } from "../utils/updateToken";

const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${updateToken()}`,
};

export const APIUser = axios.create({
  baseURL: `https://eventland-a2if.onrender.com/api/v1`,
  headers: APIHeaders,
  timeout: 60000,
});
