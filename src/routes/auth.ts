import { Router } from "express"
import authController from "../controllers/AuthController"
import Validate from "../middleware/validation"
import requestSchema from "../requestSchema/auth"
const router = Router({ mergeParams: true })
const ctrl = new authController()

router.route("/login").post(Validate(requestSchema.login), ctrl.login)

export default router
