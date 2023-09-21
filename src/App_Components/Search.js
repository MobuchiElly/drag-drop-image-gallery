import React, {useState, useEffect} from 'react'
import { RingLoader } from 'react-spinners';
import images from './images';

function Search() {
    // const [galleryImg, setGalleryImg] = useState([]);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const searchImages = (images) => {
        try {
          setLoading(true);
          setError(null);
        
          if(!query) {
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
          setError('Search by category e.g house, food, nature');
          setLoading(false);
        }
      };
      
      searchImages(images);
    }, [query]); //Should work only when there is Query i.e [query]
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };

    return (
      <div>
        <div>
          <h1>Image Search</h1>
          <input
            type="text"
            placeholder="Search by category ..."
            value={query}
            onChange={handleInputChange}
          />
          {loading && <div className="loading-spinner">
          <RingLoader color={'#123abc'} loading={loading} size={150} />
        </div>}
          {error && <p>{error}</p>}
          <div className="search-results">
            {searchResults.map((imgs, index) => (
                <div className="imgs-card" key={index}>
                  <img
                    src={imgs.url}
                    alt={imgs.title} data-testid="imgs-poster"
                  />
                  {/* <h2 data-testid="imgs-title">{imgs.title}</h2> */}
                  {/* <p data-testid="imgs-tag">{imgs.tag}</p> */}
                </div>
            ))}
          </div>
        </div>
        {/* {(searchResults !== []) && <Card data-testid="movie-card"/>} */}
      </div>
    );
}

export default Search;