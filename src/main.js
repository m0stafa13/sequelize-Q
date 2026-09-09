import express from 'express'
import { connectionDB, sequelize } from './database/connection.js'
import { relations } from './database/relation.js'
import userRouter from './modules/posts/post.controller.js'
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
app.use("/auth",userRouter)




app.all('/*path', (req, res) => {
    res.status(404).json({
        message: "server is not found"
    })
})

app.listen(3000, () => {
    console.log("server is working on port 3000");
})