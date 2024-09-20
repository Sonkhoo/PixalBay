import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image for modal

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/images');
      const imageList = response.data;

      // Preload larger images
      imageList.forEach(image => {
        const img = new Image();
        img.src = image.largeImageURL;
      });

      setImages(imageList);
    } catch (error) {
      setError('Error fetching images');
    }
  };

  const searchImages = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/images?query=${searchQuery}`);
            const imageList = response.data
            // Preload larger images
            imageList.forEach(image => {
              const img = new Image();
              img.src = image.largeImageURL;
            });
      
            setImages(imageList);
    } catch (error) {
      setError('Error searching images');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // If query is not empty, fetch search results
      searchImages(query);
    } else {
      // If query is empty, fetch random images
      fetchImages();
    }
  };

  // Function to handle image click and open modal
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="pinterest-grid">
        {error ? (
          <p>{error}</p>
        ) : (
          images.map((image) => (
            <div
              className="pinterest-grid-item"
              key={image.id}
              onClick={() => openImageModal(image)}
            >
              <img src={image.previewURL} alt={image.tags} />
              <div className="info">{image.tags}</div>
            </div>
          ))
        )}
      </div>

      {/* Modal for larger image and additional info */}
      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
            <div className="modal-info">
              <h2>{selectedImage.tags}</h2>
              <p>By: {selectedImage.user}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
