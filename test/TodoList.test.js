const { assert } = require("chai");

const TodoList = artifacts.require('./TodoList.sol');

contract('TodoList', (accounts) => {
    before(async() => {
        this.todoList = await TodoList.deployed();
    });

    it('deploy successfully', async() => {
        const address = await this.todoList.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    });
});