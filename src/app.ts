import "dotenv/config"
import express from "express"
import cors from "cors"
import connect from "./database/connect"
import wordsRoutes from "./routes/words.routes"

const app = express()
const port = process.env.PORT

app.use(express.json({ type: "application/json" }));
app.use(cors())

app.listen(port, async () => {
  console.log(`App is running on Port ${port}`)

  await connect()

  wordsRoutes(app)
})