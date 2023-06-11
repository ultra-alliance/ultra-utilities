// istanbul ignore file

/**
 * @beta
 * @file useBreakPoint
 * @category Hooks
 * @description A hook to get the current breakpoint of the screen size using MUI media query hook and return a boolean value for each breakpoint.
 * @author @ultra-alliance
 * @license MIT
 * @example
 * ```typescript
 * const { isXs, isSm, isMd, isLg } = useBreakPoint();
 *
 * if (isXs) {
 *  // do something
 * }
 * ```
 *
 */

import { useMediaQuery, type Theme } from '@mui/material';
import { type tUseBreakPoint } from '../types';

const useBreakPoint = (): tUseBreakPoint => {
  const isXs = useMediaQuery((theme: Theme) => theme?.breakpoints.down('xs'));
  const isSm = useMediaQuery((theme: Theme) => theme?.breakpoints.down('sm'));
  const isMd = useMediaQuery((theme: Theme) => theme?.breakpoints.down('md'));
  const isLg = useMediaQuery((theme: Theme) => theme?.breakpoints.down('lg'));

  return { isXs, isSm, isMd, isLg };
};

export default useBreakPoint;
