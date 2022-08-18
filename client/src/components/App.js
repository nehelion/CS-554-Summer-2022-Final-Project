import React from 'react';
import './App.css';
import {NavLink, BrowserRouter as Router, Route} from 'react-router-dom';
import ShowUnsplash from './ShowUnsplash';
import ShowMybin from './ShowMybin';
import ShowMypost from './ShowMypost';
import UploadImage from './UploadImage';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <header className='App-header'>
            <h1 className='App-title'>
              CS554 Final Porject by React: Tesseract Lens
            </h1>
            <nav>
              <NavLink className='navlink' to='/'>
                HOME PAGE
              </NavLink>
              <NavLink className='navlink' to='/my-posts'>
                MY POSTS
              </NavLink>
              <NavLink className='navlink' to='/new-post'>
                UPDATE POST
              </NavLink>
              <NavLink className='navlink' to='/my-bin'>
                ADMIN PAGE
              </NavLink>
              <NavLink className='navlink' to='/login'>
                LOG IN / SIGN UP
              </NavLink>
            </nav>
          </header>
          <Route exact path='/' component={ShowUnsplash} />
          <Route path='/my-bin' component={ShowMybin} />
          <Route path='/my-posts' component={ShowMypost} />
          <Route path='/new-post' component={UploadImage} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
