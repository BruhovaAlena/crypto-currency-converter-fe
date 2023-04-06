import React, { useState } from 'react';
import { Flex, Icon, Button } from '@chakra-ui/react';
import { COLORS } from '../constants/colors';
import { createConversion, Currency, getCurrencyData } from '../utils/requests';
import { BsCurrencyDollar } from 'react-icons/bs';
import CurrencyPicker from './CurrencyPicker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import NumberInput from './NumberInput';
import { IconMapper, IconMapperKeys } from './TotalAmnoutOfCurrency';

const Converter = () => {
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
  const mappedIcon = IconMapper[selectedCurrency as IconMapperKeys];

  return (
    <Flex
      flexDir="column"
      px="10px"
      py="10px"
      gap="10px"
      alignItems="center"
      w={{ lg: '50%', base: '100%' }}
      justifyContent={'center'}
    >
      <CurrencyPicker
        onClickCurrency={(name) => setSelectedCurrency(name)}
        selectedCurrency={selectedCurrency}
      />

      <Flex
        flexDir="column"
        alignItems="center"
        gap="20px"
        w="100%"
        justifyContent="center"
      >
        <Flex alignItems="center" w={{ base: '100%', md: '80%' }} gap="10px">
          <NumberInput
            placeholder="Cryptocurrency"
            value={valueOfCrypto}
            onChange={(e) => {
              setValueOfCrypto(Number(e.target.value));
              setValueOfUsd(undefined);
            }}
          />

          <Flex w="50px" justifyContent="center">
            <Icon
              as={mappedIcon.icon}
              w="30px"
              h="30px"
              color={mappedIcon.color}
            />
          </Flex>
        </Flex>
        <Flex alignItems="center" w={{ base: '100%', md: '80%' }} gap="10px">
          <NumberInput
            placeholder="USD"
            isReadOnly
            value={valueOfUsd}
            onChange={(e) => {
              console.log('first');
              setValueOfUsd(Number(e.target.value));
              setValueOfCrypto(undefined);
            }}
          />
          <Flex w="50px" justifyContent="center">
            <Icon as={BsCurrencyDollar} w="30px" h="30px" />
          </Flex>
        </Flex>

        <Button
          borderRadius="full"
          size="lg"
          onClick={convert}
          bgColor={COLORS.blue}
          color={COLORS.white}
          w="200px"
          _hover={{ backgroundColor: COLORS.darkBlue }}
        >
          Convert
        </Button>
      </Flex>
    </Flex>
  );
};

export default Converter;
