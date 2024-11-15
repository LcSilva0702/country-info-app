import express from "express"
import route from "./route"
import cors from "cors"
const app = express()


app.use(cors({origin: "*"}))
app.use(express.json())
app.use(route)

app.listen(3000, () => {
    console.log(`Server is running ${3000}`)
})
