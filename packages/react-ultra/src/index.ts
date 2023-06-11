// istanbul ignore file

/**
 * <img alt='' src='https://img.shields.io/badge/NOT PUBLISHED-100000?style=for-the-badge&logo=&logoColor=e57373&labelColor=FFFFFF&color=e57373'/>
 * @license MIT
 * @module react-ultra
 * @description
 * React Ultra is a collection of React hooks and components for building
 * performant, scalable, and accessible applications connected to the UOS.
 *
 * The package wrap {@link ultra-sdk}
 *
 * ## ⚙️ Quick Start
 *
 * Make sure to have `react`, `react-dom`, `@ultra-alliance/ultra-sdk` installed as dependencies, then install `react-ultra`.
 *
 * In short:
 * ```shell
 * npm install react react-dom @ultra-alliance/ultra-sdk @ultra-alliance/react-ultra
 * ```
 *
 * Then wrap your app in a `<UltraProvider>`, and provide a `bpApiEndpoint` (default will be `DEFAULT_BP_API_ENDPOINT` from {@link ultra-sdk}):
 *
 * ```tsx
 * import { UltraProvider } from '@ultra-alliance/react-ultra';
 * import { DEFAULT_BP_API_ENDPOINT } from '@ultra-alliance/ultra-sdk';
 *
 * React.DOM.render(
 *  <UltraProvider bpApiEndpoint={DEFAULT_BP_API_ENDPOINT}>
 *    <App />
 *  </UltraProvider>,
 *  document.getElementById('root')
 * );
 * ```
 *
 * And call the hooks inside your app:
 *
 * ```tsx
 * import { useUltra } from '@ultra-alliance/react-ultra';
 *
 * const App = () => {
 *  const { account, isAuthenticated, login } = useUltra();
 *
 *  if (!isAuthenticated || !account) {
 *    return <button onClick={login}>Login</button>;
 *  }
 *
 *  return <div>UOS BALANCE: {account.data.core_liquid_balance}</div>;
 * };
 * ```
 *
 * ## 🚀 Usage
 *
 * ### Wrap your app in a {@link UltraProvider}
 *
 * In order to use the hooks, you need to wrap your app in a `<UltraProvider>`, and provide a `bpApiEndpoint` :
 *
 * ```tsx
 * <UltraProvider bpApiEndpoint='ANY_PUBLIC_ULTRA_ENDPOINT'>
 *    <App />
 * </UltraProvider>
 * ```
 *
 * This will provide the context to the hooks.
 *
 * Now you can use the hooks inside your app:
 *
 * - {@link useUltra} for account data and authentication.
 * - {@link useUltraQuery} for easily querying the UOS.
 * - {@link useLocalisation} for utils about languages and base currency.
 */

export * from './constants';
export * from './contexts';
export * from './hooks';
export * from './models';
export * from './providers';
// export * from './types';
