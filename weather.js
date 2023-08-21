#!/usr/bin/env node
import { geyArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { TOKEN_DICTIONARY, saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('No token provided!');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved!');
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city) {
    printError('No city provided!');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City saved!');
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather();

    console.log(weather);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('City not found!');
    }
    if (e?.response?.status == 401) {
      printError('Invalid token!');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = geyArgs(process.argv);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
    saveCity(args.s);
  }
  if (args.t) {
    saveToken(args.t);
  }

  getForcast();
};

initCLI();
