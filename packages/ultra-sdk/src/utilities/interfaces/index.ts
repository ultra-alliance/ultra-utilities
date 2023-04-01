export type tValidInput = string | number;

export type tCalcTotalPrice = {
  basePrice: tValidInput | undefined;
  balance: tValidInput;
};

export type tFormatCurrencyValue = {
  value: tValidInput | undefined;
  ticker?: string;
};

export type tFormatName = {
  name: string;
  num?: number;
};
