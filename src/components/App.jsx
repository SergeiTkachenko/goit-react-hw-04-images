import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [images, setImages] = useState('');

  const handleSearchFormSubmit = images => {
    setImages(images);
  };

  return (
    <Layout>
      <Searchbar onSearch={handleSearchFormSubmit} />
      <ImageGallery value={images} />

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
};
