import React from 'react';
import useUltra from '../useUltra';

const useTransferUos = () => {
  const { ultra, account, refreshAccount } = useUltra();

  const [quantity, setQuantity] = React.useState<string | undefined>(undefined);
  const [to, setTo] = React.useState<string | undefined>(undefined);
  const [memo, setMemo] = React.useState<string | undefined>(undefined);

  const handleQuantityChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(event.target.value);
    },
    [],
  );

  const handleToChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTo(event.target.value);
    },
    [],
  );

  const handleMemoChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMemo(event.target.value);
    },
    [],
  );

  const transferUos = React.useCallback(async () => {
    if (!ultra || !account || !to || !quantity) {
      return;
    }

    await ultra.account.transferUos({
      quantity,
      to,
      memo,
    });

    await refreshAccount();
  }, [ultra, account, quantity, to, memo]);

  return {
    quantity,
    to,
    memo,
    handleQuantityChange,
    handleToChange,
    handleMemoChange,
    transferUos,
  };
};

export default useTransferUos;
