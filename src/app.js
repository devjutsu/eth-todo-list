App = {
    loading: false,
    contracts: {},

    load: async() => {
        console.log("app loading...");
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },

    loadWeb3: async() => {
        App.provider = await detectEthereumProvider();

        if (App.provider) {
            console.log('Ethereum OK!');
            const chainId = await App.provider.request({ method: 'eth_chainId' });
            console.log("Chain id:" + chainId);
        } else { console.error('Please install MetaMask!', error) }
    },

    loadAccount: async() => {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        accounts.forEach(account => console.log(account));
        App.account = accounts[0];
    },

    loadContract: async() => {
        const todoList = await $.getJSON('TodoList.json');
        console.log("got contract: " + todoList.contractName);
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(App.provider);

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed();
    },

    render: async() => {
        if (App.loading) {
            return;
        }

        App.setLoading(true);

        $('#account').html(App.account);

        await App.renderTasks();

        App.setLoading(false);
    },

    renderTasks: async() => {
        // Load the total task count from the blockchain
        const taskCount = await App.todoList.taskCount();
        const $taskTemplate = $('.taskTemplate');

        // Render out each task with a new task template
        for (var i = 1; i <= taskCount; i++) {
            // Fetch the task data from the blockchain
            const task = await App.todoList.tasks(i);
            const taskId = task[0].toNumber();
            const taskContent = task[1];
            const taskCompleted = task[2];

            // Create the html for the task
            const $newTaskTemplate = $taskTemplate.clone();
            $newTaskTemplate.find('.content').html(taskContent);
            $newTaskTemplate.find('input')
                .prop('name', taskId)
                .prop('checked', taskCompleted)
                .on('click', App.toggleCompleted)

            // Put the task in the correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate);
            } else {
                $('#taskList').append($newTaskTemplate);
            }

            // Show the task
            $newTaskTemplate.show();
        }
    },

    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $('#loader');
        const content = $('#content');
        if (boolean) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    },

    toggleCompleted: () => {
        console.log("toggle");
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})