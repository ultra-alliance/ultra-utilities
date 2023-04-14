/**

tUseBreakPoint defines the type of object that is returned by the useBreakPoint hook.
It contains boolean properties indicating whether the current screen size matches each of the four breakpoint sizes: xs, sm, md, and lg.
@category Hooks
@property isXs - boolean indicating whether the current screen size matches the xs breakpoint size.
@property isSm - boolean indicating whether the current screen size matches the sm breakpoint size.
@property isMd - boolean indicating whether the current screen size matches the md breakpoint size.
@property isLg - boolean indicating whether the current screen size matches the lg breakpoint size.
*/
export type tUseBreakPoint = {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
};
