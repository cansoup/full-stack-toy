import { gql } from "graphql-tag";
// gql 명령어를 자바스크립트로 컨버팅해준다.

// server/schema의 모양대로 구현하면 된다.
export const GET_MESSAGES = gql `
  query GET_MESSAGES {
    messages {
      id
      text
      userId
      timestamp
    }
  }
`

export const GET_MESSAGE = gql `
  query GET_MESSAGE($id: ID!) {
    message(id: $id) {
      id
      text
      userId
      timestamp
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation CREATE_MESSAGE($text: String!, $userId: ID!) {
    createMessage(text: $text, userId: $userId) {
      id
      text
      userId
      timestamp
    }
  }
`

export const UPDATE_MESSAGE = gql`
  mutation UPDATE_MESSAGE($id: ID!, $text: String!, $userId: ID!) {
    updateMessage(id: $id, text: $text, userId: $userId) {
      id
      text
      userId
      timestamp
    }
  }
`

export const DELETE_MESSAGE = gql `
  mutation DELETE_MESSAGE($id: ID!, $userId: ID!) {
    deleteMessage(id: $id, userId: $userId)
  }
`