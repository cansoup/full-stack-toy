import { gql } from 'apollo-server-express'

const userSchema = gql `
  type User {
    id: ID!
    nickname: String!
  }

  extend type Query {
    users: [User!]! # 객체 형태 그대로 전달하는 방법이 없어 배열로 전달
    user(id: ID!): User
  }
`

export default userSchema;