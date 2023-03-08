import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getConversationsByUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/conversations?user_id=${userId}`)
    .then(({ data }) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleConversation = (conversationId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/conversations/${conversationId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        userOneId: data.user_one.id,
        userTwoId: data.user_two.id,
      });
    }).catch((error) => reject(error));
});

export { getConversationsByUser, getSingleConversation };
