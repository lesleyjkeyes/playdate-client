import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import PetCard from '../components/PetCard';
import {
  getAllPets, getAllPetsWithTraits, getPetsByInterest, getPetsByTrait,
} from '../utils/data/petData';
import { getAllTraits } from '../utils/data/traitData';
import { getAllInterests } from '../utils/data/interestData';

function Home() {
  const { user } = useAuth();
  const [pets, setPets] = useState();
  const [traits, setTraits] = useState([]);
  const [trait, setTrait] = useState('');
  const [interests, setInterests] = useState([]);
  const [interest, setInterest] = useState('');
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');

  const filterPetsByTrait = () => {
    getPetsByTrait(trait).then((petsArray) => {
      setPets(petsArray);
    });
  };

  const filterPetsByInterest = () => {
    getPetsByInterest(interest).then((petsArray) => {
      setPets(petsArray);
    });
  };

  const getAndSetStates = () => {
    getAllPets().then((petsData) => {
      const petStates = petsData.map((pet) => pet.owner?.state);
      const uniquePetStates = [...new Set(petStates)];
      setStates(uniquePetStates);
    });
  };

  const getPets = () => {
    if (trait === '' && interest === '' && state === '') {
      getAllPetsWithTraits().then((petsArray) => {
        setPets(petsArray);
      });
    } else if (trait !== '') {
      filterPetsByTrait();
    } else if (interest !== '') {
      filterPetsByInterest();
    } else {
      getAllPetsWithTraits().then((petsArray) => {
        const petsFilteredByState = petsArray?.filter((p) => p.pet.owner?.state === state);
        setPets(petsFilteredByState);
      });
    }
  };

  useEffect(() => {
    getPets();
  }, [trait, interest, state]);

  useEffect(() => {
    getAllTraits().then((data) => {
      setTraits(data);
    });
    getAndSetStates();
  }, []);

  useEffect(() => {
    getAllInterests().then((data) => {
      setInterests(data);
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
                setInterest('');
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
          <FloatingLabel controlId="floatingSelect" label="Interests">
            <Form.Select
              aria-label="Interest"
              name="interest"
              onChange={(e) => {
                setTrait('');
                setInterest(e.target.value);
              }}
              className="mb-3"
              required
            >
              <option value="">Select an Interest</option>
              {
                interests.map((c) => (
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
          <FloatingLabel controlId="floatingSelect" label="State">
            <Form.Select
              aria-label="State"
              name="state"
              onChange={(e) => {
                setTrait('');
                setInterest('');
                setState(e.target.value);
              }}
              className="mb-3"
              required
            >
              <option value="">Select a State</option>
              {
                states.map((s) => (
                  <option
                    key={s}
                    value={s}
                  >
                    {s}
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
