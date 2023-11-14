import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import Footer from './Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div>
          <Search query={query} setQuery={setQuery} />
          {query ? null : <Home loggedIn={loggedIn}/>}
          <Footer />
        </div>
      ) : (
        // User is not logged in, render the Login component
        <Login />
      )}
      
    </div>
  );
}

export default App;