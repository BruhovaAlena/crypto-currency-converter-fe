import { Flex, Show } from '@chakra-ui/react';
import { getLatestConversions, getTotalConversions } from './utils/requests';
import './App.css';
import TotalAmount from './components/TotalAmount';
import Converter from './components/Converter';
import { LatestsConversions } from './components/LatestConversions';
import { useQuery } from '@tanstack/react-query';
import { COLORS } from './constants/colors';
import { MobileLatestConversions } from './components/MobileLatestConversions';

export type Latest = {
  id: string;
  date: string;
  amountOfUsd: number;
  amountOfCryptoCurrency: number;
  cryptoCurrency: string;
};

export type Total = {
  amountOfUsd: number;
  amountOfCryptoCurrency: number;
  name: string;
};

const CurrencyConverter = () => {
  const { data: latestConversions } = useQuery<Latest[]>({
    queryKey: ['latest'],
    queryFn: () => getLatestConversions(),
  });
  const { data: totalConversions } = useQuery<Total[]>({
    queryKey: ['total'],
    queryFn: () => getTotalConversions(),
  });

  const totalSumOfConversionsInUsd = totalConversions?.reduce(
    (acc, totalData) => {
      return acc + totalData.amountOfUsd;
    },
    0
  );

  return (
    <Flex justifyContent="center" h="100vh" mt="10px">
      <Flex flexDir="column" w={{ base: 'full', lg: '992px' }}>
        <Flex flexDir={{ base: 'column', lg: 'row' }}>
          <Converter />
          <Flex
            bgColor={COLORS.lightGray}
            w={{ lg: '1px', base: '100%' }}
            h={{ lg: '100%', base: '1px' }}
          />
          {totalConversions && totalSumOfConversionsInUsd && (
            <TotalAmount
              data={totalConversions}
              totalSumOfConversions={totalSumOfConversionsInUsd}
            />
          )}
        </Flex>
        {latestConversions && (
          <>
            <Show breakpoint="(min-width: 992px)">
              <Flex bgColor={COLORS.lightGray} h="1px" />
              <LatestsConversions data={latestConversions} />
            </Show>
            <Show breakpoint="(max-width: 991px)">
              <Flex bgColor={COLORS.lightGray} h="1px" />
              <MobileLatestConversions data={latestConversions} />
            </Show>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default CurrencyConverter;
