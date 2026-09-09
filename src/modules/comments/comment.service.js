import { CommentModel } from "../../database/model/comment.model.js"

export const createComment = async (comments) => {


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


}
