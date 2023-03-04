import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getMessagesByUsers = (userOneId, userTwoId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/messages?user_one_id=${userOneId}&user_two_id=${userTwoId}`)
    .then(({ data }) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export default getMessagesByUsers;
