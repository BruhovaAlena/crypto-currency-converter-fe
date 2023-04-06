import { Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Total } from '../App';
import { COLORS } from '../constants/colors';
import { formatUsd } from '../utils/usd';
import TotalAmnoutOfCurrency, { IconMapperKeys } from './TotalAmnoutOfCurrency';

type TotalConversionsProps = {
  data: Total[];
  totalSumOfConversions: number;
};

const TotalAmount = ({
  data,
  totalSumOfConversions,
}: TotalConversionsProps) => {
  const currentDate = new Date();

  return (
    <Flex
      flexDir="column"
      paddingY="20px"
      paddingX="40px"
      w={{ lg: '50%', base: '100%' }}
    >
      <Text fontWeight="semibold" color={COLORS.black} fontSize="1xl">
        Total Conversion Amount
      </Text>
      <Text
        fontWeight="semibold"
        fontSize={{
          base: '2xl',
          sm: '2xl',
          md: '4xl',
        }}
      >
        $ {formatUsd.format(totalSumOfConversions)}
      </Text>
      <Text color={COLORS.gray} mb="30px">
        {format(new Date(currentDate), 'dd MMM yyyy')}
      </Text>
      {data.map(({ amountOfCryptoCurrency, amountOfUsd, name }) => (
        <TotalAmnoutOfCurrency
          hasIcon={true}
          amountOfCurrency={amountOfCryptoCurrency}
          amountOfUsd={amountOfUsd}
          nameOfCurrency={name}
          iconName={name as IconMapperKeys}
        />
      ))}
    </Flex>
  );
};

export default TotalAmount;
