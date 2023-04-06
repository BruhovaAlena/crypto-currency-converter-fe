import { Flex, Text } from '@chakra-ui/react';
import { Latest } from '../App';
import { COLORS } from '../constants/colors';
import LatestCard from './LatestCard';

type MobileLatestConversionsProps = {
  data: Latest[];
};

export const MobileLatestConversions = ({
  data,
}: MobileLatestConversionsProps) => {
  return (
    <Flex
      paddingX="8px"
      gap="10px"
      flexDir="column"
      width="full"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="semibold" color={COLORS.black}>
        Latest conversions
      </Text>

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        gap="10px"
        flexWrap={{ md: 'wrap' }}
        justifyContent={'center'}
        w="full"
      >
        {data.map(
          ({
            amountOfCryptoCurrency,
            amountOfUsd,
            cryptoCurrency,
            date,
            id,
          }) => {
            return (
              <LatestCard
                amountOfCryptoCurrency={amountOfCryptoCurrency}
                amountOfUsd={amountOfUsd}
                cryptoCurrency={cryptoCurrency}
                date={date}
                id={id}
                key={id}
              />
            );
          }
        )}
      </Flex>
    </Flex>
  );
};
