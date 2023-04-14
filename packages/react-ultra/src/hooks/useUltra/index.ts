import React from 'react';
import { type tUltraContext, UltraContext } from '../../contexts';

/**
 * A custom React Hook that provides access to the {@link tUltraContext}.
 *
 * @returns An object of type {@link tUltraContext}.
 * @category Hooks
 * @throws An error if used outside the {@link UltraContext}.
 */
const useUltra = (): tUltraContext => {
  const context = React.useContext(UltraContext);

  if (!context) {
    throw Error('useUltra must be used inside an UltraProvider');
  }

  return context;
};

export default useUltra;
