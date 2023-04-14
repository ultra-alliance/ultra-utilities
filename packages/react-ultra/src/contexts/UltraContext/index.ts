import React from 'react';
import { type tUltraContext } from '../types';

/**
 * `UltraContext` is a React context created using `React.createContext`. The context provides the `tUltraContext` object, which includes the `ultra`, `auth`, and `account` states, as well as functions to log in, log out, and update the BP API endpoint.
 *
 * @category Context
 * @returns An object of type `tUltraContext`.
 *
 */
const UltraContext = React.createContext<null | tUltraContext>(null);

export default UltraContext;
