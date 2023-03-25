import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_TOKEN_SECRET || ""
const createJWT = (id: number): string => {
    const token = jwt.sign({
        id
    }, "JWT_TOKEN_SECRET")


    return token
}

export default createJWT