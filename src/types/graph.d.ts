export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]!\n  fromId: Int!\n  toId: Int!\n  createAt: String!\n  updateAt: String\n}\n\ntype CreateChatResponse {\n  ok: Boolean!\n  error: String\n  chat: Chat\n}\n\ntype GetChatResponse {\n  ok: Boolean!\n  error: String\n  chat: Chat\n}\n\ntype SendChatMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Query {\n  GetChat(chatId: Int!): GetChatResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype Mutation {\n  CreateChat(participant: Int!): CreateChatResponse!\n  SendChatMessage(text: String!, chatId: Int!): SendChatMessageResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, profilePhoto: String!, age: Int!, phoneNumber: String!): EmailSignUpResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  UpdateProfile(firstName: String, lastName: String, email: String, password: String, age: Int, profilePhoto: String): UpdateProfileResponse!\n}\n\ntype Subscription {\n  MessageSubscription: Message\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createAt: String!\n  updateAt: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  createAt: String!\n  updateAt: String!\n  fullName: String\n  messages: [Message]\n  chat: Chat\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createAt: String!\n  updateAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChat: GetChatResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetChatQueryArgs {
  chatId: number;
}

export interface GetChatResponse {
  ok: boolean;
  error: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: number;
  messages: Array<Message>;
  fromId: number;
  toId: number;
  createAt: string;
  updateAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  user: User;
  createAt: string;
  updateAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  createAt: string;
  updateAt: string;
  fullName: string | null;
  messages: Array<Message> | null;
  chat: Chat | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CreateChat: CreateChatResponse;
  SendChatMessage: SendChatMessageResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  UpdateProfile: UpdateProfileResponse;
}

export interface CreateChatMutationArgs {
  participant: number;
}

export interface SendChatMessageMutationArgs {
  text: string;
  chatId: number;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateProfileMutationArgs {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  age: number | null;
  profilePhoto: string | null;
}

export interface CreateChatResponse {
  ok: boolean;
  error: string | null;
  chat: Chat | null;
}

export interface SendChatMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  MessageSubscription: Message | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createAt: string;
  updateAt: string | null;
}
