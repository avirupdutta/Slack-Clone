import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as http from "http";
import * as logger from "morgan";
import * as socketIo from "socket.io";
import passportConfig from './config/passport';
import { checkSession, useSession } from "./middlewares";
import { apiV1Router, sockets } from "./routers";
import { NODE_ENV, SERVER_PORT } from "./utils/secrets";


/**
 * create server
 */
/* connect express with socket.io, wrapping app with http server, then wrap http server with socket.io */
const app: express.Application = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

/**
 * middlewares
 */
/* development build, use logger & simulateLatency */
if (NODE_ENV === "development") {
  app.use(logger("dev"));
  app.use(cors(
    {
      credentials: true,
      origin: [
        "http://localhost:3000",
        "http://localhost:3001"
      ]
    }
  ));

  // to simulate latency of 50ms - 1000ms
  // app.use(simulateLatency(50, 1000));
}

/* production build */
if (NODE_ENV === "production") {
  /* client is served with seperate server, allow cors for that client server */
  app.use(cors({ credentials: true, origin: "https://dev.instaconnect.io" }));

  /* client is served within server, join client build path */
  // app.use(express.static(path.join(__dirname, "./client")));
  // app.get("/", (req, res) => {
  //   res.sendFile("index.html", { root: path.join(__dirname, "./client") });
  // });
}

app.set("port", SERVER_PORT);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(useSession());
app.use(checkSession());
app.use(helmet());
app.use(compression());
app.use("/assets", express.static("assets"));
passportConfig(app)

/*
 * routes & websockets events listener 
 */
app.use("/api/v1", apiV1Router);
sockets(io);

export { app, httpServer };

