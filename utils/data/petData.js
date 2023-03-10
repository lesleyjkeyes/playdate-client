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
        profileImage: data.profile_image,
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

const getAllPetsWithTraits = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pettraits?pets=true`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getPetsByTrait = (trait) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pettraits?pet_trait_id=${trait}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getPetsByInterest = (interest) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/petinterests?pet_interest_id=${interest}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const createPet = (user, pet) => new Promise((resolve, reject) => {
  const petObj = {
    owner_id: user.id,
    name: pet.name,
    about: pet.about,
    profile_image: pet.profileImage,
    breed: pet.breed,
  };
  fetch(`${clientCredentials.databaseURL}/pets`, {
    method: 'POST',
    body: JSON.stringify(petObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePet = (petObj) => new Promise((resolve, reject) => {
  const newPetObj = {
    name: petObj.name,
    about: petObj.about,
    profile_image: petObj.profileImage,
    breed: petObj.breed,
  };
  axios.put(`${dbUrl}/pets/${petObj.id}`, newPetObj)
    .then(() => getAllPets().then(resolve))
    .catch(reject);
});

const deleteSinglePet = (petId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/pets/${petId}`)
    .then(() => {
      getAllPets().then((petsArray) => resolve(petsArray));
    })
    .catch((error) => reject(error));
});

const getPetsByUser = (ownerId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pets?owner_id=${ownerId}`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export {
  getAllPets,
  getSinglePet,
  getPetsByCity,
  createPet,
  updatePet,
  deleteSinglePet,
  getPetsByUser,
  getPetsByTrait,
  getAllPetsWithTraits,
  getPetsByInterest,
};
