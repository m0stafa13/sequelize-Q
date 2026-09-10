import { Router } from "express";
import { commentInfo, createComment, findCommentCount, getLastThreeComment, updateCommentId, updateCreateComment } from "./comment.service.js";

const router = Router()
// create comments
router.post("/create", async (req, res) => {
    const { statusCode, response } = await createComment(req.body)
    res.status(statusCode).json(response)
})
// update comment 
router.put("/update-comment/:id", async (req, res) => {
    let { id } = req.params
    let { statusCode, response } = await updateCommentId(id, req.body)
    res.status(statusCode).json(response)
})
// update or create comment if not found
router.put("/update-create-comment", async (req, res) => {

    let { statusCode, response } = await updateCreateComment(req.body)
    res.status(statusCode).json(response)
})
//  return number of comment and comment matched with search
router.get('/find-comment-word', async (req, res) => {
    let search = req.query
    let { response, statusCode } = await findCommentCount(search)
    res.status(statusCode).json(response)
})
// get  last 3 comment in the post 
router.get("/last-comment/:postId", async (req, res) => {
    let { statusCode, response } = await getLastThreeComment(req.params)
    res.status(statusCode).json(response)
})
// get comment info 
router.get("/get-comment-info/:id", async (req, res) => {
    let { statusCode, response } = await commentInfo(req.params)
    res.status(statusCode).json(response)
})
export default router