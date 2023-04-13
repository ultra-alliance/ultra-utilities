import React from 'react';
import { type tUltraContext, UltraContext } from '../../contexts';

const useUltra = (): tUltraContext => {
  const context = React.useContext(UltraContext);

  if (!context) {
    throw Error('useUltra must be used inside an UltraProvider');
  }

  return context;
};

export default useUltra;
