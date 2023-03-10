import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-hot-toast';

import { FcSearch } from 'react-icons/fc';
import {
  SearchbarStyle,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    images: '',
  };

  handleImagesChange = e => {
    this.setState({ images: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.images.trim() === '') {
      toast.error('Need correct search name');
      return;
    }

    this.props.onSubmit(this.state.images);
    this.setState({ images: '' });
  };

  render() {
    // const { images } = this.state;

    return (
      <SearchbarStyle>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch style={{ width: 40 }} />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.images}
            onChange={this.handleImagesChange}
          />
        </SearchForm>
      </SearchbarStyle>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
