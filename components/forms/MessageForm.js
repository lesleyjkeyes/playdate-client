/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { createMessage } from '../../utils/data/messageData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  content: '',
};
// eslint-disable-next-line react/prop-types
function MessageForm({ otherUserId, refresh }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      const payload = {
        ...formInput,
        otherUserId,
        userId: user.id,
      };
      createMessage(payload).then(() => {
        refresh();
        setFormInput(initialState);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput2" label="Message" className="mb-3">
        <Form.Control type="text" placeholder="Enter Your Message" name="content" value={formInput.content} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">Send</Button>
    </Form>
  );
}

MessageForm.propTypes = {
  messageObj: PropTypes.shape({
    content: PropTypes.string,
    quantity: PropTypes.number,
    title: PropTypes.string,

  }).isRequired,
};

export default MessageForm;
