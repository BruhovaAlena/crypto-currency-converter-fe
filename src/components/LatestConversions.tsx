import { Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Latest } from '../App';
import { COLORS } from '../constants/colors';
import { formatTransactionNumber } from '../constants/transactionNumber';
import { formatUsdValue } from '../constants/formatUsdValue';

type LatestConversionsProps = {
  data: Latest[];
};

export const LatestsConversions = ({ data }: LatestConversionsProps) => {
  return (
    <Flex
      flexDir="column"
      paddingY="20px"
      paddingX="40px"
      gap="10px"
      w="full"
      justifyContent="center"
    >
      <Text fontSize="2xl" fontWeight="semibold" color={COLORS.black}>
        Latest conversions
      </Text>

      <Flex flexDir="column">
        <Flex gap="20px" pl="8px">
          <Text color={COLORS.blue} fontWeight="semibold" w="30%">
            Transaction number
          </Text>
          <Text color={COLORS.blue} fontWeight="semibold" w="25%">
            Date
          </Text>
          <Text color={COLORS.blue} fontWeight="semibold" w="45%">
            Amount
          </Text>
        </Flex>
        {data.length !== 0 && <Flex bgColor={COLORS.lightGray} h="1px" />}

        {data.map(
          (
            { id, date, amountOfCryptoCurrency, amountOfUsd, cryptoCurrency },
            index
          ) => {
            const isEven = (index + 1) % 2 === 0;
            return (
              <>
                <Flex
                  flexDir="row"
                  alignItems="center"
                  gap="10px"
                  key={id}
                  bgColor={isEven ? COLORS.grayBg : COLORS.white}
                  h="40px"
                  pl="8px"
                >
                  <Text w="30%">{formatTransactionNumber(id)}</Text>
                  <Text w="25%">{format(new Date(date), 'dd MMM yyyy')}</Text>
                  <Flex flexDir="row" alignItems="center" gap="10px" w="40%">
                    <Text noOfLines={1} flex={1}>
                      {amountOfCryptoCurrency} {cryptoCurrency}
                    </Text>
                    <Text>-</Text>
                    <Text noOfLines={1} flex={1}>
                      USD {formatUsdValue(amountOfUsd)}
                    </Text>
                  </Flex>
                </Flex>
                <Flex bgColor={COLORS.lightGray} h="1px" />
              </>
            );
          }
        )}
      </Flex>
    </Flex>
  );
};
