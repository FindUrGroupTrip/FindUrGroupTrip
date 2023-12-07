import React, { useState } from 'react';
import ImageComponent from '../Template/ImageComponent';

function HomePage() {
  const [showImage, setShowImage] = useState(false);

  return (
    <div>
      <h1>Page d'accueil</h1>
      <button onClick={() => setShowImage(true)}>Afficher l'image</button>
      {showImage && <ImageComponent />}
    </div>
  );
}

export default HomePage;
