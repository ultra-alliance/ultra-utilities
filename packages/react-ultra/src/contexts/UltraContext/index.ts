import React from 'react';
import { type tUltraContext } from '../types';

const UltraContext = React.createContext<null | tUltraContext>(null);

export default UltraContext;
