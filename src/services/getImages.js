const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33034340-c8a9f1364e27c54e88b731628';

export const getImagems = (serchText, page) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${serchText}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
};
