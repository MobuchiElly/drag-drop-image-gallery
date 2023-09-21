import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { RingLoader } from "react-spinners";
import images from "./images";

function Search({ query, setQuery }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchImages = () => {
      try {
        setLoading(true);
        setError(null);
    
        if (!query) {
          setSearchResults([]);
          setLoading(false);
          return;
        }
    
        const filteredImages = images.filter((image) => {
          return image.tag.toLowerCase().includes(query.toLowerCase());
        });
    
        setSearchResults(filteredImages);
        setLoading(false);
      } catch (err) {
        console.error("Error in searchImages:", err); // Log the error for debugging
        setError("An error occurred while searching for images");
        setLoading(false);
      }
    };
    

    searchImages();
  }, [query]); // Listen to changes in the query prop

  const handleInputChange = (e) => {
    // Update the query using setQuery prop
    setQuery(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed", error.message);
    }
  };

  console.log("Error:", error); // Add this line for debugging

  return (
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
      <h1>Search by Category e.g food, housing, nature </h1>
      <input
        type="text"
        placeholder="Search by category ..."
        value={query}
        onChange={handleInputChange}
      />
      {loading && (
        <div className="loading-spinner">
          <RingLoader color={"#123abc"} loading={loading} size={150} />
        </div>
      )}
      {error && <p>{error}</p>}
      <div className="search-results">
        {searchResults.map((imgs, index) => (
          <div className="imgs-card" key={index}>
            <img src={imgs.url} alt={imgs.title} data-testid="imgs-poster" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
