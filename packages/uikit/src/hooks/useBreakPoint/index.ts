// istanbul ignore file

/**
 * @file useBreakPoint
 * @description useBreakPoint hook
 * @author @ultra-alliance
 * @license MIT
 * @version 1.0.0
 * @since 1.0.0
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
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return { isXs, isSm, isMd, isLg };
};

export default useBreakPoint;
