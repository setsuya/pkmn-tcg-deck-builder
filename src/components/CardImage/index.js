import React, { useState } from 'react';

import Loader from '../Loader';

import { Overlay } from './styles.js';

export default function CardImage({ src, alt = "card image", ...rest }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded && (
        <Overlay>
          <Loader />
        </Overlay>
      )}
      <img src={src} alt={alt} onLoad={() => {setImageLoaded(true);}} />
    </>
  );
}
