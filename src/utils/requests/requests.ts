import axios from 'axios';

type Quote = {
  price: number;
};

export type Currency = {
  id: number;
  name: string;
  symbol: string;
  // quote: {
  //   [key: string]: Quote;
  // };
  priceInUsd: number;
};

export const getCurrencyData = async () => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: '/currencyData',
  });

  return response.data as Currency[];
};

type CreateConversion = {
  usd: number;
  cryptoCurrency: number;
  name: string;
};

export const createConversion = async ({
  cryptoCurrency,
  usd,
  name,
}: CreateConversion) => {
  await axios({
    method: 'post',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: '/addConversion',

    data: {
      usd: String(usd),
      name,
      cryptoCurrency: String(cryptoCurrency),
    },
  });
};

export const getLatestConversions = async () => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/latestConversion`,
  });
  return response.data;
};

export const getTotalConversions = async () => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    url: `/totalConversions`,
  });
  return response.data;
};
