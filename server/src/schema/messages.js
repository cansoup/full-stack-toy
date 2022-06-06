import { gql } from 'apollo-server-express'

// `` 안의 문자열을 gql로 인식할 수 있도록 함.
// ID 고유의 값
// (!) 반드시 들어가야한다
const messageSchema = gql `
  type Message {
    id: ID!
    text: String!
    user: User!
    timestamp: Float #13자리 숫자(정수형에 자릿수 제한이 있으므로 Float 사용)
  }

  extend type Query {
    messages: [Message!]! #getMessages
    message(id: ID!): Message!        #getMessage
  }

  extend type Mutation {
    createMessage(text: String!, userId: ID!): Message!
    updateMessage(id: ID!, text: String!, userId: ID!): Message!
    deleteMessage(id: ID!, userId: ID!): ID!
  }
`

export default messageSchema;