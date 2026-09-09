import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";


export class PostModel extends Model { }

PostModel.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

}, {
    sequelize
})
 