/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { type tExt, Account } from '../../../account';
import { Api } from '../../../apis';
import Ultra from './index';

declare global {
  interface Window {
    ultra: any;
  }
}

let window: Window;

jest.mock('../../../apis');
jest.mock('../../../account');

describe('Ultra class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window = {
      ultra: {
        async connect() {
          return Promise.resolve({
            status: 'success',
            data: {
              blockchainid: '',
              publicKey: '',
            },
          });
        },
      },
    } as unknown as Window;
  });

  it('should create an instance of Api and Account classes on constructor', () => {
    const ultra = new Ultra({
      bpApiEndpoint: 'https://api.com',
      extension: window?.ultra as tExt,
    });

    expect(ultra.api).toBeInstanceOf(Api);
    expect(ultra.account).toBeInstanceOf(Account);
  });
});
