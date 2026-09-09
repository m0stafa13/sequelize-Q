import { Router } from "express";
import { createPost, deletePost, getAllPostsDetails, getPostsNumOfComment } from "./posts.service.js";
const router = Router()
// create post 
router.post("/create-post", async (req, res) => {
    const { statusCode, response } = await createPost(req.body)
    res.status(statusCode).json(response)
})
// delete post
router.delete("/delete-post/:id", async (req, res) => {
    const { statusCode, response } = await deletePost(req.params, req.body)
    res.status(statusCode).json(response)
})
// get all posts details 
router.get("/posts", async (req, res) => {
    let { response, statusCode } = await getAllPostsDetails()
    res.status(statusCode).json(response)
})

// get all posts details 
router.get("/post-comment-count", async (req, res) => {
    let { response, statusCode } = await getPostsNumOfComment()
    res.status(statusCode).json(response)
})







export default router