import { v4 } from 'uuid';
import { readDB, writeDB } from '../dbController.js'

const getMsgs = () => readDB('messages');
const setMsgs = data => {
  writeDB('messages', data)
};

const messageRoute = [
  { // GET MESSAGES
    method: 'get',
    route: '/messages',
    handler: ({query: {cursor = ''}}, res) => {
      const msgs = getMsgs();
      const fromIndex = msgs.findIndex(msg => msg.id === cursor) + 1;
      res.send(msgs.slice(fromIndex, fromIndex + 15));
    }
  },
  { // SINGLE GET MESSAGES
    method: 'get',
    route: '/messages/:id',
    handler: ({ params: {id} }, res) => {
      try {
        const msgs = getMsgs();
        const msg = msgs.find(m => m.id === id)
        if(!msg) throw Error('not found');
        res.send(msg)
      } catch (err) {
        res.status(404).send({error: err})
      }
    }
    
  },
  { // CREATE MESSAGE
    method: 'post',
    route: '/messages',
    // handler: ({ body: 새 글이 등록된 텍스트&userId, params:, query: })
    handler: ({ body }, res) => {
      try {
        if(!body.userId) throw Error('no userId');
        const msgs = getMsgs();
        const newMsg = {
          id: v4(),
          userId: body.userId,
          timestamp: Date.now(),
          text: body.text,
        };
        msgs.unshift(newMsg);
        setMsgs(msgs);
        res.send(newMsg);
      } catch (err) {
        res.status(500).send({ error: err })
      }
    }
  },
  {
    // PUT MESSAGE
    method: 'put',
    route: '/messages/:id',
    handler: ({ body, params: { id }}, res) => {
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex(msg => msg.id === id)
        if (targetIndex < 0) throw '메시지가 없습니다';
        if (msgs[targetIndex].userId !== body.userId) throw '사용자가 다릅니다';

        const newMsg = { ...msgs[targetIndex], text: body.text }
        msgs.splice(targetIndex, 1, newMsg);
        setMsgs(msgs)
        res.send(newMsg)
      } catch (err) {
        res.status(500).send({error: err})
      }
    }
  },
  { // UPDATE MESSAGE
    method: 'get',
    route: '/messages/:id',
    handler: ({ body, parmas: { id } }, res) => {
      // 실제 id를 지정한 요청이다 보니 client에서는 id가 있는데 실제 서버에는 없는 경우 혹은 vice versa의 경우
      // 즉, 서버와 클라이언트 간 싱크가 맞지 않아 오류가 발생하는 것을 막기 위하여 에러 핸들링
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex(msg => msg.id === id);
        if (targetIndex < 0) throw '메시지가 없습니다.';
        if (msgs[targetIndex].userId !== body.userId) throw '사용자가 다릅니다.';

        const newMsg = { ...msgs[targetIndex], text: body.text }
        msgs.splice(targetIndex, 1, newMsg);
        setMsgs(msgs);
        res.send(newMsg);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    }
  },
  { // DELETE MESSAGE
    method: 'delete',
    route: '/messages/:id',
    handler: ({ params: { id }, query: { userId } }, res) => {
      // 실제 id를 지정한 요청이다 보니 client에서는 id가 있는데 실제 서버에는 없는 경우 혹은 vice versa의 경우
      // 즉, 서버와 클라이언트 간 싱크가 맞지 않아 오류가 발생하는 것을 막기 위하여 에러 핸들링
      try {
        const msgs = getMsgs();
        const targetIndex = msgs.findIndex(msg => msg.id === id);
        if (targetIndex < 0) throw '메시지가 없습니다.';
        if (msgs[targetIndex].userId !== userId) throw '사용자가 다릅니다.';

        msgs.splice(targetIndex, 1);
        setMsgs(msgs);
        res.send(id);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    }
  },
];

export default messageRoute;