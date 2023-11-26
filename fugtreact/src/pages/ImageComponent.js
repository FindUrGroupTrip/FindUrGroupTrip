import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageComponent() {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/static/carte-interactive.jpeg')
      .then(response => {
        setImageURL(response.config.url);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Image depuis Django</h1>
      {imageURL && <img src={imageURL} alt="Carte interactive" />}
    </div>
  );
}

export default ImageComponent;
