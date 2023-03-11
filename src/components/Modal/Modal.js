import { ModalStyle, Overlay } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ alt, src, onClose }) => {
  //  const componentDidMount() {
  //     window.addEventListener('keydown', handleEsc);
  //   }

  //  const componentWillUnmount() {
  //     window.removeEventListener('keydown', handleEsc);
  //   }

  //   const handleEsc = event => {
  //     if (event.code === 'Escape') {
  //       this.props.onClose();
  //     }
  //   };

  useEffect(() => {
    const handleEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget !== event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalStyle>
        <img src={src} alt={alt} />
      </ModalStyle>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
