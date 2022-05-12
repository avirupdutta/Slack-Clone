import * as connectRedis from "connect-redis";
import * as session from "express-session";
import redisClient from "../config/redisClient";
import {
  REDIS_HOST, REDIS_PORT, REDIS_TIME_TO_LIVE, SESSION_NAME, SESSION_SECRET
} from "../utils/secrets";


const RedisStore = connectRedis(session);

const sessionConfig = {
  store: new RedisStore({
    client: redisClient,
    port: REDIS_PORT,
    host: REDIS_HOST,
    ttl: REDIS_TIME_TO_LIVE
  }),
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    path: "/",
    secure: false,
    maxAge: 604800000 // 1000 * 60 * 60 * 24 * 7 in milliseconds
  }
};

export const jwtConfig = {
  secret: SESSION_SECRET
}

export default sessionConfig;
