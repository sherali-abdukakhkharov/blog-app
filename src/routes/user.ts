import { Router } from "express"
import userController from "../controllers/userController"
import Validate from "../middleware/validation"
import requestSchema from "../requestSchema/user"

const router = Router({ mergeParams: true })
const ctrl = new userController()

router.route("/register").post(Validate(requestSchema.register), ctrl.register)

export default router
