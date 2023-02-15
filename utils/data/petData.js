import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllPets = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pets`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSinglePet = (petId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/pets/${petId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        name: data.name,
        about: data.about,
        profileImage: data.profileImage,
        breed: data.breed,
        owner: data.owner,
      });
    }).catch((error) => reject(error));
});

const getPetsByCity = (userId, city) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pets?user_id=${userId}&_city=${city}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

export {
  getAllPets,
  getSinglePet,
  getPetsByCity,
};
