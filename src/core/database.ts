import mongoose from "mongoose"

export default class Database {
  url: string = process.env.MONGO_URL || "mongodb://localhost:27017/blog"

  connect() {
    return mongoose.connect(
      this.url,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 6000,
      },
      (err) => {
        if (err) {
          console.error(`Databse connection error: ${err}`)
        }
      }
    )
  }
}
