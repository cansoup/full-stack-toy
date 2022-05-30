import { readDB } from '../dbController.js';

const getUsers = () => readDB('users');

const usersRoute = [
  { // GET MESSAGES
    method: 'get',
    route: '/users',
    handler: (req, res) => {
      const users = getUsers();
      res.send(users);
    }
  },
  { // GET MESSAGES
    method: 'get',
    route: '/users/:id',
    handler: ({ params: { id } }, res) => {
      try {
        const users = getUsers();
        const user = users[id];
        if(!user) throw Error('사용자가 없습니다.');
        res.send(user)
      } catch(err) {
        res.status(500).send({errors: err})
      }
    }
  },
]

export default usersRoute;