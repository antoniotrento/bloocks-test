let handleEthSendTransaction = (e) => {
    let value = web3.utils.toWei(getInputValue(e, 'value'), 'ether');
    let to = getInputValue(e, 'to');
    web3.eth.sendTransaction({
      from: placeholderAddress,
      to: to,
      value: value
    }).once('transactionHash', (txnHash) => {
      console.log(txnHash);
    });
  };
  
  let handlePersonalSign = (e) => {
    let message = getInputValue(e, 'message');
    web3.eth.getAccounts((err, accounts) => {
      if (err) return console.error(err);
      var from = accounts[0];
      var params = [message, from];
      var method = 'personal_sign';
      web3.currentProvider.sendAsync({
        id: 1,
        method,
        params,
        from,
      }, (err, result) => {
        if (err) return console.error(err);
        if (result.error) return console.error(result.error);
        console.log(result);
      })
    });
  };
  
  let handleSignTypedData = (e) => {
    let json = getJsonValue(e);
    web3.eth.getAccounts((err, accounts) => {
      if (err) return console.error(err);
      var from = accounts[0];
      var params = [json, from];
      var method = 'eth_signTypedData';
      web3.currentProvider.sendAsync({
        id: 1,
        method,
        params,
        from,
      }, (err, result) => {
        if (err) return console.error(err);
        if (result.error) return console.error(result.error);
        console.log(result);
      })
    });
  };
  
  let handleGetAccounts = () => {
    web3.eth.getAccounts().then(console.log);
  }
  
  let handleGetCoinbase = () => {
    web3.eth.getCoinbase().then(console.log);
  }
  
  let handleProviderEnable = () => {
    web3.currentProvider.enable().then(console.log);
  }
  
  let handleLogoutUser = () => {
    fm.user.logout();
  }
  
  let handleERC20Transfer = (e) => {
    let value = getInputValue(e, 'value');
    let to = getInputValue(e, 'to');
    let contractAddress = getInputValue(e, 'contract-address');
    let erc20Contract = new web3.eth.Contract(erc20ContractAbi, contractAddress);
    erc20Contract.methods.decimals().call().then((decimals) => {
      // Calculate contract compatible value for transfer with proper decimal points using BigNumber
      let calculatedValue = calculateHexValue(value, decimals, web3.utils.BN);
      erc20Contract
          .methods
          .transfer(to, calculatedValue)
          .send({ from: placeholderAddress }, (err, txnHash) => {
          console.log(err);
          console.log(txnHash);
      });
    });
  };
  
  let handleERC20Approve = (e) => {
    let amount = getInputValue(e, 'amount');
    let address = getInputValue(e, 'address');
    let contractAddress = getInputValue(e, 'contract-address');
    let erc20Contract = new web3.eth.Contract(erc20ContractAbi, contractAddress);
    erc20Contract.methods.decimals().call().then((decimals) => {
      // Calculate contract compatible value for transfer with proper decimal points using BigNumber
      let calculatedValue = calculateHexValue(amount, decimals, web3.utils.BN);
      erc20Contract
          .methods
          .approve(address, calculatedValue)
          .send({ from: placeholderAddress }, (err, txnHash) => {
          console.log(err);
          console.log(txnHash);
      });
    });
  };
  
  let handleERC20TransferFrom = (e) => {
    let value = getInputValue(e, 'value');
    let from = getInputValue(e, 'from');
    let to = getInputValue(e, 'to');
    let contractAddress = getInputValue(e, 'contract-address');
    let erc20Contract = new web3.eth.Contract(erc20ContractAbi, contractAddress);
    erc20Contract.methods.decimals().call().then((decimals) => {
      // Calculate contract compatible value for transfer with proper decimal points using BigNumber
      web3.eth.getAccounts().then((accounts) => {
        let calculatedValue = calculateHexValue(value, decimals, web3.utils.BN);
        erc20Contract
            .methods
            .transferFrom(from, to, calculatedValue)
            .send({ from: accounts[0] }, (err, txnHash) => {
            console.log(err);
            console.log(txnHash);
        });
      });
    });
  };
  
  let handleComposeTransaction = (e) => {
    let value = getInputValue(e, 'value');
    let to = getInputValue(e, 'to');
    let param = {};
    if (value) {
      param.amount = value;
    }
    if (to) {
      param.to = to;
    }
    fm.transactions.send(param, (err, result) => {
      console.log(err);
      console.log(result);
    })
  };
  
  const handleDeposit = () => {
    fm.user.deposit()
  }