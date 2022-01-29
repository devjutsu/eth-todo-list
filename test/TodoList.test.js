const { assert, AssertionError } = require("chai");

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

    it('list tasks', async() => {
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount);
        assert.equal(task.id.toNumber(), taskCount);
        assert.equal(task.content, 'Ensure state is written to blockchain');
        assert.equal(task.completed, false);
    });

    it('creates tasks', async() => {
        const result = await this.todoList.createTask('Test task');
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount);
        assert.equal(task.content, 'Test task');
        assert.equal(task.completed, false);
        // console.log(result);
    });

    it('toggles completion', async() => {
        const result = await this.todoList.toggleCompleted(1);
        const task = await this.todoList.tasks(1);
        assert.equal(task.id.toNumber(), 1);
        assert.equal(task.completed, true);
    });
});