import { gql } from "apollo-server-express";
import messageSchema from "./messages.js";
import userSchema from "./user.js";

// messageSchema 와 userSchema를 연결
// type Query 정의를 index에서 몰아하기위해 messages, user에서는 extend type Query {} 의 형태로 작성
const linkSchema = gql `
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`

export default [linkSchema, messageSchema, userSchema]