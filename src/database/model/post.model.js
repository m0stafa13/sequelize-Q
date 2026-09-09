import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";


export class PostModel extends Model { }

PostModel.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 7]
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [3, 3000]
        }
    }

}, {
    sequelize
})
