import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { RingLoader } from "react-spinners";
import images from "./images";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedResults = [...searchResults];
    const [reorderedItem] = updatedResults.splice(result.source.index, 1);
    updatedResults.splice(result.destination.index, 0, reorderedItem);

    setSearchResults(updatedResults);
  };

  return (
    <div>
      <div className="top-card">
        <div className="header">
          <h1>Image Gallery</h1>
        </div>
        <button onClick={handleLogout} className="btn btn-danger logout-btn">
          Logout
        </button>
      </div>
      <div className="input-ntext">
        <h3>Search by Category e.g food, housing, nature </h3>
        <input
          type="text"
          placeholder="Search by category ..."
          value={query}
          onChange={handleInputChange}
          className="form-control"
          id="searchInput"
          name="searchInput"
        />
      </div>
      {loading && (
        <div className="loading-spinner loadingSpinner">
          <RingLoader color={"#123abc"} loading={loading} size={150} />
        </div>
      )}
      {error && <div className="alert alert-warning alert-dismissible fade show">
        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        <p>{error}</p>
      </div>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="search-results" direction="vertical">
          {(provided) => (
            <div
              className="search-results row custom-image-card"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {searchResults.map((imgs, index) => (
                <Draggable
                  key={imgs.id.toString()}
                  draggableId={`search-image-${imgs.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 mb-1 custom-image-card"
                      key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="card">
                        <img
                          src={imgs.url}
                          alt={imgs.title}
                          className="card-img-top search-image image-animation custom-image-card"
                          data-testid="imgs-poster"
                        />
                        <div className="footer custom-image-card">
                          <div></div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Search;
