import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { ImageGalleryItemStyle } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  img: { webformatURL, tags, largeImageURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <ImageGalleryItemStyle onClick={toggleModal}>
      <img style={{ height: 260 }} src={webformatURL} alt={tags} />
      {showModal && (
        <Modal alt={tags} src={largeImageURL} onClose={toggleModal} />
      )}
    </ImageGalleryItemStyle>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.object.isRequired,
};
