import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/PetCard';
import { getPetsByUser } from '../utils/data/petData';

function YourPets() {
  const { user } = useAuth();
  const [pets, setPets] = useState();
  const router = useRouter();

  const getUsersPets = () => {
    getPetsByUser(user.id).then(setPets);
  };

  useEffect(() => {
    getUsersPets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      {user.id ? (
        <div className="myPets">
          <div className="myPets2">
            <div>
              <h2 className="myPetsh2">My Pets</h2>
            </div>
          </div>
          <div className="petCards">
            {pets?.map((pet) => (
              <PetCard key={pet.id} petObj={pet} opts={{ height: '160', width: '280' }} onUpdate={getUsersPets} router={router.asPath} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>Sign in to see your pets</h1>
        </div>
      )}
    </div>
  );
}

export default YourPets;
