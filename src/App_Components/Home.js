import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import images from "./images";
import "../index.css";
import Skeleton from "react-loading-skeleton";
import { RingLoader } from "react-spinners";

function Home({ loggedIn }) {
  const [galleryImage, setGalleryImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user is logged in before fetching images
    if (!loggedIn) {
      return;
    }

    const getImages = () => {
      try {
        setTimeout(() => {
          if (images) {
            setGalleryImage(images);
            setLoading(false);
          } else {
            setError("Error fetching the image object");
            setLoading(false);
          }
        }, 100);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("An error occurred while fetching images");
        setLoading(false);
      }
    };

    getImages();
  }, [loggedIn]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = [...galleryImage];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGalleryImage(items);
  };

  return (
    <div>
      {loading ? (
        <div className="loading-spinner loadingSpinner">
        <RingLoader color={"#123abc"} loading={loading} size={150} />
      </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="card custom-image-card">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="image-gallery" direction="vertical">
              {(provided) => (
                <div
                  className="row custom-image-card"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {galleryImage.map((imgs, index) => (
                    <Draggable
                      key={imgs.id.toString()}
                      draggableId={`image-${imgs.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          data-testid="image-card"
                          className="image-card col-md-4 custom-image-card"
                          style={{
                            borderRadius: "3px",
                            padding: "0px",
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img
                            className="image img-fluid custom-image-card image-animation"
                            src={imgs.url}
                            alt="ReplaceMe"
                            data-testid="image"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "1px",
                            }}
                          />
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
      )}
    </div>
  );
}

export default Home;