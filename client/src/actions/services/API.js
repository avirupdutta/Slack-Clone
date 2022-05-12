/* eslint-disable prettier/prettier */


import {
  DEV_SERVER_PORT,
  DEV_SERVER_URL,
  DEV_SERVER_WS, NODE_ENV, PROD_SERVER_PORT,
  PROD_SERVER_URL,
  PROD_SERVER_WS
} from "@/utils/secrets";
import axios from "axios";
import io from "socket.io-client";


const apiV1 = () =>
  axios.create({
    baseURL:
      /* assume API server will expose port 3030 in development, 80 in production */
      NODE_ENV === "development"
        ? `${DEV_SERVER_URL}:${DEV_SERVER_PORT}/api/v1`
        : `${PROD_SERVER_URL}:${PROD_SERVER_PORT}/api/v1`,
    withCredentials: true
  });

const socket = io(
  /* assume API server will expose port 3030 in development, 80 in production */
  process.env.NODE_ENV === "development"
    ? `${DEV_SERVER_WS}:${DEV_SERVER_PORT}`
    : `${PROD_SERVER_WS}:${PROD_SERVER_PORT}`
);

export { socket, apiV1 };

