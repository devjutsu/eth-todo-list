
App = {
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
            console.log('Ethereum successfully detected!')

            const chainId = await App.provider.request({
              method: 'eth_chainId'
            });
            console.log("Chain id:" + chainId);

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            accounts.forEach(account => console.log(account));

          } else {
            console.error('Please install MetaMask!', error)
          }
    },

    loadAccount: async () => {
        
    },

    loadContract: async() => {

    },

    render: async() => {
        
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})