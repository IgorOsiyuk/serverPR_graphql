
import jwt from 'jsonwebtoken';
import User from '../entities/User';

const SECRET = process.env.JWT_TOKEN_SECRET || ""
const decodeJWT = async (token: string): Promise<User | undefined> => {
    try {
        const userId: any = jwt.verify(token, "JWT_TOKEN_SECRET")
        const user = await User.findOne({ id: userId.id })
        return user
    } catch (error) {
        return
    }


}

export default decodeJWT