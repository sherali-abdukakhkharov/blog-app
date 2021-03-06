import { Router } from "express"
import CategoryController from "../controllers/CategoryController"
import Validate from "../middleware/validation"
import requestSchema from "../requestSchema/category"
import auth from "../middleware/auth"

const router = Router({ mergeParams: true })
const ctrl = new CategoryController()

router
  .route("/")
  .post(Validate(requestSchema.create), auth, ctrl.create)
  .get(auth, ctrl.list)

router
  .route("/:id")
  .get(Validate(requestSchema.load), auth, ctrl.load)
  .put(Validate(requestSchema.update), auth, ctrl.update)
  .delete(Validate(requestSchema.remove), auth, ctrl.remove)
export default router
