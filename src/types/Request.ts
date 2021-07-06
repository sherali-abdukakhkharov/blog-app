import { Request } from "express"
import { IUser } from "../models/user"

interface Session {
  user: IUser
}

export interface IRequest extends Request {
  session: Session
}
