import express from 'express'
import { connectionDB, sequelize } from './database/connection.js'
import { relations } from './database/relation.js'
import userRouter from './modules/users/user.controller.js'
import postRouter from './modules/post/posts.controller.js'
import commentRouter from './modules/comments/comment.controller.js'
const app = express()
app.use(express.json())

connectionDB()
try {
    relations()
    sequelize.sync({
        alter: false,
        force: false
    })
    console.log("sequelize synced successfully");
} catch (error) {
    console.log(error, "from main js");
}
// user router 
app.use("/auth", userRouter)
//post router
app.use("/posts", postRouter)
// comment router
app.use("/comments", commentRouter)


app.all('/*path', (req, res) => {
    res.status(404).json({
        message: "server is not found"
    })
})

app.listen(3000, () => {
    console.log("server is working on port 3000");
})
//postman link
//https://documenter.getpostman.com/view/47481292/2sBYAxRpv5