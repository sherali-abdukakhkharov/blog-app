import { sign } from "jsonwebtoken"
import Token from "../models/Token"

const createToken = async (payload: any, expiresIn: number) => {
  const key: string = process.env.JWT_SECRET || "12345678sh"
  return sign(payload, key, {
    expiresIn,
    algorithm: "HS512",
  })
}

export async function jwtSignIn(user: any) {
  const expiredAccessToken = process.env.JWT_ACCESS_TOKEN_T || 3600
  const expiredRefreshToken = process.env.JWT_REFRESH_TOKEN_T || 36000
  try {
    const accessToken = await createToken(user, +expiredAccessToken)
    const refreshToken = await createToken(user, +expiredRefreshToken)
    const newToken = {
      accessToken,
      refreshToken,
      userId: user.id,
      expiredAt: Date.now() + +expiredAccessToken,
    }
    const token = await Token.create(newToken)

    return { accessToken, refreshToken }
  } catch (error) {
    throw new Error(`JWT jwtSignIn error: ${error}`)
  }
}
