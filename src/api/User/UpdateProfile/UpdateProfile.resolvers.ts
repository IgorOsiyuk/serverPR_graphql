import User from "../../../entities/User";
import { UpdateProfileMutationArgs } from "src/types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateProfile: privateResolver(
      async (_, args: UpdateProfileMutationArgs, { req }) => {
        const user: User = req.user;
        const notNull = {};
        Object.keys(args)
          .filter((key) => key !== null)
          .forEach((key) => (notNull[key] = args[key]));

        try {
          if (args.password !== null) {
            user.password = args.password;
            user.save();
          }
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
