import { Flex, Text } from '@chakra-ui/react';
import { formatUsdValue } from '../constants/formatUsdValue';

type CardAmountValueProps = {
  amountOfUsd: number;
  amountOfCryptoCurrency: number;
  cryptoCurrency: string;
};

export const CardAmountValue = ({
  amountOfCryptoCurrency,
  amountOfUsd,
  cryptoCurrency,
}: CardAmountValueProps) => {
  return (
    <Flex px="8px" h="40px" alignItems="center" gap="8px">
      <Text noOfLines={1} flex={1}>
        {amountOfCryptoCurrency} {cryptoCurrency}
      </Text>
      <Text>-</Text>
      <Text noOfLines={1} flex={1}>
        USD {formatUsdValue(amountOfUsd)}
      </Text>
    </Flex>
  );
};
