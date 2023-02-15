import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/PetCard';
import { getAllPets } from '../utils/data/petData';

function Home() {
  const { user } = useAuth();
  const [pets, setPets] = useState();

  const getPets = () => {
    getAllPets().then((petsArray) => {
      setPets(petsArray);
    });
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div>
      {pets?.map((pet) => (
        <PetCard key={pet.id} petObj={pet} user={user} opts={{ height: '160', width: '280' }} onUpdate={getPets} />
      ))}
    </div>
  );
}

export default Home;
