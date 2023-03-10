import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    images: [],
  };

  handleSearchFormSubmit = images => {
    this.setState({ images });
  };

  render() {
    return (
      <Layout>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery value={this.state.images} />

        <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            duration: 2000,
          }}
        />
        <GlobalStyle />
      </Layout>
    );
  }
}
