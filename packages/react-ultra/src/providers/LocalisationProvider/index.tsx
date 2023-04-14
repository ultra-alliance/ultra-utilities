// istanbul ignore file

import React from 'react';
import { CURRENCIES, LANGUAGES } from '../../constants';
import { LocalisationContext } from '../../contexts';
import { type tCurrency, type tLanguage } from '../../models';
import { type tLocalisationProvider } from '../types';

/**
 * A custom React component that provides a `LocalisationContext` with `baseCurrency`, `baseLanguage`, `updateCurrency`, and `updateLanguage` properties.
 * This component is used inside the {@link UltraProvider} component.
 *
 * @category Providers
 * @param children - Child components to render.
 *
 * @returns A `LocalisationContext` provider.
 */

const LocalisationProvider = ({ children }: tLocalisationProvider) => {
  const [baseCurrency, setBaseCurrency] = React.useState(CURRENCIES[0]);
  const [baseLanguage, setBaseLanguage] = React.useState(LANGUAGES[0]);

  React.useEffect(() => {
    const currency = window.localStorage.getItem('baseCurrency');
    const language = window.localStorage.getItem('baseLanguage');
    if (currency) {
      setBaseCurrency(JSON.parse(currency) as tCurrency);
    }

    if (language) {
      setBaseLanguage(JSON.parse(language) as tLanguage);
    }
  }, []);

  const updateCurrency = (currency: tCurrency) => {
    setBaseCurrency(currency);
    window.localStorage.setItem('baseCurrency', JSON.stringify(currency));
  };

  const updateLanguage = (language: tLanguage) => {
    setBaseLanguage(language);
    window.localStorage.setItem('baseLanguage', JSON.stringify(language));
  };

  return (
    <LocalisationContext.Provider
      value={{
        baseCurrency,
        baseLanguage,
        updateCurrency,
        updateLanguage,
      }}
    >
      {children}
    </LocalisationContext.Provider>
  );
};

export default LocalisationProvider;
