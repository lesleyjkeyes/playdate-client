/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPet, updatePet } from '../../utils/data/petData';

const initialState = {
  name: '',
  about: '',
  profileImage: '',
  breed: '',
};
function PetForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      updatePet(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
      };
      createPet(user, payload).then(() => {
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
