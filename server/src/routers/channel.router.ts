import * as express from "express";
import { channelController } from "../controllers";
import { authenticationPolicy } from "../middlewares";
import { auth } from "../middlewares/checkSession";


const router: express.Router = express.Router();
/* channels routes */
router.get("/", authenticationPolicy, channelController.getAllChannel);
router.get(
  "/:channelId",
  authenticationPolicy,
  channelController.getChannelData
);
router.get(
  "/getAllMessagesByChannelId/:channelId",
  auth,
  channelController.getChannelData
);
router.post("/", authenticationPolicy, channelController.createChannel);
router.put("/", authenticationPolicy, channelController.updateChannel);

export default router;
