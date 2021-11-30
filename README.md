# blockchain-developer-bootcamp-final-project
Final project for the Ethereum developer bootcamp 2021


I originally posted an idea but when it came time to develop I changed my mind. The new idea I came up with is called Zoodle Clicker Dapp. This is a simple blockchain game. The user will use a clicker to accumulate Zoodle. A smart contract will be in charge of storing the users progress on chain. Everyitme a user wants to purchase an upgrade, it is logged in the blockchain. If a user wants to save or load their progress it is also logged in the blockchain. This allows the user to save their data, close out the tab and load back up their progress at a new point in time.

FRONTEND ACCESS:

Link --> https://alexpowmow.github.io/blockchain-developer-bootcamp-final-project/


Project directory:

build/contracts -- contains Migrations and TestContract Contracts in JSON form

contracts -- contains Migrations and TestContract Contracts in solidity

css -- twitter bootstrap css import

images -- contains images i used for the front end

js -- twitter bootstrap javascript import

migrations -- contrains migration files for Migration and TestContract contracts

test -- contains the unit testing file for TestContract

dap.css -- CSS file i created for my webpage

dapp.js -- Javascript file I created for my webpage

index.html -- HTML file I created for my webpage

PUBLIC ETH ADDRESS: 0xae735A27c9c3297154A0A53cC397b6a18a4c4617

Dependencies needed to be installed in order:
npm install -g truffle (if not already installed)
npm init
npm install dotenv
npm install @openzeppelin/contracts
npm install @truffle/hdwallet-provider

No need to access a server

UNIT TESTS --> Unit tests can be run using truffle test on 8545

MIGRATION --> contract can be migrated using truffle migrate --network ropsten --reset