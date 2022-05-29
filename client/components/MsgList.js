import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import { useState } from "react";

const UserIds = ['roy', 'jay'];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

const originalMsgs = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: 50 - i,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + (50 - i) * 1000 * 60,
    text: `${50 - i} mock text`
  }));

// [
//   {
//     id: 1,
//     userId: getRandomUserId(),
//     timestamp: 1234567890123,
//     text: '1 mock text'
//   }
// ]

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsgs);
  const [editingId, setEditingId] = useState(null);

  const onCreate = text => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`
    }
    // msgs.unshift(newMsg); // unshift만 하면 변경된 사항을 감지하지 못한다. -> state 사용 필요
    setMsgs(msgs => ([newMsg, ...msgs]));
  }

  const onUpdate = (text, id) => {
    // setState는 함수형으로 쓰는 것을 권장
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msgs => msgs.id === id);
      if ( targetIndex < 0 ) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text,
      })
      return newMsgs;
    })
    doneEdit();
  }

  const doneEdit = () => setEditingId(null);

  const onDelete = (id) => {
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msgs => msgs.id === id);
      if ( targetIndex < 0 ) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1)
      return newMsgs;
    })
  }

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map(x => (
          <MsgItem 
            key={x.id} 
            {...x} 
            onUpdate={onUpdate} 
            startEdit={() => setEditingId(x.id)} 
            isEditing={editingId === x.id}
            onDelete={() => onDelete(x.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;