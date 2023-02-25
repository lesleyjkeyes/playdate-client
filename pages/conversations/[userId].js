import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ConversationCard from '../../components/ConversationCard';
import { useAuth } from '../../utils/context/authContext';
import getMessagesByUser from '../../utils/data/messageData';
import getUser from '../../utils/data/userData';

function UserProfile() {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuth();

  const getThisUser = () => {
    getUser(userId).then(setProfile);
    console.warn(profile);
  };

  const getUsersConversations = () => {
    getMessagesByUser(userId).then(setMessages);
  };

  useEffect(() => {
    getThisUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    getUsersConversations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <>
      { user ? (
        <div className="text-center my-4">
          <h2>{profile?.firstName} {profile?.lastName}</h2>
          <div className="conversationCards">
            {messages?.map((message) => (
              <ConversationCard key={user.id} messageObj={message} onUpdate={getUsersConversations} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Sign in to see your conversations</h2>
        </div>
      )}
    </>
  );
}

export default UserProfile;
