import { withFilter } from "graphql-yoga";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { CreateChatMutationArgs, GetChatQueryArgs, SendChatMessageMutationArgs } from "../../../types/graph"

const resolvers = {
    Query: {
        GetChat: privateResolver(
            async (_, args: GetChatQueryArgs, { req }) => {
                const user: User = req.user;
                try {
                    const chat = await Chat.findOne(
                        {
                            id: args.chatId
                        },
                        { relations: ["messages"] }
                    );
                    if (chat) {
                        if (chat.fromId === user.id || chat.toId === user.id) {
                            return {
                                ok: true,
                                error: null,
                                chat
                            };
                        } else {
                            return {
                                ok: false,
                                error: "Not authorized to see this chat",
                                chat: null
                            };
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Not found",
                            chat: null
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        chat: null
                    };
                }
            }
        )
    },
    Mutation: {
        CreateChat: privateResolver(async (_, args: CreateChatMutationArgs, { req }) => {
            const user: User = req.user;
            try {
                const chat = await Chat.create({
                    fromId: user.id,
                    toId: args.participant
                }).save();
                user.chat = chat;
                user.save()
                return {
                    ok: true,
                    error: null,
                    chat
                }
            } catch {
                return {
                    ok: false,
                    error: "Something goes wrong"
                };
            }
        }),
        SendChatMessage: privateResolver(
            async (
                _,
                args: SendChatMessageMutationArgs,
                { req, pubSub }
            ) => {
                const user: User = req.user;
                try {
                    const chat = await Chat.findOne({ id: args.chatId });
                    if (chat) {
                        if (chat.fromId === user.id || chat.toId === user.id) {
                            const message = await Message.create({
                                text: args.text,
                                chat,
                                user
                            }).save();
                            pubSub.publish("CHAT_MESSAGE", {
                                MessageSubscription: message
                            });
                            return {
                                ok: true,
                                error: null,
                                message
                            };
                        } else {
                            return {
                                ok: false,
                                error: "Unauthorized",
                                message: null
                            };
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Chat not found",
                            message: null
                        };
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        message: null
                    };
                }
            }
        )


    },
    Subscription: {
        MessageSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("CHAT_MESSAGE"),
                async (payload, _, { context }) => {
                    const user: User = context.currentUser;
                    const {
                        MessageSubscription: { chatId }
                    } = payload;
                    try {
                        const chat = await Chat.findOne({ id: chatId });
                        if (chat) {
                            return chat.fromId === user.id || chat.toId === user.id;
                        } else {
                            return false;
                        }
                    } catch (error) {
                        return false;
                    }
                }
            )
        }
    }

}

export default resolvers