import mongoose, { Schema, Document, HookNextFunction } from "mongoose"
import { genSalt, hash, getSalt } from "bcryptjs"

export interface IUser extends Document {
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
}

const UserSchema: any = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    firstName: String,
    lastName: String,
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

UserSchema.pre("save", async function (next: HookNextFunction) {
  try {
    if (this.password) {
      const salt: string = await genSalt(10)
      this.password = await hash(this.password, salt)
    }
  } catch (error) {
    next(error)
    throw new Error(`Password hashing error ${error}`)
  }
})

export default mongoose.model<IUser>("User", UserSchema)
