import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllInterests = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/interests`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getInterestsByPet = (petId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/petinterests?pet_id=${petId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createPetInterests = (petInterestObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/petinterests`, {
    method: 'POST',
    body: JSON.stringify(petInterestObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deletePetInterest = (petInterestId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/petinterests/${petInterestId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllInterests,
  getInterestsByPet,
  createPetInterests,
  deletePetInterest,
};
