[@bs.val] [@bs.scope ("window", "location")]
external windowLocation: string = "origin";

module Transak = {
  let getConfig = (~chain, web3Context: RootProvider.web3reactContext) => {
    let (defaultCryptoCurrency, defaultNetwork) =
      switch (chain) {
      | Client.Neither
      | Client.MainnetQuery => ("ETH", "mainnet")
      | Client.MaticQuery => ("DAI", "matic")
      };
    let (environment, apiKey) =
      switch (web3Context.chainId) {
      | Some(1) => ("PRODUCTION", "e7f543f7-e12e-4257-ad04-682679f0404c")
      | Some(_)
      | None => ("STAGING", "e2c87df4-4d03-49a2-8b1c-899a8bcf13eb")
      };

    let transakConfig: Transak.initParams = {
      environment,
      apiKey,
      // apiKey: "e7f543f7-e12e-4257-ad04-682679f0404c",
      hostURL: windowLocation,
      defaultCryptoCurrency: Some(defaultCryptoCurrency),
      walletAddress: web3Context.account,
      defaultNetwork: Some(defaultNetwork),
      themeColor: Some("#6BAD3E"),
      exchangeScreenTitle: Some("Top up your balance for Wildcards"),
      isDisableCrypto: Some(true), // This could be interesting... Doesn't work unless other parameters are correct though.
      cryptoCurrencyCode: None,
      cryptoCurrencyList: None,
      networks: None,
      walletAddressesData: None,
      fiatCurrency: None, // TODO
      countryCode: None,
      fiatAmount: None,
      defaultFiatAmount: None,
      paymentMethod: None,
      defaultPaymentMethod: None,
      disablePaymentMethods: None,
      email: None,
      userData: None,
      partnerOrderId: None,
      partnerCustomerId: None,
      accessToken: None,
      redirectURL: None,
      disableWalletAddressForm: None,
      isAutoFillUserData: None,
      height: None,
      width: None,
      hideMenu: None,
      hideExchangeScreen: None,
      isFeeCalculationHidden: None,
    };

    transakConfig;
  };
};

module Dai = {
  // NOTE: The `isForTestingEthMaticBridgeOnMatic` is because when testing the bridge on goerli<->mumbai you need to use a different token than the test DAI used to purchase wildcards.
  let getAddress =
      (~isForTestingEthMaticBridgeOnMatic=false, ~chain, ~parentChainId, ()) => {
    switch (chain) {
    | Client.Neither
    | Client.MainnetQuery =>
      switch (parentChainId) {
      | 1
      | 137 => "0x6b175474e89094c44da98b954eedeac495271d0f" // https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f
      | 5
      | _ => "0x655f2166b0709cd575202630952d71e2bb0d61af" // Matic dummy ERC20: https://goerli.etherscan.io/token/0x655f2166b0709cd575202630952d71e2bb0d61af?a=0xd3cbce59318b2e570883719c8165f9390a12bdd6
      }
    | Client.MaticQuery =>
      switch (parentChainId) {
      | 1
      | 137 => "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" // https://explorer-mainnet.maticvigil.com/address/0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063/transactions
      | 42 => "0xba97BeC8d359D73c81D094421803D968A9FBf676" // TestDAI - goerli: https://goerli.etherscan.io/address/0xba97bec8d359d73c81d094421803d968a9fbf676
      | 5
      | _ =>
        isForTestingEthMaticBridgeOnMatic
          ? "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"  // Matic dummy ERC20: https://explorer-mumbai.maticvigil.com/tokens/0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1
          : "0xeb37A6dF956F1997085498aDd98b25a2f633d83F" // TestDAI Mumbai: https://explorer-mumbai.maticvigil.com/address/0xeb37A6dF956F1997085498aDd98b25a2f633d83F
      }
    };
  };
};
