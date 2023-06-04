import { type Signer, type SignerMap, type Keychain } from '../../types';

export function getServices(accounts: string[], keychain: Keychain) {
  const signers: Signer[] = [];
  for (const account of accounts) {
    const privKey = keychain.getPrivateKeyFromAccount(account);
    if (!privKey) {
      throw new Error(`Private key not generated for account ${account}`);
    }

    const signer: Signer = {
      name: account,
      privateKey: privKey,
    };
    signers.push(signer);
  }

  return signers.reduce((map: SignerMap, signer) => {
    map[signer.name] = signer;
    return map;
  }, {});
}

export default getServices;
