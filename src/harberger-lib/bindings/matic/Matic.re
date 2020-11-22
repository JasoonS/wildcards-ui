// const MaticPOSClient = require("@maticnetwork/maticjs").MaticPOSClient;
// const config = require("./config");
// const HDWalletProvider = require("@truffle/hdwallet-provider");

// const getMaticPOSClient = () => {
//   return new MaticPOSClient({
//     network: "testnet", // optional, default is testnet
//     version: "mumbai", // optional, default is mumbai
//     parentProvider: new HDWalletProvider(
//       config.user.privateKey,
//       config.root.RPC
//     ),
//     maticProvider: new HDWalletProvider(
//       config.user.privateKey,
//       config.child.RPC
//     ),
//     posRootChainManager: config.root.POSRootChainManager,
//     posERC20Predicate: config.root.posERC20Predicate, // optional, required only if working with ERC20 tokens
//     parentDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
//     maticDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
//   });
// };
type t;
type initParams = {
  network: string, // optional, default is testnet
  // version: "mumbai", // optional, default is mumbai
  parentProvider: Web3.rawProvider,
  maticProvider: Web3.rawProvider,
  posRootChainManager: string,
  posERC20Predicate: string // optional, required only if working with ERC20 tokens
  //     parentDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
  // maticDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending t
};

[@bs.new] [@bs.module "@transak/transak-sdk"]
external new_: initParams => t = "default";

[@bs.send] external init: (t, unit) => unit = "init";

[@bs.module "./testMatic.js"]
external doTest:
  (Web3.rawProvider, Web3.rawProvider, string, string) => Js.Promise.t(unit) =
  "doTest";

module DaiToMaticConversion = {
  [@react.component]
  let make = () => {
    let web3Context = RootProvider.useWeb3React();
    let (daiBalanceMainnet, setDaiBalanceMainnet) = React.useState(_ => None);

    React.useEffect3(
      () => {
        switch (web3Context.account, web3Context.library, web3Context.chainId) {
        | (Some(account), Some(library), Some(chainId)) =>
          // let daiContract = Ethers.ERC20.make(account, library.provider);
          let _ =
            doTest(
              library.provider,
              Ethers.makeProvider("https://rpc-mumbai.matic.today"),
              Config.Dai.getAddress(
                ~isForTestingEthMaticBridgeOnMatic=true,
                ~chain=Client.MainnetQuery,
                ~parentChainId=chainId,
                (),
              ),
              account,
            );
          ();
        | _ => ()
        };
        None;
      },
      (web3Context.account, web3Context.library, web3Context.chainId),
    );

    <p> "Convert DAI on mainnet to matic"->React.string </p>;
  };
};
