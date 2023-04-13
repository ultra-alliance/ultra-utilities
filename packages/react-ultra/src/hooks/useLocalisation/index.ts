// istanbul ignore file

import React from 'react';
import { type tLocalisationContext, LocalisationContext } from '../../contexts';

const useLocalisation = (): tLocalisationContext => {
  const context = React.useContext(LocalisationContext);
  if (!context) {
    throw Error('useLocalisation must be used inside an LocalisationProvider');
  }

  return context;
};

export default useLocalisation;
