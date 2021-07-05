import { Request, Response, NextFunction } from "express"
import User from "../models/user"
import { jwtSignIn } from "../jwt"
export default class {
  async login(req: Request, res: Response) {
    try {
      const data = req.body

      const $or = []
      if (data.email) {
        $or.push({ email: data.email })
      }
      if (data.username) {
        $or.push({ username: data.username })
      }

      const { password, ...user } = await User.findOne({ $or }).lean()
      const tokens = await jwtSignIn(user)
      console.log(tokens)

      res.status(201).send({
        msg: "OK",
        data: {
          user,
          tokens,
        },
      })
    } catch (error) {
      res.status(500).send({ msg: "SERVER_ERROR" })
      throw new Error(`User controller register error: ${error}`)
    }
  }
}
