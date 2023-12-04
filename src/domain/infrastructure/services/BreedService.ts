import axios from 'axios';

class BreedService {
  async getBreeds() {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      const data = response.data.message;
      const breeds = Object.keys(data).flatMap((breed) => {
        if (data[breed].length > 0) {
          return data[breed].map((subBreed: string) => `${breed}-${subBreed}`);
        } else {
          return breed;
        }
      });

      return breeds;
    } catch (error) {
      throw error;
    }
  }

  async getBreedImages(breed: string) {
    try {
      const [mainBreed, subBreed] = breed.split('-');
      const formattedBreed = subBreed ? `${mainBreed}/${subBreed}` : mainBreed;
      const url = `https://dog.ceo/api/breed/${formattedBreed}/images`;

      const response = await axios.get(url);

      if (response.data && response.data.message) {
        const messageData = response.data.message;

        if (Array.isArray(messageData)) {
          return messageData;
        } else if (typeof messageData === 'object') {
          return Object.values(messageData);
        }
      }

      throw new Error('Unexpected response format');
    } catch (error) {
      throw error;
    }
  }
}

export default new BreedService();
