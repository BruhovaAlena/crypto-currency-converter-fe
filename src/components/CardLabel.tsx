import { Flex, Text } from '@chakra-ui/react';
import { COLORS } from '../constants/colors';

type CardLabelProps = {
  text: string;
};

export const CardLabel = ({ text }: CardLabelProps) => {
  return (
    <Flex h="40px" alignItems="center" flex={1} px="8px">
      <Text color={COLORS.gray} fontWeight="semibold">
        {text}
      </Text>
    </Flex>
  );
};
