// istanbul ignore file

import { CHAINS, type tChain, BP_API_ENDPOINTS } from '../../..';

/**
 * Get the network type based on the provided API endpoint.
 * @param endpoint - The API endpoint to check.
 * @returns The corresponding network type.
 */

export default function getNetwork(endpoint: string): tChain {
  if (BP_API_ENDPOINTS.main.includes(endpoint)) {
    return CHAINS.MAINNET;
  }

  if (BP_API_ENDPOINTS.test.includes(endpoint)) {
    return CHAINS.TESTNET;
  }

  return CHAINS.LOCAL;
}
