// istanbul ignore file

/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { currencies, languages } from '../../constants';
import { type tLocalisationContext } from '../types';

const LocalisationContext = React.createContext<tLocalisationContext>({
  baseCurrency: currencies[0],
  baseLanguage: languages[0],
  updateLanguage() {},
  updateCurrency() {},
});

export default LocalisationContext;
