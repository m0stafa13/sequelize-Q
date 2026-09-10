
import { Op } from "sequelize"
import { CommentModel } from "../../database/model/comment.model.js"
import { PostModel } from "../../database/model/post.model.js"
import { userModel } from "../../database/model/user.model.js"
// crate comment 
export const createComment = async (comments) => {
    try {
        const create = await CommentModel.bulkCreate(comments)
        if (create) {
            return {
                response: {
                    message: "comment created successfully"
                },
                statusCode: 200
            }
        } else {
            return {
                response: {
                    message: "something went wrong"
                },
                statusCode: 400
            }
        }
    } catch (error) {
        return {
            response: {
                error
            },
            statusCode: 400
        }
    }

}
// update comment
export const updateCommentId = async (id, body) => {
    let { userId, content } = body
    if (!userId) {
        return {
            response: {
                message: "user id is req"
            },
            statusCode: 404
        }
    }
    const [comment] = await CommentModel.update({ content }, {
        where: {
            id, userId
        }
    })
    if (comment) {
        return {
            response: {
                message: "comment data updated successfully",
            },
            statusCode: 200
        }
    } else {
        return {
            response: {
                message: "something went wrong",
            },
            statusCode: 404
        }
    }

}
// return or create comment
export const updateCreateComment = async (body) => {
    let { userId, content, postId } = body
    if (!userId || !postId) {
        return {
            response: {
                message: "user id is req"
            },
            statusCode: 404
        }
    }
    const checkPost = await PostModel.findByPk(postId)
    if (!checkPost) {
        return {
            response: {
                message: "post id is not found"
            },
            statusCode: 404
        }
    }
    const checkUser = await userModel.findByPk(userId)
    if (!checkUser) {
        return {
            response: {
                message: "user id is not found"
            },
            statusCode: 404
        }
    }
    const [comment, created] = await CommentModel.findOrCreate({
        where: { userId, postId },
        defaults: {
            userId, postId, content
        },
    })


    if (!created) {
        return {
            response: {
                message: "comment found successfully",
                comment
            },
            statusCode: 200
        }
    } else {
        return {
            response: {
                message: "comment created successfully",
            },
            statusCode: 201
        }
    }

}
//search on comment word 
export const findCommentCount = async ({ search }) => {
    const { count, rows } = await CommentModel.findAndCountAll({
        where: {
            content: { [Op.like]: `%${search}%` }
        }
    })
    if (rows.length > 0) {
        return {
            response: {
                message: "comment found successfully",
                numberOfComment: count,
                comments: rows
            }, statusCode: 200
        }
    } else {
        return {
            response: {
                message: "no comment found "
            },
            statusCode: 404
        }
    }

}
// get post and last 3 comment 
export const getLastThreeComment = async (data) => {
    let id = data.postId
    let post = await PostModel.findByPk(id, {
        include: {
            model: CommentModel,
            limit: 3,
            order: [["createdAt", "DESC"]]
        }
    })
    if (post) {
        return {
            response: {
                message: "post found successfully",
                post: post
            }, statusCode: 200
        }
    } else {
        return {
            response: {
                message: "post not found",
            }, statusCode: 404
        }
    }
}
// get comment and user and post info by comment pk
export const commentInfo = async ({ id }) => {
    let comment = await CommentModel.findByPk(id, {
        attributes: ["id", "content"],
        include: [
            { model: PostModel, attributes: ["id", "title", "content"] }
            , { model: userModel, attributes: ["id", "name", "email"] }]
    })
    if (comment) {
        return {
            response: {
                message: "comment found successfully..",
                comment
            },
            statusCode: 200
        }
    } else {
        return {
            response: {
                message: "comment no founded"
            },
            statusCode: 404
        }
    }
}