import { userModel } from "../../database/model/user.model.js";
// function to check email on database
async function checkEmail(email) {
    let findEmail = await userModel.findOne({
        where: { email }, attributes: {
            exclude: "deletedAt"
        }
    },)
    return findEmail
}
// creating new user 
export const signUp = async (userData) => {
    let { name, email, password, role } = userData;
    // console.log(name, email, password, role);
    let findEmail = await checkEmail(email)
    if (findEmail) {
        return {
            message: {
                message: "user already exists"
            }, statusCode: 409
        }
    } else {
        try {
            let user = await userModel.build({ email, password, name, role })
            await user.save()
            return {
                message: {
                    message: "user added successfully...."
                }, statusCode: 201
            }
        } catch (error) {
            return {
                error: {
                    message: error.errors[0].message
                }
                , statusCode: 400
            }
        }
    }
}
// update user data
export const updateUser = async ({ id }, userData) => {
    let { name, password, email, role } = userData
    try {
        let [user] = await userModel.update({ email, password, role, name }, {
            where: {
                id
            }
        })
        if (user) {
            return {
                response: {
                    message: "user data updated successfully "
                },
                statusCode: 200
            }
        } else {
            return {
                response: {
                    message: "user not found"
                },
                statusCode: 404
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
// find user by email 
export const findUserByEmail = async ({ email }) => {
    let user = await checkEmail(email)
    if (user) {
        return {
            response: {
                user
            },
            statusCode: 200
        }
    } else {
        return {
            response: {
                message: "no user found"
            },
            statusCode: 404
        }
    }
}
// get user by Pk 
export const getUserByPk = async ({ id }) => {
    let user = await userModel.findByPk(id, {
        attributes: {
            exclude: ["role", "deletedAt"]
        }
    })
    if (user) {
        return {
            response: {
                user
            },
            statusCode: 200
        }
    } else {
        return {
            response: {
                message: "no user found"
            },
            statusCode: 404
        }
    }
}