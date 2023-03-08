import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageForm from '../../../components/forms/MessageForm';
import MessageCard from '../../../components/MessageCard';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleConversation } from '../../../utils/data/conversationData';
import { getMessagesByUsers } from '../../../utils/data/messageData';
// import getUser from '../../../utils/data/userData';

function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [otherUserId, setOtherUserId] = useState();

  const router = useRouter();
  const { conversationId } = router.query;
  const { user } = useAuth();

  // const getThisUser = () => {
  //   getUser(userId).then(setProfile);
  // };

  // const getUsersMessages = () => {
  //   getMessagesByUser(userId).then(setMessages);
  // };

  const getAndSetMessages = () => {
    getSingleConversation(conversationId).then((data) => {
      if (data.userOneId === user.id) {
        setOtherUserId(data.userTwoId);
      } else {
        setOtherUserId(data.userOneId);
      }
      getMessagesByUsers(data?.userOneId, data?.userTwoId).then(setMessages);
    });
  };

  useEffect(() => {
    getAndSetMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  return (
    <>
      { user ? (
        <div className="text-center my-4">
          <h2>Messages</h2>
          <div className="messageCards">
            {messages?.map((message) => (
              <MessageCard key={user.id} messageObj={message} />
            ))}
          </div>
          <div>
            <MessageForm otherUserId={otherUserId} refresh={getAndSetMessages} />
          </div>
        </div>
      ) : (
        <div>
          <h2>Sign in to see your messages</h2>
        </div>
      )}
    </>
  );
}

export default UserMessages;
