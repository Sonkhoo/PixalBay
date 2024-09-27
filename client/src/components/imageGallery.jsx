
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image for modal
  const { getToken } = useAuth(); // Clerk authentication
  const navigate = useNavigate(); // React Router navigation

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
      const imageList = response.data;

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
      searchImages(query);
    } else {
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

  // Function to bookmark an image
  const bookmarkImage = async (imageId) => {
    try {
      const token = await getToken(); // Get JWT from Clerk
      await axios.post(
        'http://localhost:8000/api/users/bookmarks',
        { imageId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      alert("Image bookmarked successfully!");
    } catch (error) {
      console.error('Error bookmarking image:', error);
      setError('Error bookmarking image');
    }
  };

  // Navigate to bookmarks page
  const goToBookmarks = () => {
    navigate('/bookmarks');
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

      {/* Button to navigate to bookmark page */}
      <button onClick={goToBookmarks}>Show Bookmarked Images</button>

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
              {/* Bookmark button inside modal */}
              <button onClick={() => bookmarkImage(selectedImage.id)}>Bookmark</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
