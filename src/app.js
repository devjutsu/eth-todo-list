
App = {
    loading: false,
    contracts: {},

    load: async () => {
        console.log("app loading...");
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },

    loadWeb3: async () => {
        App.provider = await detectEthereumProvider();

        if (App.provider) {
            console.log('Ethereum OK!')
            const chainId = await App.provider.request({ method: 'eth_chainId' });
            console.log("Chain id:" + chainId);
        } else { console.error('Please install MetaMask!', error) }
    },

    loadAccount: async () => {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        accounts.forEach(account => console.log(account));
        App.account = accounts[0];
    },

    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json')
        console.log("got contract: " + todoList.contractName);
        var test = TruffleContract(todoList)
        console.log(test);
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.provider)

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed()
    },

    render: async () => {
        if (App.loading) {
            return
        }

        App.setLoading(true)

        $('#account').html(App.account)

        await App.renderTasks()

        App.setLoading(false)
    },

    renderTasks: async () => {

    },
    
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
          loader.show()
          content.hide()
        } else {
          loader.hide()
          content.show()
        }
      }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})