import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiDogecoin } from 'react-icons/si';

import { formatUsd } from '../utils/usd';
import { Tether } from 'iconsax-react';
import { COLORS } from '../constants/colors';

export enum IconName {
  BTC = 'btc',
  ETH = 'eth',
  USDT = 'usdt',
  DOGE = 'doge',
}

type TotalAmountOfCurrency = {
  amountOfCurrency: number;
  amountOfUsd: number;
  nameOfCurrency: string;
  hasIcon: boolean;
  iconName: IconMapperKeys;
};

export type IconMapperKeys = keyof typeof IconMapper;

export const IconMapper = {
  BTC: { icon: FaBitcoin, color: COLORS.btc },
  ETH: { icon: FaEthereum, color: COLORS.eth },
  USDT: { icon: Tether, color: COLORS.usdt },
  DOGE: { icon: SiDogecoin, color: COLORS.doge },
};

const TotalAmnoutOfCurrency = ({
  amountOfCurrency,
  amountOfUsd,
  nameOfCurrency,
  hasIcon,
  iconName,
}: TotalAmountOfCurrency) => {
  const mappedIcon = IconMapper[iconName];
  return (
    <Flex gap="10px" alignItems="center" mb="20px">
      {hasIcon && (
        <Icon as={mappedIcon.icon} w="30px" h="30px" color={mappedIcon.color} />
      )}
      <Text>
        {amountOfCurrency} {nameOfCurrency}
      </Text>
      <Text>= {formatUsd.format(amountOfUsd)}</Text>
    </Flex>
  );
};

export default TotalAmnoutOfCurrency;
