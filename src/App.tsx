import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Select,
  Text,
  Icon,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { Currency, getCurrencyData } from './utils/requests';
import './App.css';
import {} from 'react-icons/io5';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const CurrencyConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [result, setResult] = useState<Currency[] | undefined>(undefined);
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValueYouGet] = useState(0);

  useEffect(() => {
    const getData = async () => {
      await getCurrencyData({ onSuccess: (allData) => setResult(allData) });
    };
    getData();
  }, []);

  const first = result?.find((res) => res.name === selectedCurrency);

  return (
    <Flex flexDirection={'column'} bgColor={'green.500'} h="100vh">
      <Heading
        alignSelf="center"
        color="white"
        size="2xl"
        mt="15"
        marginTop="10"
      >
        Crypto-currency converter
      </Heading>
      <Flex
        borderRadius="10px"
        width="1000px"
        alignSelf="center"
        paddingY="10"
        backgroundColor={'whiteAlpha.800'}
        height="200"
        marginTop="10"
        flexDirection={'column'}
      >
        <Flex marginTop="5">
          <NumberInput
            marginLeft="10"
            isDisabled={!selectedCurrency}
            variant={'filled'}
            size={'lg'}
            value={firstValue}
            onChange={(val) => {
              setFirstValue(Number(val));
              if (first) {
                const firstResult = setSecondValueYouGet(
                  Number(val) * first.quote['USD'].price
                );
                const roundFirstResult =
                  Math.round(Number(firstResult) * 100) / 100;
                return roundFirstResult;
              }
            }}
            defaultValue={0}
          >
            <NumberInputField />
          </NumberInput>
          <Flex flexDir={'column'} marginX="5">
            <Select
              size="lg"
              placeholder="Select crypto currency"
              value={selectedCurrency}
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
              }}
              width="2xs"
              variant="filled"
            >
              {result?.map((currency) => (
                <option value={currency.name}>{currency.name}</option>
              ))}
            </Select>
            <Flex marginTop="2">
              <Icon as={AiOutlineInfoCircle} marginTop="1" marginRight="1" />
              <Text>You need to choose crypto currency</Text>
            </Flex>
          </Flex>

          <Flex flexDirection={'column'}>
            <NumberInput
              isDisabled={!selectedCurrency}
              variant={'filled'}
              size={'lg'}
              defaultValue={0}
              value={secondValue}
              onChange={(val) => {
                setSecondValueYouGet(Number(val));
                if (first) {
                  const secondResult = setFirstValue(
                    Number(val) / first.quote['USD'].price
                  );
                  const roundSecondResult =
                    Math.round(Number(secondResult) * 100) / 100;
                  return roundSecondResult;
                }
              }}
            >
              <NumberInputField />
            </NumberInput>
          </Flex>
          <Text marginRight="10" marginTop="2" fontSize="2xl" marginLeft="5">
            USD
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CurrencyConverter;
