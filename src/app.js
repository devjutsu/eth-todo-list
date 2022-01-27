App = {
    load: async () => {
        console.log("app loading...");
        await App.loadWeb3();
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please, connect to Metamask");
        }

        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                await ethereum.enable();
                web3.eth.sendTransaction({});
            } catch (error) {

            }
        }
        else if (window.web3) {
            App.web3Provider = web3.currentProvider;
            window.web3 = new Web3(web3.currentProvider);
            web3.eth.sendTransaction({});
        }
        else {
            console.log("Non-Etherium browser detected. Add Metamask or smth.");
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})