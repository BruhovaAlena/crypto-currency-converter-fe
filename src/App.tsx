import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { Currency, getCurrencyData } from './utils/requests';
import './App.css';
import { IoSwapHorizontalOutline } from 'react-icons/io5';

const CurrencyConverter = () => {
  const [firstCurrency, setFirstCurrency] = useState('');
  const [secondCurrency, setSecondCurrency] = useState('USD');
  const [result, setResult] = useState<Currency[] | undefined>(undefined);
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValueYouGet] = useState(0);

  useEffect(() => {
    const getData = async () => {
      await getCurrencyData({ onSuccess: (allData) => setResult(allData) });
    };
    getData();
  }, []);

  const first = result?.find((res) => res.name === firstCurrency);
  console.log('first', first);

  const convert = () => {
    if (first) {
      const lala = setSecondValueYouGet(firstValue * first.quote['USD'].price);
      return lala;
    }
  };

  return (
    <Flex flexDirection={'column'} bgColor={'green.500'} h="100vh">
      <Heading alignSelf="center" color="white" size="2xl" mt="15">
        Crypto-currency converter
      </Heading>
      <Flex
        borderRadius="10px"
        width="1000px"
        alignSelf="center"
        paddingY="10"
        backgroundColor={'whiteAlpha.800'}
        height="400"
        marginTop="10"
      >
        {' '}
        <Flex marginLeft="10" flexDirection={'column'}>
          <Text>You Have</Text>
          <NumberInput
            size={'lg'}
            value={firstValue}
            onChange={(val) => setFirstValue(Number(val))}
            defaultValue={0}
          >
            <NumberInputField />
          </NumberInput>
        </Flex>
        <Select
          placeholder="Select option"
          value={firstCurrency}
          onChange={(e) => setFirstCurrency(e.target.value)}
        >
          {result?.map((currency) => (
            <option value={currency.name}>{currency.name}</option>
          ))}
        </Select>
        <IconButton
          aria-label="swap"
          icon={<IoSwapHorizontalOutline height={20} width={200} />}
          size="lg"
          rounded="full"
        ></IconButton>
        <Flex flexDirection={'column'}>
          <Text>You Get</Text>
          <NumberInput
            variant="flushed"
            placeholder="Flushed"
            size={'lg'}
            defaultValue={0}
            value={secondValue}
            // onChange={(e) => setValueYouGet(Number(e))}
          >
            <NumberInputField />
          </NumberInput>
        </Flex>
        <Text marginRight="10">USD</Text>
        <VStack justifyContent={'center'} bgColor="red">
          <Button onClick={() => convert()}>Convert</Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default CurrencyConverter;
