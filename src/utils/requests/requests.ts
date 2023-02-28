import axios from 'axios';

type Quote = {
  price: number;
};

export type Currency = {
  id: number;
  name: string;
  quote: {
    [key: string]: Quote;
  };
};

type GetAllData = {
  onSuccess: (data: Currency[]) => void;
};

export const getCurrencyData = async ({ onSuccess }: GetAllData) => {
  try {
    const response = await axios({
      method: 'get',
      baseURL: 'http://localhost:8000',
      url: '/currencyData',
    });

    const allData = response.data.data;
    onSuccess(allData);
  } catch (error) {
    console.log('error', error);
  }
};
