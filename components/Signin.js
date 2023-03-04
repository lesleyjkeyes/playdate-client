import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import dogBones from '../images/dogBones.avif';

function Signin() {
  return (
    <div
      id="sign-in-background"
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        backgroundImage: `url(${dogBones.src})`,
        height: 929,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          opacity: 0.75,
          height: 400,
        }}
      >
        <h1>Hi there!</h1>
        <p>Click the button below to login!</p>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
