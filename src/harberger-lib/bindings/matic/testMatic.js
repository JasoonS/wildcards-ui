import { MaticPOSClient } from "@maticnetwork/maticjs";

export const doTest = async (
  parentProvider,
  maticProvider,
  rootToken,
  account
) => {
  let from = account;
  const maticPOSClient = new MaticPOSClient({
    network: "testnet",
    version: "mumbai",
    parentProvider,
    maticProvider,
    // posRootChainManager: "0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74",
    // posERC20Predicate: "0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34",
  });

  console.log("ROOT TOKEN", rootToken);

  await maticPOSClient.approveERC20ForDeposit(
    rootToken,
    "5000000000000000000",
    {
      from,
    }
  );

  await maticPOSClient.depositERC20ForUser(
    rootToken,
    from,
    "123000000000000000",
    {
      from,
    }
  );
};
