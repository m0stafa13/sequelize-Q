import { Router } from "express";
import { createComment } from "./comment.service.js";

const router = Router()

router.post("/create", async (req, res) => {
    const {statusCode , response} = await createComment(req.body)
    res.status(statusCode).json(response)
})




export default router