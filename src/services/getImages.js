import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33034340-c8a9f1364e27c54e88b731628';

export async function getImages(searchText, page) {
  const responce = await axios.get(
    `${BASE_URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return responce.data;
}
