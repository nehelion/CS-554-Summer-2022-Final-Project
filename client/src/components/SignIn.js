import React, {useContext} from 'react';
import SocialSignIn from './SocialSignIn';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../firebase/Auth';
import {Grid} from '@material-ui/core';
import '../App.css';
import { doSignInWithEmailAndPassword,doPasswordReset } from '../firebase/FirebaseFunctions';

function SignIn(){
    const {currentUser} = useContext(AuthContext);
    const handleLogin = async (event) => {
        event.preventDefault();
        let {email,password} = event.target.elements

        try{
            await doSignInWithEmailAndPassword(email.value, password.value)
        }catch(err){
            alert(err)
        }
    }
    const passwordReset = (event) =>{
        event.preventDefault();
        let email = document.getElementById('email').value
        if(email){
            doPasswordReset(email)
            alert ("An email has been sent so that you can reset your password")
        }
        else{
            alert("Please enter an email address below before you click the forgot Password link")
        }
    }
    if(currentUser){
        return <Navigate to ="/" />
    }
    return (
        <div>
          <h1>Log in</h1>
          <form onSubmit={handleLogin}>
            <Grid container>
              <Grid item className='form-group' xs={12} sm={4}>
                <label>
                  Email: <input className='form-control' name='email' id='email' type='email' placeholder='Email' required />
                </label>
              </Grid>
              <Grid item className='form-group' xs={12} sm={4}>
                <label>
                  Password: <input className='form-control' name='password' type='password'  placeholder='Password' autoComplete='off' required />
                </label>
              </Grid>
              <Grid item className='form-group' xs={12} sm={12}>
                <button type='submit'> Log in </button>
              </Grid>
            </Grid>
        </form>
  
        <br />
        <SocialSignIn />
      </div>
    );
}

export default SignIn;