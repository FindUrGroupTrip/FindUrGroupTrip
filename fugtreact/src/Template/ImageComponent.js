import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageComponent() {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/static/FUGTLogo.png')
      .then(response => {
        setImageURL(response.config.url);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {imageURL && <img src={imageURL} />}
    </div>
  );
}

export default ImageComponent;
