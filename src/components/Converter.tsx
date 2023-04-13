import { Flex, Icon, Button, Text } from '@chakra-ui/react';
import { COLORS } from '../constants/colors';
import { BsCurrencyDollar } from 'react-icons/bs';
import CurrencyPicker from './CurrencyPicker';
import NumberInput from './NumberInput';
import { IconMapper, IconMapperKeys } from './TotalAmnoutOfCurrency';
import { useConverter } from '../hooks/useConverter';

const Converter = () => {
  const {
    convert,
    selectedCurrency,
    setSelectedCurrency,
    setValueOfCrypto,
    setValueOfUsd,
    valueOfCrypto,
    valueOfUsd,
  } = useConverter();
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
      <Text
        w={{ base: '250px', md: '300px' }}
        fontSize={{
          base: 'xl',
          md: '2xl',
        }}
        fontWeight="semibold"
        color={COLORS.black}
        textAlign="center"
      >
        Choose a Cryptocurrency and change it to USD
      </Text>
      <CurrencyPicker
        onClickCurrency={(name) => {
          setSelectedCurrency(name);
          setValueOfUsd(0);
        }}
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
