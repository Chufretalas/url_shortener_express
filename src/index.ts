import express from "express"
import { UrlController } from "./controller/UrlController"
import { UrlModel } from "./database/model/Url"
import { MongoConnection } from "./database/MongoConnection"

const app = express()

const database = new MongoConnection()
database.connect()

const urlController = new UrlController()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => console.log("Application running on port 3000"))


app.post("/shorten", (req, res, next) => {
    urlController.shorten(req, res)
})

app.get("/:hash", urlController.redirect)

app.get("/", async (req, res, next) => {
    const data = await UrlModel.find()
    res.send(data)
})