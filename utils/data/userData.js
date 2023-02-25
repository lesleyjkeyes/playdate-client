import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        about: data.about,
        email: data.email,
        imageUrl: data.image_url,
        firstName: data.first_name,
        lastName: data.last_name,
        profileImage: data.profile_image,
        city: data.city,
        state: data.state,
        country: data.country,
      });
    }).catch((error) => reject(error));
});

export default getUser;
