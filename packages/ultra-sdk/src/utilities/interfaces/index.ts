/**
 * Type definitions related to formatting and validation.
 *
 * @category Utilities
 */
export type tValidInput = string | number;

/**
 * Represents input for the `calcTotalPrice` function.
 *
 * @category Calculations
 */
export type tCalcTotalPrice = {
  /**
   * The base price of the item, if any.
   */
  basePrice?: tValidInput;
  /**
   * The current balance available to the user.
   */
  balance: tValidInput;
};

/**
 * Represents input for the `formatCurrencyValue` function.
 *
 * @category Formatters
 */
export type tFormatCurrencyValue = {
  /**
   * The value to format, if any.
   */
  value?: tValidInput;
  /**
   * The ticker symbol to use for the currency, if any.
   */
  ticker?: string;
};

/**
 * Represents input for the `formatName` function.
 *
 * @category Formatters
 */
export type tFormatName = {
  /**
   * The name to format.
   */
  name: string;
  /**
   * An optional number to append to the name.
   */
  num?: number;
};
