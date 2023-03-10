import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { Component } from 'react';
import { ImageGalleryItemStyle } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { webformatURL, tags, largeImageURL } = this.props.img;

    return (
      <ImageGalleryItemStyle onClick={this.toggleModal}>
        <img style={{ height: 260 }} src={webformatURL} alt={tags} />
        {showModal && (
          <Modal alt={tags} src={largeImageURL} onClose={this.toggleModal} />
        )}
      </ImageGalleryItemStyle>
    );
  }
}

ImageGalleryItem.propTypes = {
  img: PropTypes.object.isRequired,
};
