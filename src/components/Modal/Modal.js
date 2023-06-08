import PropTypes from 'prop-types';
import './Modal.css';
import React, { useEffect } from 'react';

export function Modal ({ onClose, selectedImage }) {

  useEffect(() => {
    const keyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      };
    };

    window.addEventListener('keydown', keyDown);
  
    return () => {
      window.removeEventListener('keydown', keyDown);
    }
  }, [onClose]);

  const onOverlayClose = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }
      return (
        <div className="Overlay" onClick={onOverlayClose}>
          <div className="Modal">
        <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
      </div>
    </div>
        )
    }

Modal.propTypes = {
  selectedImage: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};