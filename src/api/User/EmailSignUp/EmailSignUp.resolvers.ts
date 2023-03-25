import { Resolvers } from '../../../types/resolvers';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';


const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            try {
                const existingUser = await User.findOne({ email: args.email });
                if (existingUser) {
                    return {
                        ok: false,
                        error: "Something goes wrong!",
                        token: null
                    }
                } else {
                    const newUser = await User.create({ ...args }).save();
                    const token = createJWT(newUser.id)
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
}

export default resolvers