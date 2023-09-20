import React, {useState, useEffect} from 'react';
import {auth} from './firebase'
import Home from './Home';
import '../index.css';
import Login from './Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
      // User is logged in, set loggedIn to true
        setLoggedIn(true);
      }
      else {
      // User is not logged in, set loggedIn to false
        setLoggedIn(false);
      }
    });

    return () => unsubscribe;
  }, [])

  return (
    <div>
      {(loggedIn) ? (
      <Home /> //render Home if loggedIn is true 
      ) : (
        <Login /> //render Login if loggedIn is false 
      )}
      
    </div>
  );
}

export default App;
