// istanbul ignore file

/**
 * <img alt='' src='https://img.shields.io/badge/NOT PUBLISHED-100000?style=for-the-badge&logo=&logoColor=e57373&labelColor=FFFFFF&color=e57373'/>
 * @license MIT
 * @module ultradev
 * @description
 * Ultradev is a development environment for Ultra software.
 * It consists of different components for editing, compiling, debugging, and deploying your smart contracts and dApps on the UOS.
 *
 * The package make use of `ultratest` developed by the Ultra team.
 *
 * ## 📦 Installation
 *
 * This package is still in early development.
 *
 * To install it globally, you need to have `npm` installed and run the follwoing command in your terminal:
 *
 * ```shell
 * npm install -g @ultra-alliance/ultradev
 * ```
 *
 * Then to see a list of all available commands, run:
 * ```shell
 * $ ultradev --help
 *
 *             __    __
 *            /  |  /  |
 *  __    __  ᕫᕫ | _ᕫᕫ |_      ________   ________
 * /  |  /  | ᕫᕫ |/ ᕫᕫ   |    /        \ /        \
 * ᕫᕫ |  ᕫᕫ |ᕫᕫ |ᕫᕫᕫᕫᕫᕫ/  /ᕫᕫᕫᕫᕫᕫᕫ |ᕫᕫᕫᕫᕫᕫ |
 * ᕫᕫ |  ᕫᕫ |ᕫᕫ |  ᕫᕫ | __ ᕫᕫ |  ᕫᕫ/ /      ᕫᕫ |
 * ᕫᕫ \__ᕫᕫ |ᕫᕫ |  ᕫᕫ |/  |ᕫᕫ |      /ᕫᕫᕫᕫᕫᕫᕫ |
 * ᕫᕫ    ᕫᕫ/ ᕫᕫ |  ᕫᕫ  ᕫᕫ/ ᕫᕫ |     ᕫᕫ     ᕫᕫ |
 * ᕫᕫᕫᕫᕫᕫ/  ᕫᕫ/   ᕫᕫᕫᕫ/   ᕫᕫ/       ᕫᕫᕫᕫᕫᕫ/
 *
 * Usage: ultradev <command> [options]
 *
 *
 *   Version 0.0.1
 *
 *
 * Options:
 *  -V, --version       output the version number
 *  --help              Display help for command
 *
 * Commands:
 *  attach              Attach shell to the ultra dev container
 *  clean               Clean artifacts, cache, types etc
 *  close               Close the Ultra container
 *  compile             Compile the project smart contracts
 *  new                 Create a new Ultra project
 *  run <scripts/path>  Run a script to the configured chain
 *  start               Start the Ultra dev container
 *  test [options]      Run the tests for the project contracts
 *  typegen             Generate typescript typed services from abi
 *  help [command]      display help for command
 * ```
 *
 * ## ⚙️ Quick Start
 *
 * > **TIP**: If you are using Windows, we strongly recommend using `WSL 2` to follow this guide.
 *
 * We will explore the basics of creating a Ultra project with a sample contract, tests of that contract, and a script to interact with it.
 *
 * To create the sample project run (npx) `ultradev new` in your terminal and follow the instructions.
 *
 * ```shell
 * $ ultradev new
 *
 *             __    __
 *            /  |  /  |
 *  __    __  ᕫᕫ | _ᕫᕫ |_      ________   ________
 * /  |  /  | ᕫᕫ |/ ᕫᕫ   |    /        \ /        \
 * ᕫᕫ |  ᕫᕫ |ᕫᕫ |ᕫᕫᕫᕫᕫᕫ/  /ᕫᕫᕫᕫᕫᕫᕫ |ᕫᕫᕫᕫᕫᕫ |
 * ᕫᕫ |  ᕫᕫ |ᕫᕫ |  ᕫᕫ | __ ᕫᕫ |  ᕫᕫ/ /      ᕫᕫ |
 * ᕫᕫ \__ᕫᕫ |ᕫᕫ |  ᕫᕫ |/  |ᕫᕫ |      /ᕫᕫᕫᕫᕫᕫᕫ |
 * ᕫᕫ    ᕫᕫ/ ᕫᕫ |  ᕫᕫ  ᕫᕫ/ ᕫᕫ |     ᕫᕫ     ᕫᕫ |
 * ᕫᕫᕫᕫᕫᕫ/  ᕫᕫ/   ᕫᕫᕫᕫ/   ᕫᕫ/       ᕫᕫᕫᕫᕫᕫ/
 *
 *    Creating new Ultra project
 *
 * What do you want to do?
 * ❯ Create a smart-contract project
 * Create a client-side project
 * Create a server-side project
 * Quit
 * ```
 *
 * ##  🛠️ Compiling your contracts
 `
 * Next, if you take a look in the newly created project directory, you will see a `contracts` and `includes` directories, respectively containing `bank.cpp` and `bank.hpp`.
 *`
 * ```cpp
 * #include "../includes/bank.hpp"
 *
 * ACTION bank::withdraw(name withdrawer, asset quantity)
 * {
 *   require_auth(withdrawer);
 *
 *    auto owner_balance = balances.find(withdrawer.value);
 *    check(owner_balance != balances.end(), "No balance for owner");
 *    check(owner_balance->funds >= quantity, "Withdraw amount exceeds balance");
 *
 *    withdraw_funds(withdrawer, quantity);
 *
 *    action(permission_level{_self, "active"_n},
 *           "eosio.token"_n, "transfer"_n,
 *           std::make_tuple(get_self(), withdrawer, quantity, std::string("Bank Withdraw")))
 *        .send();
 * }
 *
 * void bank::on_transfer(name from, name to, asset quantity, string memo)
 * {
 *    if (to != get_self())
 *         return;
 *
 *    check(memo != "", "Memo cannot be empty");
 *
 *    validate_asset(quantity);
 *    deposit_funds(from, quantity);
 * }
 *
 * void bank::deposit_funds(name owner, asset value)
 * {
 *     auto owner_balance = balances.find(owner.value);
 *
 *     if (owner_balance == balances.end())
 *     {
 *         create_balance(owner, value);
 *     }
 *     else
 *     {
 *         incr_balance(owner_balance, value);
 *     }
 * }
 *
 * void bank::withdraw_funds(name owner, asset value)
 * {
 *     auto owner_balance = balances.find(owner.value);
 *     decr_balance(owner_balance, value);
 * }
 *
 * void bank::validate_asset(asset value)
 * {
 *     check(value.symbol == bank_symbol, "Only UOS tokens are accepted");
 *     check(value.amount > 0, "Amount must be greater than zero");
 * }
 *
 * void bank::create_balance(name owner, asset value)
 * {
 *     balances.emplace(get_self(), [&](auto &row)
 *                {
 *         row.owner = owner;
 *         row.funds = value; });
 * }
 *
 * void bank::incr_balance(t_balance_table::const_iterator balance, asset value)
 * {
 *     balances.modify(balance, get_self(), [&](auto &row)
 *                     { row.funds += value; });
 * }
 *
 * void bank::decr_balance(t_balance_table::const_iterator balance, asset value)
 * {
 *     check(balance->funds.amount >= value.amount, "Insufficient funds");
 *     balances.modify(balance, get_self(), [&](auto &row)
 *                     { row.funds -= value; });
 * }
 * ```
 *
 * ```cpp
 * #pragma once
 * #include <eosio/eosio.hpp>
 * #include <eosio/asset.hpp>
 * #include <eosio/symbol.hpp>
 *
 * using namespace eosio;
 * using namespace std;
 *
 * CONTRACT bank : public eosio::contract
 * {
 * public:
 *     using contract::contract;
 *
 *    bank(name receiver, name code, datastream<const char *> ds)
 *        : contract(receiver, code, ds), balances(receiver, receiver.value) {}
 *
 *    ACTION withdraw(name withdrawer, asset quantity);
 *    [[eosio::on_notify("eosio.token::transfer")]] void on_transfer(name from, name to, asset quantity, string memo);
 *
 * private:
 *     static constexpr symbol bank_symbol = symbol("UOS", 8);
 *
 *     TABLE t_balance
 *     {
 *         name owner;
 *         asset funds;
 *         uint64_t primary_key() const { return owner.value; }
 *     };
 *
 *     typedef eosio::multi_index<"balances"_n, t_balance> t_balance_table;
 *     t_balance_table balances;
 *
 *     void deposit_funds(name owner, asset value);
 *     void withdraw_funds(name owner, asset value);
 *     void validate_asset(asset value);
 *     void create_balance(name owner, asset value);
 *     void incr_balance(t_balance_table::const_iterator balance, asset value);
 *     void decr_balance(t_balance_table::const_iterator balance, asset value);
 * };
 * ```
 *
 * To compile it, simply run:
 *
 * ```shell
 * npx ultradev compile
 * ```
 *
 * If you created a typescript project, you can also run `npx ultradev typegen` to generate typescript types and classes for your contracts.
 *
 * ## 🧪 Testing your contracts
 *
 * Your project comes with tests that use a custom assert class to make testing easier.
 * If you take a look in the `tests/` directory, you will see a test file with naming `*.ultra_test.*`
 *
 * ```ts
 * import makeTest from "@ultra-alliance/ultradev/dist/esm/functions/makeTest";
 * import { Services } from "../typegen";
 *
 * module.exports = makeTest<unknown, Services>(
 *  {},
 *  ({ ultratest, getServices, getRequiredAccounts, assert }) => {
 *    const { common, keychain, endpoint } = ultratest;
 *    const accounts = getRequiredAccounts();
 *    const { bob, alice } = accounts;
 *    const { bank } = getServices();
 *
 *    const getBalanceByOwner = async (owner: string) => {
 *      const table = await bank.getBalancesTable({
 *        lowerBound: owner,
 *        upperBound: owner,
 *      });
 *      return table.rows[0];
 *    };
 *
 *    const getNumberOfBalanceCreated = async () => {
 *      const table = await bank.getBalancesTable({});
 *      return table.rows.length;
 *    };
 *
 *    return {
 *      "Logging involved accounts access keys:": async () => {
 *        console.log("\nACCOUNTS:\n");
 *        console.table(accounts);
 *      },
 *      "it should setup code permissions": async () => {
 *        await bank
 *          .connect({
 *            name: bank.name,
 *            privateKey: keychain.getPrivateKeyFromAccount(bank.name) || "",
 *          })
 *          .addUosPerm(bank.name);
 *        await bank.connect(bob).addUosPerm();
 *        await bank.connect(alice).addUosPerm();
 *        await common.sleep(1000);
 *      },
 *      "it should deposit funds successfully": async () => {
 *        await assert(() =>
 *          common.transfer(alice.name, bank.name, 10.0, "deposit")
 *        ).toTransfer.to(bank.name, 10, "it should have deposited 10 UOS");
 *      },
 *      "it should have added a bank account": async () => {
 *        const bankCount = await getNumberOfBalanceCreated();
 *        assert(bankCount).toBe.equal(1, "There should 1 balance in the table");
 *      },
 *      "it should withdraw funds successfully": async () => {
 *        await assert(() =>
 *          bank.withdraw({
 *            withdrawer: alice.name,
 *            quantity: "5.00000000 UOS",
 *          })
 *        ).toTransfer.between([bank.name, alice.name], [-5.0, 5.0]);
 *      },
 *
 *      "it should fail to withdraw more funds than available": async () => {
 *        await common.transactAssert(
 *          bank.withdrawRaw({
 *            withdrawer: alice.name,
 *            quantity: "100.00000000 UOS",
 *          }),
 *          "Withdraw amount exceeds balance"
 *        );
 *      },
 *      "it should fail to withdraw if no balance created": async () => {
 *       await common.transactAssert(
 *          bank.connect(bob).withdrawRaw({
 *            withdrawer: bob.name,
 *            quantity: "100.00000000 UOS",
 *          }),
 *          "No balance for owner"
 *        );
 *      },
 *     "it should process incoming transfers": async () => {
 *       await assert(() =>
 *         common.transfer(alice.name, bank.name, 10.0, "deposit")
 *       ).toTransfer.between([alice.name, bank.name], [-10.0, 10.0]);
 *     },
 *     "it should create a new balance for a new owner": async () => {
 *       const bankCount = await getNumberOfBalanceCreated();
 *       await common.transfer(bob.name, bank.name, 5.0, "deposit");
 *       const balanceCountAfter = (await bank.getBalancesTable({})).rows.length;
 *
 *        assert(balanceCountAfter).toBe.equal(
 *          bankCount + 1,
 *          "There should be one more balance in the table"
 *        );
 *
 *       const bobBalance = await getBalanceByOwner(bob.name);
 *        assert(bobBalance).toBe.notNull(
 *         "Bob should have a balance in the table"
 *        );
 *
 *        assert(bobBalance?.funds).toBe.equal(
 *          "5.00000000 UOS",
 *          "Bob should have 5 UOS"
 *       );
 *     },
 *     "it should increment existing balance successfully": async () => {
 *      const bankCount = await getNumberOfBalanceCreated();
 *        await common.sleep(1000);
 *       await common.transfer(bob.name, bank.name, 5.0, "deposit");
 *        const balancesCountAfter = (await bank.getBalancesTable({})).rows
 *         .length;
 *
 *        assert(bankCount).toBe.equal(
 *          balancesCountAfter,
 *          "There should be no new balances in the table"
 *       );
 *
 *       const bobBankBalanceAfter = await getBalanceByOwner(bob.name);
 *        assert(bobBankBalanceAfter?.funds).toBe.equal(
 *        "10.00000000 UOS",
 *         "Bob should have 10 UOS"
 *        );
 *     },
 *     "it should decrement balance successfully": async () => {
 *       await bank.withdraw({
 *          withdrawer: bob.name,
 *          quantity: "5.00000000 UOS",
 *        });
 *       await common.sleep(1000);
 *        const bobBankBalanceAfter = await getBalanceByOwner(bob.name);
 *        assert(bobBankBalanceAfter?.funds).toBe.equal(
 *          "5.00000000 UOS",
 *         "Bob should have 5 UOS"
 *        );
 *     },
 *     "it should fail to decrement balance below zero": async () => {
 *       await common.transactAssert(
 *         bank.withdrawRaw({
 *           withdrawer: bob.name,
 *           quantity: "10.00000000 UOS",
 *         }),
 *         "Withdraw amount exceeds balance"
 *       );
 *     },
 *   };
 *  }
 * );
 * ```
 *
 * You can run your tests with `npx ultradev test`, you can also add the flag `-D` or `--dont-close` to keep the node alive after running your tests:
 *
 * ```shell
 *  ✔ Cleaning up old testing files
 *  ✔ Creating testing wallet
 *  ✔ Starting EOSIO
 *   Running tests...
 *
 *
 *  Creating systemless snapshot
 *-------------------------------
 *  ✔  Creating systemless snapshot
 *
 *  Setting up EOSIO system
 *-------------------------------
 *  ✔  setup protocol features
 *  ✔  setting eosio.bios contract
 *  ✔  activating protocol features
 *  ✔  set basic chain contracts
 *  ✔  set ultra.eosio linkauth
 *  ✔  set system
 *  ✔  verify ram setup
 *  ✔  setup ultra
 *  ✔  organize eosio accounts permission structure
 *  ✔  organize ultra account permission structure
 *  ✔  init RAM sponsored tiers system
 *  ✔  initialize oracle
 *  ✔  organize ultra system accounts permission structure
 *  ✔  deploy the avatar contract
 *  ✔  set up faucet account
 *  ✔  set up faucet contract
 *  ✔  create and set ultra.tools contract
 *  ✔  add linkauth for ultra.corrid
 *  ✔  add custom account permissions and add linkauth
 *  ✔  create limited eosio.nftram account and gift 4 GB to it
 *  ✔  register taxes
 *  ✔  deploy ultra contract manager contract
 *
 *  Creating system snapshot
 *-------------------------------
 *  ✔  Creating system snapshot
 *
 *  Test
 *-------------------------------
 *  ✔  Logging involved accounts access keys:
 *ACCOUNTS:
 *
 * ┌─────────┬─────────┬───────────────────────────────────────────────────────┐
 * │ (index) │  name   │                      privateKey                       │
 * ├─────────┼─────────┼───────────────────────────────────────────────────────┤
 * │  alice  │ 'alice' │ '5J8rd3mhs8S7t6VWbjuyreCKi8wUzvV7GDEKxmF7d5hjTrvRUKS' │
 * │   bob   │  'bob'  │ '5J8rd3mhs8S7t6VWbjuyreCKi8wUzvV7GDEKxmEQpyX6C4Wr4Gu' │
 * └─────────┴─────────┴───────────────────────────────────────────────────────┘
 *   ✔  Logging involved accounts access keys:
 *   ✔  it should setup code permissions
 *   ✔  it should deposit funds successfully
 *   ✔  it should have added a bank account
 *   ✔  it should withdraw funds successfully
 *   ✔  it should fail to withdraw more funds than available
 *   ✔  it should fail to withdraw if no balance created
 *   ✔  it should process incoming transfers
 *   ✔  it should create a new balance for a new owner
 *   ✔  it should increment existing balance successfully
 *   ✔  it should decrement balance successfully
 *   ✔  it should fail to decrement balance below zero
 *
 * ✔ Killing EOSIO and cleaning up files
 * ```
 *
 * ## 📝 Running a script
 *
 * Inside the `scripts/` directory, you will find some examples of scripts that you can run.
 *
 * ```ts
 * import BankService from "../typegen/BankService";
 * import config from "../ultradev.config";
 * const { signer: alice } = config.network;
 *
 * (async () => {
 * const bank = new BankService({
 *   rpcEndpoint: config.network.rpcEndpoint,
 *   signer: alice,
 * });
 *
 *  const quantity = "100.00000000 UOS";
 *
 * console.log("DEPOSITING: ", quantity);
 *
 * await bank.transfer({
 *   from: alice.name,
 *   to: bank.name,
 *   quantity,
 *   memo: "deposit",
 * });
 *
 * const aliceFunds = (
 *   await bank.getBalancesTable({
 *     lowerBound: alice.name,
 *   })
 * ).rows[0].funds;
 *
 * console.log("ALICE FUNDS: ", aliceFunds);
 *})();
 * ```
 *
 * You can run it using `npx ultradev run`:
 *
 * ```shell
 * $ npx ultradev run scripts/deposit.ts
 *
 *             __    __
 *            /  |  /  |
 *  __    __  ᕫᕫ | _ᕫᕫ |_      ________   ________
 * /  |  /  | ᕫᕫ |/ ᕫᕫ   |    /        \ /        \
 * ᕫᕫ |  ᕫᕫ |ᕫᕫ |ᕫᕫᕫᕫᕫᕫ/  /ᕫᕫᕫᕫᕫᕫᕫ |ᕫᕫᕫᕫᕫᕫ |
 * ᕫᕫ |  ᕫᕫ |ᕫᕫ |  ᕫᕫ | __ ᕫᕫ |  ᕫᕫ/ /      ᕫᕫ |
 * ᕫᕫ \__ᕫᕫ |ᕫᕫ |  ᕫᕫ |/  |ᕫᕫ |      /ᕫᕫᕫᕫᕫᕫᕫ |
 * ᕫᕫ    ᕫᕫ/ ᕫᕫ |  ᕫᕫ  ᕫᕫ/ ᕫᕫ |     ᕫᕫ     ᕫᕫ |
 * ᕫᕫᕫᕫᕫᕫ/  ᕫᕫ/   ᕫᕫᕫᕫ/   ᕫᕫ/       ᕫᕫᕫᕫᕫᕫ/
 *
 * Running Scripts
 *
 * ✔ Chain already running
 *
 * scripts/deposit.ts
 *
 * DEPOSITING:  100.00000000 UOS
 * ALICE FUNDS:  1115.00000000 UOS
 *```
 *
 * Congrats! You have created a project and compiled, tested and deployed a smart contract.
 * Show us some love by starring our repository on GitHub!️
 */

export * from './types/cdt';
export { default as UltraService } from './services/UltraService';
export { default as BaseService } from './services/BaseService';
export { default as makeUltra } from './functions/makeUltra';
export { default as getServices } from './functions/getServices';
export { default as getSigners } from './functions/getSigners';
export { default as getUltraConfig } from './functions/getUltraConfig';
export { default as makeTest } from './functions/makeTest';
