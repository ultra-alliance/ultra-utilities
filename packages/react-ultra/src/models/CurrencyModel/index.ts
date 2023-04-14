// istanbul ignore file

/**
 * `tCurrency` is a type representing a currency. It includes an `id`, `name`, `symbol`, `ticker`, and `native` boolean property.
 *
 * @category Models
 */

type tCurrency = {
  id: number;
  name: string;
  symbol: string;
  ticker: string;
  native: boolean;
};

export default tCurrency;
