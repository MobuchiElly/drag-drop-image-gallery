import React, { useState } from 'react';
import { auth } from './firebase';
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
    setError(null); // Clear any error messages when switching forms
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title'>{isSignUp ? 'Sign Up' : 'Login'}</h2>
              {isSignUp ? (
                <form onSubmit={handleSignUp}>
                  <div className='mb-3'>
                    <label htmlFor='signup-email' className='form-label'>Email address</label>
                    <input
                      type='email'
                      className='form-control'
                      id='signup-email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='signup-password' className='form-label'>Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='signup-password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type='submit' className='btn btn-success'>Sign Up</button>
                </form>
              ) : (
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type='submit' className='btn btn-primary'>Login</button>
                </form>
              )}
              <p>
                {isSignUp ? (
                  <>
                    Already a user?{' '}
                    <button type='button' className='btn btn-link' onClick={toggleForm}>
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Not a user?{' '}
                    <button type='button' className='btn btn-link' onClick={toggleForm}>
                      Sign Up
                    </button>
                  </>
                )}
              </p>
              {error && <p className='text-danger'>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
