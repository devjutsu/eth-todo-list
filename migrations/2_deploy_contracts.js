const TodoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};
// todoList = TodoList.deployed()
// taskCount = await todoList.taskCount()
// taskCount.toNumber()