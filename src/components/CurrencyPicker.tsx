import { Flex, Box, Text } from '@chakra-ui/react';
import { COLORS } from '../constants/colors';
import { CRYPTO_NAMES } from '../constants/cryptoNames';

type CurrencyPickerProps = {
  onClickCurrency: (name: string) => void;
  selectedCurrency: string;
};

const CurrencyPicker = ({
  onClickCurrency,
  selectedCurrency,
}: CurrencyPickerProps) => {
  return (
    <Flex gap="10px">
      {CRYPTO_NAMES.map((name) => {
        const isSelected = name === selectedCurrency;
        return (
          <Box
            w="70px"
            h="40px"
            borderRadius="full"
            onClick={() => onClickCurrency(name)}
            borderColor={COLORS.blue}
            bgColor={isSelected ? COLORS.blue : COLORS.white}
            borderWidth="1px"
            cursor="pointer"
            _hover={{
              backgroundColor: COLORS.blue,
              textColor: COLORS.white,
            }}
            textColor={isSelected ? COLORS.white : COLORS.black}
          >
            <Text mt="5px" fontWeight="semibold" textAlign="center">
              {name}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default CurrencyPicker;
