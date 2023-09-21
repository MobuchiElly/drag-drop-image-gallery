import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Home from './Home';
import Login from './Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, set loggedIn to true
        setLoggedIn(true);
      } else {
        // User is not logged in, set loggedIn to false
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!loggedIn) {
    // User is not logged in, render the Login component
    return <Login />;
  }

  return (
    <div>
      <Home />
    </div> 
  )
    
}

export default App;