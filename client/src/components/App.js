import React from 'react'
import '../App.css';

import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Landing from './Landing'
import Navigation from './Navigation';
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'
import Home from './Home'

import {AuthProvider} from "../firebase/Auth"
function App() {
  return (
    <AuthProvider>
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Navigation />
        </header>
      </div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signout' element={<SignOut />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
