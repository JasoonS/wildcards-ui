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
type status;
[@bs.module "./depositTracking.js"]
external checkDepositStatus:
  (string, string, string, string) => Js.Promise.t(status) =
  "checkDepositStatus";
// userAccount,
// rootToken,
// depositAmount,
// childChainManagerProxy

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
          // let _ =
          //   doTest(
          //     library.provider,
          //     Ethers.makeProvider("https://rpc-mumbai.matic.today"),
          //     Config.Dai.getAddress(
          //       ~isForTestingEthMaticBridgeOnMatic=true,
          //       ~chain=Client.MainnetQuery,
          //       ~parentChainId=chainId,
          //       (),
          //     ),
          //     account,
          //   );
          Js.log3(account, library, chainId);
          // let _ =
          //   checkDepositStatus(
          //     "0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C",
          //     "0x47195A03fC3Fc2881D084e8Dc03bD19BE8474E46",
          //     "1000000000000000000",
          //     "0xb5505a6d998549090530911180f38aC5130101c6",
          //   )
          //   ->Js.Promise.then_(
          //       res => {
          //         Js.log2("a previous sync status", res)->Js.Promise.resolve
          //       },
          //       _,
          //     )
          //   ->Js.Promise.catch(
          //       err => {
          //         Js.log2("a previous sync status", err)->Js.Promise.resolve
          //       },
          //       _,
          //     );
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
