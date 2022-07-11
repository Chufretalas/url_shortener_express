import { Request, Response } from "express";
import shortid from "shortid";
import { config } from "../config/constants";
import { UrlModel } from "../database/model/Url";

export class UrlController {
    public async shorten(req: Request, res: Response): Promise<void> {
        const { originalUrl } = req.body
        const url = await UrlModel.findOne({ originalUrl })
        if (url) {
            res.json(url)
            return
        }
        const hash = shortid.generate()
        const shortUrl = `${config.API_URL}/${hash}`
        try {
            const newUrl = await UrlModel.create({ originalUrl, hash, shortUrl })
            res.status(200).json(newUrl)
        } catch (error) {
            console.log(error)
            res.status(500).send({ originalUrl, hash, shortUrl })
        }

    }

    public async redirect(req: Request, res: Response): Promise<void> {
        const { hash } = req.params
        const url = await UrlModel.findOne({ hash })
        if (url) {
            res.redirect(url.originalUrl)
            return
        }
        res.status(400).send("Url not found")
    }
}