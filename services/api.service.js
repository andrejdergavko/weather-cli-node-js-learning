import { TOKEN_DICTIONARY, getKeyValue } from './storage.service.js';
import axios from 'axios';

export const getWeather = async () => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  const city = await getKeyValue(TOKEN_DICTIONARY.city);

  if (!token) {
    throw new Error('Не задан ключ API, Задайте через команду -t [API_KEY]');
  }

  if (!city) {
    throw new Error('Не задан город, Задайте через команду -s [Город]');
  }

  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metric',
      },
    }
  );

  return data;
};
