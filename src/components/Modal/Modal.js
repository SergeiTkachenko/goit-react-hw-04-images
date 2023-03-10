import { ModalStyle, Overlay } from './Modal.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget !== event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { alt, src } = this.props;

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyle>
          <img src={src} alt={alt} />
        </ModalStyle>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
