/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPet, updatePet } from '../../utils/data/petData';
import {
  createPetTrait, deletePetTrait, getAllTraits, getTraitsByPet,
} from '../../utils/data/traitData';
import {
  createPetInterests, deletePetInterest, getAllInterests, getInterestsByPet,
} from '../../utils/data/interestData';

const initialState = {
  name: '',
  about: '',
  profileImage: '',
  breed: '',
};
function PetForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [traits, setTraits] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllTraits().then(setTraits);
    getAllInterests().then(setInterests);
  }, []);

  useEffect(() => {
    if (obj?.id) {
      setFormInput(obj);
      getTraitsByPet(obj?.id).then((traitArray) => setSelectedTraits(traitArray.map((trait) => trait.pet_trait?.id)));
      getInterestsByPet(obj?.id).then((interestArray) => setSelectedInterests(interestArray.map((interest) => interest.pet_interest?.id)));
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTraitChange = (traitId) => {
    if (selectedTraits.includes(traitId)) {
      setSelectedTraits(selectedTraits.filter((trait) => trait !== traitId));
    } else {
      setSelectedTraits([...selectedTraits, traitId]);
    }
  };

  const handleInterestChange = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter((interest) => interest !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      getTraitsByPet(obj.id).then((existingPetTraits) => {
        existingPetTraits.forEach((existingPetTrait) => {
          if (!selectedTraits.includes(existingPetTrait.pet_trait_id)) {
            deletePetTrait(existingPetTrait.id);
          }
        });
        selectedTraits.forEach((traitId) => {
          const existingPetTrait = existingPetTraits.find((petTrait) => petTrait.pet_trait_id === traitId);
          if (!existingPetTrait) {
            const petTraitObj = {
              pet_id: obj.id,
              pet_trait_id: traitId,
            };
            createPetTrait(petTraitObj);
          }
        });
      });
      getInterestsByPet(obj.id).then((existingPetInterests) => {
        existingPetInterests.forEach((existingPetInterest) => {
          if (!selectedInterests.includes(existingPetInterest.pet_interest_id)) {
            deletePetInterest(existingPetInterest.id);
          }
        });
        selectedInterests.forEach((interestId) => {
          const existingPetInterest = existingPetInterests.find((petInterest) => petInterest.pet_interest_id === interestId);
          if (!existingPetInterest) {
            const petInterestObj = {
              pet_id: obj.id,
              pet_interest_id: interestId,
            };
            createPetInterests(petInterestObj);
          }
        });
      });
      updatePet(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
      };
      createPet(user, payload).then((response) => {
        selectedTraits.forEach((traitId) => {
          const petTraitObj = {
            pet_id: response.id,
            pet_trait_id: traitId,
          };
          createPetTrait(petTraitObj);
        });
        selectedInterests.forEach((interestId) => {
          const petInterestObj = {
            pet_id: response.id,
            pet_interest_id: interestId,
          };
          createPetTrait(petInterestObj);
        });
        router.push('/');
      });
    }
  };

  return (
    <>
      {user.uid ? (
        <Form onSubmit={handleSubmit}>
          <h2 className="text-white mt-5">{obj?.id ? 'Update' : 'Create'} Pet</h2>
          <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter Pet Name" name="name" value={formInput.name} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="About" className="mb-3">
            <Form.Control type="text" placeholder="Enter Trip about" name="about" value={formInput.about} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Pet Image URL" className="mb-3">
            <Form.Control type="url" placeholder="Add Pet Photo" name="profileImage" value={formInput.profileImage} onChange={handleChange} required />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Breed" className="mb-3">
            <Form.Control type="text" placeholder="Add Breed" name="breed" value={formInput.breed} onChange={handleChange} />
          </FloatingLabel>
          Traits:
          {
          traits.map((trait) => (
            <Form.Check
              inline
              label={trait.title}
              name="check"
              type="checkbox"
              value={trait.id}
              key={trait.id}
              checked={selectedTraits.includes(trait.id)}
              onChange={() => handleTraitChange(trait.id)}
            />
          ))
        }
          Interests:
          {
            interests.map((interest) => (
              <Form.Check
                inline
                label={interest.title}
                name="check"
                type="checkbox"
                value={interest.id}
                key={interest.id}
                checked={selectedInterests.includes(interest.id)}
                onChange={() => handleInterestChange(interest.id)}
              />
            ))
          }
          <Button type="submit">{obj?.id ? 'Update' : 'Create'} Pet</Button>
        </Form>
      ) : (
        <div>
          <h1>Sign in to Add a Pet</h1>
        </div>
      )}
    </>
  );
}

PetForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
    profileImage: PropTypes.string,
    breed: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default PetForm;
