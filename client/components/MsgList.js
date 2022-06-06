import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from "react";
import fetcher from "../fetcher";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const MsgList = ({smsgs, users}) => {
  const { query } = useRouter();
  const userId = query.userId || query.userid || ''

  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);
  const [hasNext, setHasNext] = useState(true)
  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl); // 화면상에 fetchMoreEl이 노출됐을 때 true, 아닐 때 false

  const onCreate = async text => {
    // userId는 queryString으로 받아온다.
    const newMsg = await fetcher('post', '/messages', { text, userId })
    if(!newMsg) throw Error('something wrong');
    // msgs.unshift(newMsg); // unshift만 하면 변경된 사항을 감지하지 못한다. -> state 사용 필요
    setMsgs(msgs => ([newMsg, ...msgs]));
  }

  const onUpdate = async (text, id) => {
    const newMsg = await fetcher('put', `/messages/${id}`, {text, userId});
    if(!newMsg) throw Error('something wrong');
    // setState는 함수형으로 쓰는 것을 권장
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msgs => msgs.id === id);
      if ( targetIndex < 0 ) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, newMsg)
      return newMsgs;
    })
    doneEdit();
  }
  
  const onDelete = async (id) => {
    // params로 넣어준 값은 서버에서의 응답 요청은 query로 들어가 있다.
    const receivedId = await fetcher('delete', `/messages/${id}`, { params: {userId} });
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msgs => msgs.id === receivedId + '');
      if ( targetIndex < 0 ) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1)
      return newMsgs;
    })
  }
  
  const doneEdit = () => setEditingId(null);

  // useEffect 내부에서는 async await을 사용하지 않는 것을 권장
  const getMessages = async () => {
    const newMsgs = await fetcher('get', '/messages', { params: {cursor: msgs[msgs.length - 1]?.id || ''}});
    if(newMsgs.length === 0) {
      setHasNext(false)
      return;
    }
    setMsgs(msgs => [...msgs, ...newMsgs]);
  }
  
  useEffect(() => {
    if (intersecting && hasNext) getMessages()
  }, [intersecting])

  return (
    <>
      {userId && <MsgInput mutate={onCreate} />}
      <ul className="messages">
        {msgs.map(x => (
          <MsgItem 
            key={x.id} 
            {...x} 
            onUpdate={onUpdate} 
            onDelete={() => onDelete(x.id)}
            startEdit={() => setEditingId(x.id)} 
            isEditing={editingId === x.id}
            myId={userId}
            user={users[x.userId]}
          />
        ))}
      </ul>
      <div ref={fetchMoreEl} />
    </>
  );
};

export default MsgList;