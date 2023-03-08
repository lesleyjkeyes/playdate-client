import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { getPetsByTrait } from '../utils/data/petData';
import { getAllTraits } from '../utils/data/traitData';
import PetCard from './PetCard';

export default function TraitFilter() {
  const [pets, setPets] = useState([]);
  const [traits, setTraits] = useState([]);
  const [trait, setTrait] = useState('0');

  const getPets = () => {
    getPetsByTrait(trait).then((data) => {
      setPets(data);
    });
  };

  useEffect(() => {
    getPets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trait]);

  useEffect(() => {
    getAllTraits().then((data) => {
      setTraits(data);
    });
  }, []);

  return (
    <>
      <Form>
        <FloatingLabel controlId="floatingSelect" label="Country">
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
      <div className="text-center my-4">
        <div className="tripCards">
          {
            pets.length > 0
              ? pets?.map((pet) => (
                <PetCard key={pet.id} petObj={pet} opts={{ height: '160', width: '280' }} />
              ))
              : (
                <div>
                  <h1>No Pets Found</h1>
                </div>
              )
          }
        </div>
      </div>
    </>
  );
}
