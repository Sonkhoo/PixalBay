import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";

const BookmarkedImages = () => {
  const [bookmarkedImages, setBookmarkedImages] = useState([]);
  const [error, setError] = useState(null);
  const { getToken } = useAuth(); // Clerk authentication

  useEffect(() => {
    fetchBookmarkedImages();
  }, []);

  // Function to fetch all bookmarked images
  const fetchBookmarkedImages = async () => {
    try {
      const token = await getToken();
      const response = await axios.get('http://localhost:8000/api/users/bookmarks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookmarkedImages(response.data);
    } catch (error) {
      console.error('Error fetching bookmarked images:', error);
      setError('Error fetching bookmarked images');
    }
  };

  return (
    <div>
      <h2>Bookmarked Images</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="pinterest-grid">
          {bookmarkedImages.map((image, index) => (
            <div className="pinterest-grid-item" key={image.id || index}>
              <img src={image.previewURL} alt={image.tags} />
              <div className="info">{image.tags}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedImages;
