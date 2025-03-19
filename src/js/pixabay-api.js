import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49405379-236235770e28cb9bd374c0ae0';

export const searchImages = async (query, page = 1) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch images');
  }
};
