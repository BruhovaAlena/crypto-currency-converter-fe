import { useState } from 'react';
import { Currency, createConversion, getCurrencyData } from '../utils/requests';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [valueOfCrypto, setValueOfCrypto] = useState<number | undefined>(
    undefined
  );
  const [valueOfUsd, setValueOfUsd] = useState<number | undefined>(undefined);
  const { data: currencyData } = useQuery<Currency[]>({
    queryKey: ['data'],
    queryFn: getCurrencyData,
  });

  const queryClient = useQueryClient();

  const putMutationOnClickConvert = useMutation({
    mutationFn: createConversion,
    onSuccess: (data) => {
      queryClient.setQueryData(['latest'], data);
      queryClient.invalidateQueries({ queryKey: ['latest'] });
      queryClient.invalidateQueries({ queryKey: ['total'] });
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const selectedCryptoCurrencyData = currencyData?.find(
    (res) => res.symbol === selectedCurrency
  );

  const convert = () => {
    if (selectedCryptoCurrencyData && valueOfCrypto) {
      const convertedValue =
        Math.round(
          Number(valueOfCrypto * selectedCryptoCurrencyData.priceInUsd) * 100
        ) / 100;

      setValueOfUsd(convertedValue);
      putMutationOnClickConvert.mutate({
        cryptoCurrency: valueOfCrypto,
        name: selectedCurrency,
        usd: convertedValue,
      });
    }
  };
  return {
    selectedCurrency,
    setSelectedCurrency,
    setValueOfUsd,
    valueOfCrypto,
    setValueOfCrypto,
    valueOfUsd,
    convert,
  };
};
