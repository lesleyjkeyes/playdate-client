import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

// const getConversationsByUser = (userId) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/messages?sender_id=${userId}`)
//     .then(({ data }) => {
//       if (data) {
//         // if sender.id of 1 object = recipient.id of another object, filter it out
//         resolve(Object.values(data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch((error) => reject(error));
// });

const getMessagesByUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/messages?sender_id=${userId}`)
    .then(({ data }) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export default getMessagesByUser;
