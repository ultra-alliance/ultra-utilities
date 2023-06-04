/* eslint-disable @typescript-eslint/no-explicit-any */

import { type UltraTest } from '../../types';

type ActionFunction = () => Promise<any>;

class AssertService {
  ultratest;
  constructor(ultratest: UltraTest) {
    this.ultratest = ultratest;
  }

  assert(val: any) {
    return {
      toBe: {
        existing: (errorMessage: string) => {
          this.ultratest.assert(val !== undefined, errorMessage);
        },
        notNull: (errorMessage: string) => {
          this.ultratest.assert(val !== null, errorMessage);
        },

        equal: (equal: any, errorMessage: string) => {
          this.ultratest.assert(val === equal, errorMessage);
        },
        positive: (errorMessage: string) => {
          this.ultratest.assert(val > 0, errorMessage);
        },
        negative: (errorMessage: string) => {
          this.ultratest.assert(val < 0, errorMessage);
        },
        greater: {
          than: (greaterThan: number, errorMessage: string) => {
            this.ultratest.assert(val > greaterThan, errorMessage);
          },
          thanOrEqual: (greaterThanOrEqual: number, errorMessage: string) => {
            this.ultratest.assert(val >= greaterThanOrEqual, errorMessage);
          },
        },
        less: {
          than: (lessThan: number, errorMessage: string) => {
            this.ultratest.assert(val < lessThan, errorMessage);
          },
          thanOrEqual: (lessThanOrEqual: number, errorMessage: string) => {
            this.ultratest.assert(val <= lessThanOrEqual, errorMessage);
          },
        },
        notEmpty: (errorMessage: string) => {
          this.ultratest.assert(val.length > 0, errorMessage);
        },
      },
      toChange: {
        balanceOf: async (account: string, errorMsg?: string) => {
          const { initialBalance, finalBalance } =
            await this.executeAndFetchBalance(account, val as ActionFunction);
          this.ultratest.assert(
            finalBalance !== initialBalance,
            errorMsg ??
              `Expected balance of ${account} to change, but it did not.`,
          );
        },
        positively: {
          balanceOf: async (account: string, errorMsg?: string) => {
            const { initialBalance, finalBalance } =
              await this.executeAndFetchBalance(account, val as ActionFunction);
            this.ultratest.assert(
              finalBalance > initialBalance,
              errorMsg ??
                `Expected balance of ${account} to increase, but it did not.`,
            );
          },
        },

        negatively: {
          balanceOf: async (account: string, errorMsg?: string) => {
            const { initialBalance, finalBalance } =
              await this.executeAndFetchBalance(account, val as ActionFunction);
            this.ultratest.assert(
              finalBalance < initialBalance,
              errorMsg ??
                `Expected balance of ${account} to decrease, but it did not.`,
            );
          },
        },
      },
      notToChange: {
        balanceOf: async (account: string, errorMsg?: string) => {
          const { initialBalance, finalBalance } =
            await this.executeAndFetchBalance(account, val as ActionFunction);
          this.ultratest.assert(
            finalBalance === initialBalance,
            errorMsg ??
              `Expected balance of ${account} to not change, but it did.`,
          );
        },
      },
      toTransfer: {
        to: async (account: string, amount: number, errorMsg?: string) => {
          const { initialBalance, finalBalance } =
            await this.executeAndFetchBalance(account, val as ActionFunction);
          this.ultratest.assert(
            finalBalance === initialBalance + amount,
            errorMsg ??
              `Expected balance of ${account} to increase by ${amount}, but it did not.`,
          );
        },
        from: async (account: string, amount: number, errorMsg?: string) => {
          const { initialBalance, finalBalance } =
            await this.executeAndFetchBalance(account, val as ActionFunction);
          this.ultratest.assert(
            finalBalance === initialBalance - amount,
            errorMsg ??
              `Expected balance of ${account} to decrease by ${amount}, but it did not.`,
          );
        },
        between: async (
          actors: [string, string],
          amounts: [number, number],
        ) => {
          const [sender, receiver] = actors;
          const [senderInitialBalance, receiverInitialBalance] =
            await Promise.all([
              this.getBalance(sender),
              this.getBalance(receiver),
            ]);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          await val();

          const [senderFinalBalance, receiverFinalBalance] = await Promise.all([
            this.getBalance(sender),
            this.getBalance(receiver),
          ]);

          this.balanceModified(
            senderInitialBalance,
            senderFinalBalance,
            amounts[0],
            `Expected balance of ${sender} to decreased by ${amounts[0]}, but it did not.`,
          );

          this.balanceModified(
            receiverInitialBalance,
            receiverFinalBalance,
            amounts[1],
            `Expected balance of ${receiver} to increased by ${amounts[1]}, but it did not.`,
          );
        },
      },
    };
  }

  private readonly executeAndFetchBalance = async (
    account: string,
    action: ActionFunction,
  ) => {
    const initialBalance = await this.ultratest.common.getBalance(account);
    await action();
    const finalBalance = await this.ultratest.common.getBalance(account);
    return { initialBalance, finalBalance };
  };

  private async getBalance(account: string) {
    const balance = await this.ultratest.common.getBalance(account);
    return balance;
  }

  private balanceModified(
    initialBalance: number,
    finalBalance: number,
    expectedChange: number,
    errorMessage: string,
  ) {
    this.ultratest.assert(
      finalBalance === initialBalance + expectedChange,
      errorMessage,
    );
  }
}

export default AssertService;
