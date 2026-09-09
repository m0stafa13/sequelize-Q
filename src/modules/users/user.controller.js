import { Router } from "express";
import { findUserByEmail, getUserByPk, signUp, updateUser } from "./user.service.js";

const router = Router()
// sign up 
router.post("/sign-up", async (req, res) => {
    let { message, statusCode, error } = await signUp(req.body)
    res.status(Number(statusCode)).json(message || error)
})
// update user data
router.put("/update-user/:id", async (req, res) => {
    let { statusCode, response } = await updateUser(req.params, req.body)
    res.status(statusCode).json(response)
}
)
router.get("/user-email", async (req, res) => {
    let { statusCode, response } = await findUserByEmail(req.body)
    res.status(statusCode).json(response)
}
)
// get user by id 
router.get("/get-user/:id", async (req, res) => {
    let { statusCode, response } = await getUserByPk(req.params)
 

    res.status(statusCode).json(response)
})

export default router