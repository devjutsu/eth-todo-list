# TodoList with ETH blockchain and solidity 
1. List tasks in the smart contract
2. List tasks in the console
3. LIst tasks in the client side app
4. List tasks in the test

***

prepare
```
npm install -g truffle@5.0.2
npm install web3
```

run
```
truffle compile
truffle migrate
truffle migrate --reset
truffle console
```
and then
```
list = await list.deployed()
taskCount = await list.taskCount()
taskCount.toNumber()
```

`npm run dev`