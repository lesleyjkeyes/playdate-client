import axios from 'axios';
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getAllTraits = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/traits`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getTraitsByPet = (petId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/pettraits?pet_id=${petId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createPetTrait = (petTraitObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/pettraits`, {
    method: 'POST',
    body: JSON.stringify(petTraitObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deletePetTrait = (petTraitId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/pettraits/${petTraitId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getAllTraits,
  getTraitsByPet,
  createPetTrait,
  deletePetTrait,
};
