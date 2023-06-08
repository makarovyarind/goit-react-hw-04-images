import './ImageGallery.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';


export function ImageGallery ({ images, onClick }){

return (
      <ul className="ImageGallery">
        {images.map(item => (
          <ImageGalleryItem
            key={item.id}
            imageUrl={item.webformatURL}
            alt={item.tags}
            onClick={() => onClick(item)}
          />
        ))}

      </ul>
    );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};