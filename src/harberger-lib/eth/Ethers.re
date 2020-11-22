type txResult = {
  blockHash: string,
  blockNumber: int,
  byzantium: bool,
  confirmations: int,
  // contractAddress: null,
  // cumulativeGasUsed: Object { _hex: "0x26063", … },
  // events: Array(4) [ {…}, {…}, {…}, … ],
  from: Web3.ethAddress,
  // gasUsed: Object { _hex: "0x26063", … },
  // logs: Array(4) [ {…}, {…}, {…}, … ],
  // logsBloom: "0x00200000000000008000000000000000000020000001000000000000400020000000000000002000000000000000000000000002800010000000008000000000000000000000000000000008000000000040000000000000000000000000000000000000020000014000000000000800024000000000000000000010000000000000000000000000000000000000000000008000000000000000000000000200000008000000000000000000000000000000000800000000000000000000000000001002000000000000000000000000000000000000000020000000040020000000000000000080000000000000000000000000000000080000000000200000"
  status: int,
  _to: Web3.ethAddress,
  transactionHash: string,
  transactionIndex: int,
};
type txError = {
  code: int, // -32000 = always failing tx ;  4001 = Rejected by signer.
  message: string,
  stack: option(string),
};

type ethersBigNumber;

[@bs.module "ethers"] [@bs.scope "utils"]
external formatUnits: (ethersBigNumber, int) => string = "formatUnits";

[@bs.new] [@bs.module "ethers"] [@bs.scope "providers"]
external makeProvider: string => Web3.rawProvider = "JsonRpcProvider";

[@bs.send]
external waitForTransaction:
  (Web3.rawProvider, string) => Promise.Js.t(txResult, txError) =
  "waitForTransaction";

type ethersContract;
type abi = array(string);

[@bs.new] [@bs.module "ethers"]
external getContract:
  (Web3.ethAddress, abi, Web3.rawProvider) => ethersContract =
  "Contract";

module ERC20 = {
  type t;

  let abi = [|
    "function balanceOf(address) view returns (uint)",
    "function approve(address spender, uint amount)",
  |];

  let make = (address, provider): t => {
    getContract(address, abi, provider)->Obj.magic;
  };

  [@bs.send]
  external getBalance: (t, Web3.ethAddress) => Js.Promise.t(ethersBigNumber) =
    "getBalance";
};
