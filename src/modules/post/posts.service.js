import { sequelize } from "../../database/connection.js"
import { CommentModel } from "../../database/model/comment.model.js"
import { PostModel } from "../../database/model/post.model.js"
import { userModel } from "../../database/model/user.model.js"
// create post 
export const createPost = async (postData) => {
    let { title, content, userId } = postData
    try {
        let checkAuthor = await userModel.findByPk(userId)
        if (!checkAuthor) {
            return {
                response: {
                    message: "wrong user id "
                },
                statusCode: 404
            }
        }
        let post = await PostModel.create({ title, content, userId })
        if (post) {
            return {
                response: {
                    message: "post created successfully"
                },
                statusCode: 200
            }
        }
    } catch (error) {
        return {
            response: {
                error: error.errors[0].message
            },
            statusCode: 400
        }
    }

}
// delete user 
export const deletePost = async ({ id }, { authId }) => {
    let post = await PostModel.findByPk(id)
    if (!post) {
        return {
            response: {
                message: "post not found"
            },
            statusCode: 404
        }
    } else {
        let dPost = await PostModel.destroy({
            where: {
                id, userId: authId
            }
        })
        if (dPost) {
            return {
                response: {
                    message: "post deleted successfully"
                },
                statusCode: 200
            }
        } else {
            return {
                response: {
                    message: "you are not authorize to delete this post"
                },
                statusCode: 404
            }
        }
    }
}
// get post details
export const getAllPostsDetails = async () => {
    let post = await PostModel.findAll({
        attributes: {
            exclude: ["createdAt", "userId", "updatedAt"],
        }, include: [{
            model: userModel,
            attributes: {
                exclude: ["email", "password", "role", "createdAt", "updatedAt", "deletedAt"]
            }
        }, {
            model: CommentModel,
            attributes: {
                exclude: ["cratedAt", "updatedAt", "userId", "postId"]
            }
        }]
    })
    if (post.length > 0) {
        return {
            response: {
                post
            },
            statusCode: 200
        }
    } else {
        return {
            response: {
                message: "no posts found"
            },
            statusCode: 404
        }
    }
}
export const getPostsNumOfComment = async () => {
    let post = await PostModel.findAll({
        attributes: [
            "id", "title", [
                sequelize.fn("count ", sequelize.col("CommentModels.id")), "countCOmment"
            ],
        ],
        include: {
            model: CommentModel
        },
        group: ["PostModel.id"]
    });
    if (post.length > 0) {
        return {
            response: {
                post
            },
            statusCode: 200
        }
    } else {
        return {
            response: {
                message: "no posts found"
            },
            statusCode: 404
        }
    }
}



