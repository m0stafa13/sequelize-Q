import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import e from "express";

export const userModel = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkNameLength(value) {
                if (value.length <= 2) {
                    throw new Error("name must be greater than 2 char")
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkPasswordLength(value) {
                if (!value || value.length < 6) {
                    throw new Error("password must be greater than 6 char ")
                }
            }
        }
    }
    , role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        defaultValue: "user"
    }
}, {
    paranoid: true
})
