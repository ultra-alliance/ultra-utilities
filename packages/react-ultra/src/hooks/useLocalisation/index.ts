// istanbul ignore file

import React from 'react';
import { type tLocalisationContext, LocalisationContext } from '../../contexts';

/**
 * A custom React Hook that provides access to the `tLocalisationContext`.
 * @category Hooks
 * @returns An object of type `tLocalisationContext`.
 * @throws An error if used outside the `LocalisationProvider`.
 */
const useLocalisation = (): tLocalisationContext => {
  const context = React.useContext(LocalisationContext);
  if (!context) {
    throw Error('useLocalisation must be used inside an LocalisationProvider');
  }

  return context;
};

export default useLocalisation;
