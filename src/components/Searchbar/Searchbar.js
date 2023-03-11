import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { FcSearch } from 'react-icons/fc';
import {
  SearchbarStyle,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSearch }) => {
  const [images, setImages] = useState('');

  const handleImagesChange = e => {
    setImages(e.target.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (images.trim() === '') {
      toast.error('Need correct search name');
      return;
    }
    onSearch(images);
    setImages('');
  };

  return (
    <SearchbarStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch style={{ width: 40 }} />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={images}
          onChange={handleImagesChange}
        />
      </SearchForm>
    </SearchbarStyle>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
