// istanbul ignore file

/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';
import { CURRENCIES, LANGUAGES } from '../../constants';
import { type tLocalisationContext } from '../types';
/**

LocalisationContext is a React context created using React.createContext.
The context provides the current base currency and base language, as well as functions to update the selected currency and language.
@category Context
*/
const LocalisationContext = React.createContext<tLocalisationContext>({
  baseCurrency: CURRENCIES[0],
  baseLanguage: LANGUAGES[0],

  /**

An empty function to update the language.
*/
  updateLanguage() {},
  /**

An empty function to update the currency.
*/
  updateCurrency() {},
});
export default LocalisationContext;
