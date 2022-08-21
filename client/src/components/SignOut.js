import React from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';

const SignOutButton = () => {

  let handleSignOut = () => {
    // Destroy the Firebase Session
    doSignOut();
  }

  return (
    <button type='button' onClick={doSignOut}>
      Confirm to Sign out
    </button>
  );
};

export default SignOutButton;