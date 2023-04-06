import { Flex, Text } from '@chakra-ui/react';

type CardValueProps = {
  value: string;
  isHalfWidth?: boolean;
};

export const CardValue = ({ value, isHalfWidth = false }: CardValueProps) => {
  return (
    <Flex
      h="40px"
      w={isHalfWidth ? '50%' : '100%'}
      alignItems="center"
      px="8px"
    >
      <Text isTruncated>{value}</Text>
    </Flex>
  );
};
