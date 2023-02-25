import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getFollowsByUser = (followerId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/follows?follower_id=${followerId}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const checkFollow = (userId, profileId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/follows?follower_id=${userId}&followed_id=${profileId}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createFollow = (userId, profileId) => new Promise((resolve, reject) => {
  const followObj = {
    follower_id: userId,
    followed_id: profileId,
  };
  fetch(`${clientCredentials.databaseURL}/follows`, {
    method: 'POST',
    body: JSON.stringify(followObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSingleFollow = (followId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/follows/${followId}`)
    .then(() => {
      getFollowsByUser().then((followsArray) => resolve(followsArray));
    })
    .catch((error) => reject(error));
});

export {
  getFollowsByUser, createFollow, checkFollow, deleteSingleFollow,
};
