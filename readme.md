# TodoList with ETH blockchain and solidity 
1. List tasks in the smart contract
2. List tasks in the console
3. LIst tasks in the client side app
4. List tasks in the test

***

run
```
truffle compile
truffle migrate
truffle console
```
and then
```
list = await list.deployed()
taskCount = await list.taskCount()
taskCount.toNumber()
```