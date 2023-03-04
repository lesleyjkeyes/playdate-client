import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageCard from '../../../components/MessageCard';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleConversation } from '../../../utils/data/conversationData';
import getMessagesByUsers from '../../../utils/data/messageData';
// import getUser from '../../../utils/data/userData';

function UserMessages() {
  const [messages, setMessages] = useState([]);
  // const [profile, setProfile] = useState({});
  const router = useRouter();
  const { conversationId } = router.query;
  const { user } = useAuth();

  // const getThisUser = () => {
  //   getUser(userId).then(setProfile);
  // };

  // const getUsersMessages = () => {
  //   getMessagesByUser(userId).then(setMessages);
  // };

  useEffect(() => {
    getSingleConversation(conversationId).then((data) => {
      getMessagesByUsers(data.userOneId, data.userTwoId).then(setMessages);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // useEffect(() => {
  //   getUsersMessages();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [profile]);

  return (
    <>
      { user ? (
        <div className="text-center my-4">
          {/* <h2>{profile?.firstName} {profile?.lastName}</h2> */}
          <div className="messageCards">
            {messages?.map((message) => (
              <MessageCard key={user.id} messageObj={message} />
            ))}
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
