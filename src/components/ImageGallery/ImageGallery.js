import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { ImageGalleryStyle } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { getImages } from '../../services/getImages';
import { Loader } from 'components/Loader/Loader';
import { Button } from '../Button/Button';

export const ImageGallery = ({ value }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!value) {
      return;
    }

    setLoading(true);
    setImages([]);
    setPage(1);

    getImages(value)
      .then(images => {
        setImages(images.hits);

        if (Math.ceil(images.totalHits / 12) === 0) {
          toast.error('No images');
          return;
        }

        if (images.totalHits > 12) {
          return setShowButton(true);
        }
        setShowButton(false);
      })
      .catch(error => toast.error(error))
      .finally(() => setLoading(false));
  }, [value]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    getImages(value, page)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);

        if (page < Math.ceil(images.totalHits / 12)) {
          return setShowButton(true);
        }
        setShowButton(false);
      })
      .catch(error => toast.error(error));
  }, [page, value]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <ImageGalleryStyle>
        {loading && <Loader></Loader>}

        {images.map(img => {
          return <ImageGalleryItem key={img.id} img={img} />;
        })}
      </ImageGalleryStyle>
      {showButton && <Button loadMore={loadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  value: PropTypes.any.isRequired,
};
