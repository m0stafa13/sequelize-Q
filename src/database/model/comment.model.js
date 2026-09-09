import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
export class CommentModel extends Model { }
CommentModel.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize
})

