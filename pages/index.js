import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/PetCard';
import { getAllPets } from '../utils/data/petData';
// import homepage from '../images/homepage.jpg';

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
    <div
      className="homepage"
      // style={{
      //   backgroundImage: `url(${homepage.src})`,
      //   height: 400,
      //   width: 200,
      //   // backgroundPosition: 'center',
      //   // backgroundRepeat: 'no-repeat',
      //   // backgroundSize: 'cover',
      // }}
    >
      <div className="petCards">
        {pets?.map((pet) => (
          <PetCard key={pet.id} petObj={pet} user={user} opts={{ height: '160', width: '280' }} onUpdate={getPets} />
        ))}
      </div>
    </div>
  );
}

export default Home;
