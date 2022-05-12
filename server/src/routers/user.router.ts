import * as express from "express";
import { userController } from "../controllers";
import { authenticationPolicy, registerPolicy } from "../middlewares";
import { auth } from "../middlewares/checkSession";


const router: express.Router = express.Router();

/* user routes */
router.get("/auth", authenticationPolicy, userController.tryAutoSingInUser);
router.post("/oauth", userController.signInOauth);
router.post("/signup", registerPolicy, userController.signUpUser);
router.post("/signin", userController.singInUser);
router.get("/signout", userController.signOutUser);

router.get("/", authenticationPolicy, auth, userController.getAllUsers);
router.get("/:userId", authenticationPolicy, auth, userController.getUser);
router.put("/:userId", authenticationPolicy, auth, userController.updateUser);

export default router;
