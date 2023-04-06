import { Flex } from '@chakra-ui/react';
import { format } from 'date-fns';
import { COLORS } from '../constants/colors';
import { CardLabel } from './CardLabel';
import { CardValue } from './CardValue';
import { formatTransactionNumber } from '../constants/transactionNumber';
import { CardAmountValue } from './CardAmountValue';

type LatestCardProps = {
  id: string;
  date: string;
  amountOfUsd: number;
  amountOfCryptoCurrency: number;
  cryptoCurrency: string;
};

const LatestCard = ({
  amountOfCryptoCurrency,
  amountOfUsd,
  cryptoCurrency,
  date,
  id,
}: LatestCardProps) => {
  return (
    <Flex
      borderWidth="1px"
      borderColor={COLORS.lightGray}
      h="160px"
      borderRadius="8px"
      flexDir="column"
      w="full"
      maxW={{ base: 'full', md: '45%' }}
    >
      <Flex h="full" flexDir="column">
        <Flex flex={1}>
          <CardLabel text="Transaction number" />
          <CardLabel text="Date" />
        </Flex>
        <Flex flex={1}>
          <CardValue value={formatTransactionNumber(id)} isHalfWidth />
          <CardValue
            value={format(new Date(date), 'dd MMM yyyy')}
            isHalfWidth
          />
        </Flex>
        <CardLabel text="Amount" />
        <CardAmountValue
          amountOfCryptoCurrency={amountOfCryptoCurrency}
          amountOfUsd={amountOfUsd}
          cryptoCurrency={cryptoCurrency}
        />
      </Flex>
    </Flex>
  );
};

export default LatestCard;
