// const WebSocket = require("ws");
const Web3 = require("web3");

// For Mumbai
// const ws = new WebSocket(
//   "wss://rpc-mainnet.maticvigil.com/ws/v1/bc87ce81f2f4695f31857297dc5458c336833a78"
// );
const ws = new WebSocket("wss://ws-mumbai.matic.today/");
// For Matic mainnet: wss://ws-mainnet.matic.network/
const web3 = new Web3();
const abiCoder = web3.eth.abi;

export const checkDepositStatus = async (
  userAccount,
  rootToken,
  depositAmount,
  childChainManagerProxy
) => {
  return new Promise((resolve, reject) => {
    ws.addEventListener("open", () => {
      console.log("THE WEBSOCKET IS OPEN", {
        userAccount,
        rootToken,
        depositAmount,
        childChainManagerProxy,
      });
      ws.send(
        `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": ${childChainManagerProxy}}]}`
      );

      ws.addEventListener("message", (msg) => {
        console.log("WE HAVE A MESSAGE", msg);
        console.log("WE HAVE A MESSAGE", msg);
        console.log("WE HAVE A MESSAGE", msg);
        const parsedMsg = JSON.parse(msg);
        // const parsedMsg = JSON.parse(msg.data);
        if (
          parsedMsg &&
          parsedMsg.params &&
          parsedMsg.params.result &&
          parsedMsg.params.result.Data
        ) {
          const fullData = parsedMsg.params.result.Data;
          const { 0: syncType, 1: syncData } = abiCoder.decodeParameters(
            ["bytes32", "bytes"],
            fullData
          );

          // check if sync is of deposit type (keccak256("DEPOSIT"))
          const depositType =
            "0x87a7811f4bfedea3d341ad165680ae306b01aaeacc205d227629cf157dd9f821";
          if (syncType.toLowerCase() === depositType.toLowerCase()) {
            const {
              0: userAddress,
              1: rootTokenAddress,
              2: depositData,
            } = abiCoder.decodeParameters(
              ["address", "address", "bytes"],
              syncData
            );

            // depositData can be further decoded to get amount, tokenId etc. based on token type
            // For ERC20 tokens
            const { 0: amount } = abiCoder.decodeParameters(
              ["uint256"],
              depositData
            );
            if (
              userAddress.toLowerCase() === userAccount.toLowerCase() &&
              rootToken.toLowerCase() === rootTokenAddress.toLowerCase() &&
              depositAmount === amount
            ) {
              resolve(true);
            }
          }
        }
      });

      ws.addEventListener("error", () => {
        console.log("ERRORRRRR");
        reject(false);
      });

      ws.addEventListener("close", () => {
        console.log("CLOSED");
        reject(false);
      });
    });
  });
};

console.log("checking params");

// Param1 - user address
// Param2 - contract address on main chain
// Param3 - amount deposited on main chain
// Param4 - child chain manager proxy address (0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa for mainnet)
checkDepositStatus(
  "0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C",
  "0x47195A03fC3Fc2881D084e8Dc03bD19BE8474E46",
  "1000000000000000000",
  "0xb5505a6d998549090530911180f38aC5130101c6"
)
  .then((res) => {
    console.log("a previous sync status", res);
  })
  .catch((err) => {
    console.log("a previous sync status", err);
  });
