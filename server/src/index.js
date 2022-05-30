// express 앱을 띄우기 위한 모든 기능들을 정의한다.
import express from 'express';
import cors from 'cors';
import messageRoute from './routes/messages.js';
import usersRoute from './routes/users.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // json 형태로 선언하겠다.

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// get METHOD로 '/'경로에 들어왔을 때 두 번째 파라미터의 핸들러를 실행하겠다.
// app[Method](route, handler)
// app.get('/', (req, res) => {
//   res.send('ok');
// });

const routes = [ ...messageRoute, ...usersRoute ];
routes.forEach(({ method, route, handler }) => {
  app[method](route, handler)
})

// 서버 경로, 서버가 띄워지면 프로그램이 할 동작
app.listen(8000, () => {
  console.log('server listening on 8000...')
});