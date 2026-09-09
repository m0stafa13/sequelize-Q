import { CommentModel } from "./model/comment.model.js";
import { PostModel } from "./model/post.model.js";
import { userModel } from "./model/user.model.js";
export const relations = () => {
    // user with post 
    userModel.hasMany(PostModel, {
        foreignKey: {
            name: "userId",
            allowNull: false
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"

    })
    //post with user 
    PostModel.belongsTo(userModel, {
        foreignKey: {
            name: "userId",
            allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
    })
    //comment with user 
    CommentModel.belongsTo(userModel, {
        foreignKey: {
            name: "userId",
            allowNull: false
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    // user with comment 
    userModel.hasMany(CommentModel, {
        foreignKey: {
            name: "userId",
            allowNull: false
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    //post with comment 
    PostModel.hasMany(CommentModel, {
        foreignKey: {
            name: "postId",
            allowNull: false
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    //comment with post 
    CommentModel.belongsTo(PostModel, {
        foreignKey: {
            name: "postId",
            allowNull: false
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
}