export const formatTransactionNumber = (transactionNumber: string) => {
  const parts = transactionNumber.split('-');
  return `...${parts[3]}-${parts[4]}`;
};
