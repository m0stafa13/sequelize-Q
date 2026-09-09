import { Sequelize } from "sequelize"
export const sequelize = new Sequelize("nowSequelize", "root", "", {
    host: "localhost",
    dialect: "mysql"
})
export const connectionDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("data base connected successfully........");
    } catch (error) {
        console.log(error);
    }
}