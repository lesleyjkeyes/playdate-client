/* eslint-disable react/require-default-props */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, onUpdate }) {
  console.warn(user.uid);
  console.warn(user.fbUser.photoURL);
  const router = useRouter();
  const [formData, setFormData] = useState({
    about: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    country: '',
    email: user.fbUser.email,
    profileImage: user.fbUser.photoURL,
    uid: user.uid,
  });

  useEffect(() => {
    if (user.id) {
      setFormData(user);
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user, formData).then(() => onUpdate(user.uid));
  };

  return (
    <>
      <h1>{user.id ? 'Edit User Profile' : 'Create User Profile'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Control name="firstName" placeholder="Enter your first name" required value={formData.firstName} onChange={handleChange} />

          <Form.Control name="lastName" placeholder="Enter your last name" required value={formData.lastName} onChange={handleChange} />

          <Form.Control name="about" as="textarea" placeholder="Tell us about yourself" required value={formData.about} onChange={handleChange} />

          <Form.Control name="city" placeholder="Enter your city" required value={formData.city} onChange={handleChange} />

          <Form.Control name="state" placeholder="Enter your state" required value={formData.state} onChange={handleChange} />

          <Form.Control name="country" placeholder="Enter your country" required value={formData.country} onChange={handleChange} />

        </Form.Group>
        <Button variant="primary" type="submit">
          {user.id ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
    fbUser: PropTypes.shape({
      photoURL: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func,
};

export default RegisterForm;
