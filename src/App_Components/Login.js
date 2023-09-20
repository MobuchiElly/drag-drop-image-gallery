import React, {useState, useEffect} from 'react'
import {auth} from './firebase';
import {signInWithEmailAndPassword} from '/node_modules/firebase/auth'
import '../index.css';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null)
// const [loggedIn, setLoggedIn] = useState(false)

const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
      console.error('Login failed', error.message);
      setError('Enter Correct Email and Password!');
    }
}


return (
  <div className='container'>
    <div className='row justify-content-center'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='card-title'>Login</h2>
            <form onSubmit={handleLogin}>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => {console.log(password)
                    setPassword(e.target.value)}}
                />
              </div>
              <button type='submit' className='btn btn-primary'>Login</button>
            </form>
            {error && <p className='text-danger'>{error}</p>} {/* Display custom error message */}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;