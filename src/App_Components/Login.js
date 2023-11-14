import React, { useState } from 'react';
import { auth } from './firebase';
import './login.css'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import '../index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login failed', error.message);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign-up failed', error.message);
      setError('Sign-up failed. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError('A password reset email has been sent. Check your email inbox.');
    } catch (error) {
      console.error('Password reset failed', error.message);
      setError('Password reset failed. Please check your email address.');
    }
  };

  // Function to toggle between sign-up and login forms
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  return (
    <div className='container-fluid vh-100 d-flex justify-content-center align-items-center border border-red'>
          <div className='card border border-danger d-flex flex-column justify-content-center align-items-center p-4'>
              <div className='card-title text-light text-center'>{isSignUp ? <h2 className='gradient-text'>Sign Up</h2> : <h2 className='gradient-text'>Login</h2>}</div>

              {isSignUp ? (
                <form onSubmit={handleSignUp}>
                  <div className=''>
                    
                    <label htmlFor='signup-email' className='form-label text-light'></label>
                    <input
                      type='email'
                      className='form-control input-css'
                      id='signup-email'
                      placeholder='example@mail.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className='mb-5'>
                    <label htmlFor='signup-password' className='form-label'></label>
                    <input
                      type='password'
                      className='form-control input-css'
                      id='signup-password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type='submit' className='btn w-100 btn-css btn-light'><h6 className='p-2 text-light'>Sign Up</h6></button>
                </form>

              ) : (
                <form onSubmit={handleLogin}>
                  <div className=''>
                    <label htmlFor='email' className='form-label text-light'></label>
                    <input
                      type='email'
                      className='form-control input-css'
                      id='email'
                      placeholder='example@mail.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='mb-5'>
                    <label htmlFor='password' className='form-label text-light'></label>
                    <input
                      type='password'
                      className='form-control input-css'
                      id='password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  <button type='submit' className='btn btn-light w-100 btn-css'><h6 className='p-2 text-light'>Login</h6></button>
                
                </form>
              )}
              <Toggle isSignUp={isSignUp} toggleForm={toggleForm}/>
              {error && <p className='text-danger'>{error}</p>}
           
          </div>
        
      
    </div>
  );
}

export default Login;



const Toggle = ({isSignUp, toggleForm}) => {
  return (
    <div>
      <p>
                {isSignUp ? (
                  <div className='container-fluid d-flex justify-content-between align-items-center'>
                  
                    <div className='text-light'>
                      <p>Already a user?</p></div>
                      <button type='button' className='btn p-0 text-light' onClick={toggleForm}>
                        <p>Login</p>
                      </button>
                    </div>
                  
                ) : (
                  <div className='contain d-flex justify-content-between align-items-center'>
                        <p className='text-light'>Not a user?</p>
                        <button type='button' className='btn p-0 text-light' onClick={toggleForm}>
                          <p>Sign Up</p>
                        </button>
                  </div>
                )}
              </p>
    </div>
  )
}
