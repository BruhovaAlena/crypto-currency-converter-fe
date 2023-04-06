import { formatUsd } from '../utils/usd';

export const formatUsdValue = (amountOfUsd: number) => {
  const formattedAmountOfUsd = formatUsd.format(amountOfUsd);
  const array = formattedAmountOfUsd.split(/\s+/);
  array.pop();
  return array.join(' ');
};
