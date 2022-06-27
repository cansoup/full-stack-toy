import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from "react";
import { fetcher, QueryKeys } from "../queryClient";
import { CREATE_MESSAGE, DELETE_MESSAGE, GET_MESSAGES, UPDATE_MESSAGE } from "../graphql/message";
// import useInfiniteScroll from "../hooks/useInfiniteScroll";

const MsgList = ({smsgs, users}) => {
  const client = useQueryClient(); // useQueryClient를 통해 client에 접속할 수 있다.
  const { query: { userId = ''} } = useRouter();
  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);

  // const [hasNext, setHasNext] = useState(true)
  // const fetchMoreEl = useRef(null);
  // const intersecting = useInfiniteScroll(fetchMoreEl); // 화면상에 fetchMoreEl이 노출됐을 때 true, 아닐 때 false

  const { mutate: onCreate } = useMutation(({ text }) => fetcher(CREATE_MESSAGE, { text, userId }), {
    onSuccess: ({ createMessage }) => {
      // 명령이 성공했을 때 이것(createMessage - gql에서 정의한 값)을 가지고 graphQl이 클라이언트에 들고 있는 캐시 정보에 새로 가져온 정보를 업데이트 해주는 방식
      client.setQueryData(QueryKeys.MESSAGES, old => {
        return {
          messages: [ createMessage, ...old.messages]
        }
      })
    }
  }); 

  const { mutate: onUpdate } = useMutation(({ text, id }) => fetcher(UPDATE_MESSAGE, { id, text, userId }), {
    onSuccess: ({ updateMessage }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        const targetIndex = old.messages.findIndex(msgs => msgs.id === updateMessage.id);
        if ( targetIndex < 0 ) return old;
        const newMsgs = [...old.messages];
        newMsgs.splice(targetIndex, 1, updateMessage)
        return { messages: newMsgs};
      })
      doneEdit();
    }
  });

  const { mutate: onDelete } = useMutation( id => fetcher(DELETE_MESSAGE, { id, userId }), {
    onSuccess: ({ deleteMessage: deletedId }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        const targetIndex = old.messages.findIndex(msgs => msgs.id === deletedId);
        if ( targetIndex < 0 ) return old;
        const newMsgs = [...old.messages];
        newMsgs.splice(targetIndex, 1)
        return { messages: newMsgs};
      })
    }
  })
  
  const doneEdit = () => setEditingId(null);

  const { data, error, isError } = useQuery(QueryKeys.MESSAGES, () => fetcher(GET_MESSAGES));

  // 변경된 데이터를 반영하는 구문
  useEffect(() => {
    if(!data?.messages) return;
    console.log('msgs changed');
    setMsgs(data?.messages || []);
  }, [data?.messages])

  if(isError) {
    console.error(error);
    return null;
  };
  
  // useEffect(() => {
  //   if (intersecting && hasNext) getMessages()
  // }, [intersecting])

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
            user={users.find(x => userId === x.userId)}
          />
        ))}
      </ul>
      {/* <div ref={fetchMoreEl} /> */}
    </>
  );
};

export default MsgList;