// express 앱을 띄우기 위한 모든 기능들을 정의한다.
import express from 'express';
import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers/index.js';
import schema from './schema/index.js';
import { readDB } from './dbController.js';

// get METHOD로 '/'경로에 들어왔을 때 두 번째 파라미터의 핸들러를 실행하겠다.
// app[Method](route, handler)
// app.get('/', (req, res) => {
//   res.send('ok');
// });

// RESTAPI 서버는 라우트를 이용하여 사용자가 요청한 라우트에 따라서 그에 대응하는 Response를 내려주는 형태
// const routes = [ ...messageRoute, ...usersRoute ];
// routes.forEach(({ method, route, handler }) => {
//   app[method](route, handler)
// })

// GraphQl 서버는 path 하나로 들어와서 graphql 내부에서 자체적으로 판단
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // resolver들이 참조할 데이터, 즉 DB 역할을 하는 models에 대한 정의
  db: {
    models: {
      messages: readDB('messages'),
      users: readDB('users'),
    }
  }
})

const app = express();
await server.start();
server.applyMiddleware({ 
  app, 
  path: '/graphql',
  cors: {
    origin: [
      'http://localhost:3000',
      'https://studio.apollographql.com'
    ],
    credentials: true
  }
})

// 서버 경로, 서버가 띄워지면 프로그램이 할 동작
await app.listen({ port: 8000 });
console.log('server listening on 8000...');