import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/PetCard';
import { getAllPetsWithTraits } from '../utils/data/petData';
import { getAllTraits } from '../utils/data/traitData';

function Home() {
  const { user } = useAuth();
  const [pets, setPets] = useState();
  const [traits, setTraits] = useState([]);
  const [trait, setTrait] = useState('0');

  const filterPetsByTraits = (petsArray) => {
    const filteredPets = petsArray?.filter((pet) => pet.pet_trait?.id === parseInt(trait, 10));
    return filteredPets;
  };

  const getPets = () => {
    getAllPetsWithTraits().then((petsArray) => {
      if (parseInt(trait, 10) > 0) {
        const petsByTrait = filterPetsByTraits(petsArray);
        setPets(petsByTrait);
      } else {
        setPets(petsArray);
      }
    });
  };

  useEffect(() => {
    getPets();
  }, [trait]);

  useEffect(() => {
    getAllTraits().then((data) => {
      setTraits(data);
    });
  }, []);

  return (
    <div
      className="homepage"
    >
      <div className="filters">
        <Form>
          <FloatingLabel controlId="floatingSelect" label="Traits">
            <Form.Select
              aria-label="Trait"
              name="trait"
              onChange={(e) => {
                setTrait(e.target.value);
              }}
              className="mb-3"
              required
            >
              <option value="">Select a Trait</option>
              {
                traits.map((c) => (
                  <option
                    key={c.id}
                    value={c.id}
                  >
                    {c.title}
                  </option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
        </Form>
      </div>
      <div className="petCards">
        {pets?.map((pet) => (
          <PetCard key={pet.id} petObj={pet.pet} user={user} opts={{ height: '160', width: '280' }} onUpdate={getPets} />
        ))}
      </div>
    </div>
  );
}

export default Home;
