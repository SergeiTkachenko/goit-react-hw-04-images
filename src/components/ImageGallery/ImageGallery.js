import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { ImageGalleryStyle } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { getImagems } from '../../services/getImages';
import { Loader } from 'components/Loader/Loader';
import { Button } from '../Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: '',
    showButton: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { value } = this.props;
    if (
      this.props.value !== prevProps.value ||
      this.props.page !== prevProps.page
    ) {
      this.setState({ loading: true, images: [] });

      getImagems(value.trim())
        .then(response => response.json())
        .then(images => {
          this.setState({
            images: images.hits,
            totalPages: Math.ceil(images.totalHits / 12),
          });

          if (Math.ceil(images.totalHits / 12) === 0) {
            toast.error('No images');
            return;
          }

          if (page < Math.ceil(images.totalHits / 12)) {
            return this.setState({ showButton: true });
          }
          this.setState({ showButton: false });
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.page !== page && page !== 1) {
      getImagems(value.trim(), page)
        .then(response => response.json())
        .then(images => {
          this.setState({
            images: [...prevState.images, ...images.hits],
          });

          if (page < Math.ceil(images.totalHits / 12)) {
            return this.setState({ showButton: true });
          }
          this.setState({ showButton: false });
        })
        .catch(error => console.log(error));
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const loadMore = this.loadMore;
    return (
      <>
        <ImageGalleryStyle>
          {this.state.loading && <Loader></Loader>}

          {this.state.images.map(img => {
            return <ImageGalleryItem key={img.id} img={img} />;
          })}
        </ImageGalleryStyle>
        {this.state.showButton && <Button loadMore={loadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.any.isRequired,
};
