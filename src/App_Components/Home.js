import React, { useEffect, useState } from 'react';
import images from './images';
import '../index.css';
import Skeleton from 'react-loading-skeleton';
import { RingLoader } from 'react-spinners';
import { auth } from './firebase';

function Home() {
  const [galleryImage, setGalleryImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add an error state

  const getImages = () => {
    try {
      // I am simulating an asynchronous fetch
      setTimeout(() => {
        if (images) {
          setGalleryImage(images);
          setLoading(false);
        } else {
          setError('Error fetching the image object');
          setLoading(false);
        }
      }, 1000); // Simulated delay
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('An error occurred while fetching images');
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout failed', error.message);
    }
  };

  return (
    <div className="container">
      {loading ? (
        // Use Skeleton components to display placeholders during loading
        Array.from({ length: 10 }).map((_, index) => (
          <div
            data-testid="image-card"
            className="image-card col-md-4" // Bootstrap column class for a 3-column layout
            key={index}
          >
            <Skeleton width={200} height={200} />
            <div data-testid="image-details" className="image-details">
              <Skeleton width={100} height={20} />
              <Skeleton width={150} height={20} />
            </div>
          </div>
        ))
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          <div className="top-card">
            <div className="header">
              <h1>Image Gallery</h1>
              <p>Drag and Drop Images at will</p>
            </div>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
          <div className="row">
            {galleryImage.map((imgs) => (
              <div
                data-testid="image-card"
                className="image-card col-md-4 mb-4 d-flex flex-wrap" // Bootstrap column class for a 3-column layout, and add margin-bottom for spacing
                key={imgs.id}
                style={{ borderRadius: '3px', padding: '0px', backgroundColor:'cyan'}} // Add border radius and padding
              >
                <img
                  className="image img-fluid" // img-fluid makes the image responsive
                  src={imgs.url}
                  alt="ReplaceMe"
                  data-testid="image"
                  style={{width:'100%', height:'100%'}}
                />
                {/* <div data-testid="image-details" className="image-details">
                  <div data-testid="image-tag" className="image-tag">{imgs.tag}</div>
                  <div data-testid="image-title" className="image-title">{imgs.title}</div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
