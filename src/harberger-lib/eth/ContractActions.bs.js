// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as BnJs from "bn.js";
import * as React from "react";
import * as Ethers from "ethers";
import * as $$Promise from "reason-promise/src/js/promise.js";
import * as Belt_Int from "bs-platform/lib/es6/belt_Int.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Async$WildCards from "../Async.bs.js";
import * as Core from "@web3-react/core";
import * as Globals$WildCards from "../Globals.bs.js";
import * as TokenId$WildCards from "../TokenId.bs.js";
import * as RootProvider$WildCards from "../RootProvider.bs.js";
import * as LoyaltyTokenJson from "./abi/loyaltyToken.json";
import * as VoteContractJson from "./abi/voteContract.json";

function getProviderOrSigner(library, account, isGsn) {
  if (account !== undefined) {
    return library.getSigner(account);
  } else {
    return library;
  }
}

var voteContract = VoteContractJson.voteContract;

var loyaltyTokenAbi = LoyaltyTokenJson.loyaltyToken;

function getExchangeContract(stewardAddress, stewardAbi, library, account, isGsn) {
  return new Ethers.Contract(stewardAddress, stewardAbi, getProviderOrSigner(library, account, isGsn));
}

function getLoyaltyTokenContract(stewardAddress, library, account, isGsn) {
  return new Ethers.Contract(stewardAddress, loyaltyTokenAbi, getProviderOrSigner(library, account, isGsn));
}

function getVotingContract(stewardAddress, library, account, isGsn) {
  return new Ethers.Contract(stewardAddress, voteContract, getProviderOrSigner(library, account, isGsn));
}

var stewardAddressMainnet = "0x6D47CF86F6A490c6410fC082Fd1Ad29CF61492d0";

var stewardAddressGoerli = "0x0C00CFE8EbB34fE7C31d4915a43Cde211e9F0F3B";

var stewardAddressRinkeby = "0x229Cb219F056A9097b2744594Bc37597380854E8";

var loyaltyTokenAddressMainnet = "0x773c75c2277eD3e402BDEfd28Ec3b51A3AfbD8a4";

var loyaltyTokenAddressGoerli = "0xd7d8c42ab5b83aa3d4114e5297989dc27bdfb715";

var voteContractMainnet = "0x03e051b7e42480Cc9D54F1caB525D2Fea2cF4d83";

var voteContractGoerli = "0x316C5f8867B21923db8A0Bd6890A6BFE0Ab6F9d2";

function useStewardAbi(param) {
  var abi = RootProvider$WildCards.useStewardAbi(undefined);
  if (abi !== undefined) {
    return Caml_option.valFromOption(abi);
  } else {
    return (require("./abi/steward.json").stewardAbi);
  }
}

function defaultStewardAddressFromChainId(param) {
  switch (param) {
    case 1 :
        return stewardAddressMainnet;
    case 2 :
    case 3 :
        return ;
    case 4 :
        return stewardAddressRinkeby;
    case 5 :
        return stewardAddressGoerli;
    default:
      return ;
  }
}

function useStewardAddress(param) {
  var externallySetAddress = RootProvider$WildCards.useStewardContractAddress(undefined);
  return (function (chainId) {
      return Belt_Option.mapWithDefault(externallySetAddress, defaultStewardAddressFromChainId(chainId), (function (a) {
                    return a;
                  }));
    });
}

function loyaltyTokenAddressFromChainId(param) {
  if (param !== 1) {
    if (param !== 5) {
      return ;
    } else {
      return loyaltyTokenAddressGoerli;
    }
  } else {
    return loyaltyTokenAddressMainnet;
  }
}

function voteAddressFromChainId(param) {
  if (param !== 1) {
    if (param !== 5) {
      return ;
    } else {
      return voteContractGoerli;
    }
  } else {
    return voteContractMainnet;
  }
}

function useStewardContract(isGsn) {
  var context = Core.useWeb3React();
  var stewardContractAddress = useStewardAddress(undefined);
  var stewardAbi = useStewardAbi(undefined);
  return React.useMemo((function () {
                var match = context.library;
                var match$1 = context.chainId;
                if (match !== undefined && match$1 !== undefined) {
                  return Globals$WildCards.oMap(Curry._1(stewardContractAddress, match$1), (function (__x) {
                                return getExchangeContract(__x, stewardAbi, match, context.account, isGsn);
                              }));
                }
                
              }), /* tuple */[
              context.library,
              context.account,
              context.chainId
            ]);
}

function useLoyaltyTokenContract(isGsn) {
  var context = Core.useWeb3React();
  return React.useMemo((function () {
                var match = context.library;
                var match$1 = context.chainId;
                if (match !== undefined && match$1 !== undefined) {
                  return Globals$WildCards.oMap(loyaltyTokenAddressFromChainId(match$1), (function (__x) {
                                return getLoyaltyTokenContract(__x, match, context.account, isGsn);
                              }));
                }
                
              }), /* tuple */[
              context.library,
              context.account,
              context.chainId
            ]);
}

function useVoteContract(isGsn) {
  var context = Core.useWeb3React();
  return React.useMemo((function () {
                var match = context.library;
                var match$1 = context.chainId;
                if (match !== undefined && match$1 !== undefined) {
                  return Globals$WildCards.oMap(voteAddressFromChainId(match$1), (function (__x) {
                                return getVotingContract(__x, match, context.account, isGsn);
                              }));
                }
                
              }), /* tuple */[
              context.library,
              context.account,
              context.chainId
            ]);
}

function useBuy(animal, isGsn) {
  var animalId = TokenId$WildCards.toString(animal);
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optSteward = useStewardContract(isGsn);
  return /* tuple */[
          (function (newPrice, oldPrice, wildcardsPercentage, value) {
              var newPriceEncoded = Ethers.utils.parseUnits(newPrice, 18);
              var value$1 = Ethers.utils.parseUnits(value, 0);
              var oldPriceParsed = Ethers.utils.parseUnits(oldPrice, 0);
              Curry._1(setTxState, (function (param) {
                      return /* Created */1;
                    }));
              if (optSteward === undefined) {
                return ;
              }
              var buyPromise = $$Promise.Js.toResult(optSteward.buy(animalId, newPriceEncoded, oldPriceParsed, wildcardsPercentage, {
                        value: value$1
                      }));
              $$Promise.getOk(buyPromise, (function (tx) {
                      Curry._1(setTxState, (function (param) {
                              return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                            }));
                      var txMinedPromise = $$Promise.Js.toResult(tx.wait());
                      $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                              console.log(txOutcome);
                              return Curry._1(setTxState, (function (param) {
                                            return /* Complete */Block.__(2, [txOutcome]);
                                          }));
                            }));
                      $$Promise.getError(txMinedPromise, (function (error) {
                              Curry._1(setTxState, (function (param) {
                                      return /* Failed */2;
                                    }));
                              console.log(error);
                              
                            }));
                      
                    }));
              $$Promise.getError(buyPromise, (function (error) {
                      return Curry._1(setTxState, (function (param) {
                                    return /* Declined */Block.__(1, [error.message]);
                                  }));
                    }));
              
            }),
          match[0]
        ];
}

function useBuyAuction(animal, isGsn) {
  var animalId = TokenId$WildCards.toString(animal);
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optSteward = useStewardContract(isGsn);
  return /* tuple */[
          (function (newPrice, wildcardsPercentage, value) {
              var newPriceEncoded = Ethers.utils.parseUnits(newPrice, 18);
              var value$1 = Ethers.utils.parseUnits(value, 0);
              Curry._1(setTxState, (function (param) {
                      return /* Created */1;
                    }));
              if (optSteward === undefined) {
                return ;
              }
              var buyPromise = $$Promise.Js.toResult(optSteward.buyAuction(animalId, newPriceEncoded, wildcardsPercentage, {
                        value: value$1
                      }));
              $$Promise.getOk(buyPromise, (function (tx) {
                      Curry._1(setTxState, (function (param) {
                              return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                            }));
                      var txMinedPromise = $$Promise.Js.toResult(tx.wait());
                      $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                              console.log(txOutcome);
                              return Curry._1(setTxState, (function (param) {
                                            return /* Complete */Block.__(2, [txOutcome]);
                                          }));
                            }));
                      $$Promise.getError(txMinedPromise, (function (error) {
                              Curry._1(setTxState, (function (param) {
                                      return /* Failed */2;
                                    }));
                              console.log(error);
                              
                            }));
                      
                    }));
              $$Promise.getError(buyPromise, (function (error) {
                      return Curry._1(setTxState, (function (param) {
                                    return /* Declined */Block.__(1, [error.message]);
                                  }));
                    }));
              
            }),
          match[0]
        ];
}

function useRedeemLoyaltyTokens(animalId, isGsn) {
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optSteward = useStewardContract(isGsn);
  var buyFunction = function (param) {
    var value = Ethers.utils.parseUnits("0", 0);
    Curry._1(setTxState, (function (param) {
            return /* Created */1;
          }));
    if (optSteward === undefined) {
      return ;
    }
    var claimLoyaltyTokenPromise = $$Promise.Js.toResult(optSteward._collectPatronage(animalId, {
              value: value
            }));
    $$Promise.getOk(claimLoyaltyTokenPromise, (function (tx) {
            Curry._1(setTxState, (function (param) {
                    return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                  }));
            var txMinedPromise = $$Promise.Js.toResult(tx.wait());
            $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                    console.log(txOutcome);
                    return Curry._1(setTxState, (function (param) {
                                  return /* Complete */Block.__(2, [txOutcome]);
                                }));
                  }));
            $$Promise.getError(txMinedPromise, (function (error) {
                    Curry._1(setTxState, (function (param) {
                            return /* Failed */2;
                          }));
                    console.log(error);
                    
                  }));
            
          }));
    $$Promise.getError(claimLoyaltyTokenPromise, (function (error) {
            return Curry._1(setTxState, (function (param) {
                          return /* Declined */Block.__(1, [error.message]);
                        }));
          }));
    
  };
  return /* tuple */[
          buyFunction,
          match[0]
        ];
}

function useApproveLoyaltyTokens(param) {
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optLoyaltyTokens = useLoyaltyTokenContract(false);
  var optNetworkId = Core.useWeb3React().chainId;
  var buyFunction = function (param) {
    var value = Ethers.utils.parseUnits("0", 0);
    Curry._1(setTxState, (function (param) {
            return /* Created */1;
          }));
    if (optLoyaltyTokens === undefined) {
      return ;
    }
    if (optNetworkId === undefined) {
      return ;
    }
    var voteContractAddress = Globals$WildCards.$pipe$pipe$pipe$pipe(voteAddressFromChainId(optNetworkId), "0x0000000000000000000000000000000000000500");
    var claimLoyaltyTokenPromise = $$Promise.Js.toResult(optLoyaltyTokens.approve(voteContractAddress, "100000000000000000000000", {
              value: value
            }));
    $$Promise.getOk(claimLoyaltyTokenPromise, (function (tx) {
            Curry._1(setTxState, (function (param) {
                    return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                  }));
            var txMinedPromise = $$Promise.Js.toResult(tx.wait());
            $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                    return Curry._1(setTxState, (function (param) {
                                  return /* Complete */Block.__(2, [txOutcome]);
                                }));
                  }));
            $$Promise.getError(txMinedPromise, (function (error) {
                    Curry._1(setTxState, (function (param) {
                            return /* Failed */2;
                          }));
                    console.log(error);
                    
                  }));
            
          }));
    $$Promise.getError(claimLoyaltyTokenPromise, (function (error) {
            return Curry._1(setTxState, (function (param) {
                          return /* Declined */Block.__(1, [error.message]);
                        }));
          }));
    
  };
  return /* tuple */[
          buyFunction,
          match[0]
        ];
}

function useVoteForProject(param) {
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optSteward = useVoteContract(false);
  var buyFunction = function (proposalId, squareRoot) {
    console.log("ProposalId" + proposalId);
    var value = Ethers.utils.parseUnits("0", 0);
    Curry._1(setTxState, (function (param) {
            return /* Created */1;
          }));
    if (optSteward === undefined) {
      return ;
    }
    console.log("!!Voting - start!!");
    console.log("<Proposal ID>, <loyalty tokens to use>, <number of votes (ie the square root)>");
    console.log(proposalId, squareRoot.sqr().toString(), squareRoot.toString());
    console.log("!!Voting - end!!");
    var claimLoyaltyTokenPromise = $$Promise.Js.toResult(optSteward.vote(proposalId, squareRoot.sqr().toString(), squareRoot.toString(), {
              value: value
            }));
    $$Promise.getOk(claimLoyaltyTokenPromise, (function (tx) {
            Curry._1(setTxState, (function (param) {
                    return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                  }));
            var txMinedPromise = $$Promise.Js.toResult(tx.wait());
            $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                    console.log(txOutcome);
                    return Curry._1(setTxState, (function (param) {
                                  return /* Complete */Block.__(2, [txOutcome]);
                                }));
                  }));
            $$Promise.getError(txMinedPromise, (function (error) {
                    Curry._1(setTxState, (function (param) {
                            return /* Failed */2;
                          }));
                    console.log(error);
                    
                  }));
            
          }));
    $$Promise.getError(claimLoyaltyTokenPromise, (function (error) {
            return Curry._1(setTxState, (function (param) {
                          return /* Declined */Block.__(1, [error.message]);
                        }));
          }));
    
  };
  return /* tuple */[
          buyFunction,
          match[0]
        ];
}

function useIncreaseVoteIteration(param) {
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optSteward = useVoteContract(false);
  var buyFunction = function (param) {
    var value = Ethers.utils.parseUnits("0", 0);
    Curry._1(setTxState, (function (param) {
            return /* Created */1;
          }));
    if (optSteward === undefined) {
      return ;
    }
    var claimLoyaltyTokenPromise = $$Promise.Js.toResult(optSteward.distributeFunds({
              value: value
            }));
    $$Promise.getOk(claimLoyaltyTokenPromise, (function (tx) {
            Curry._1(setTxState, (function (param) {
                    return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                  }));
            var txMinedPromise = $$Promise.Js.toResult(tx.wait());
            $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                    console.log(txOutcome);
                    return Curry._1(setTxState, (function (param) {
                                  return /* Complete */Block.__(2, [txOutcome]);
                                }));
                  }));
            $$Promise.getError(txMinedPromise, (function (error) {
                    Curry._1(setTxState, (function (param) {
                            return /* Failed */2;
                          }));
                    console.log(error);
                    
                  }));
            
          }));
    $$Promise.getError(claimLoyaltyTokenPromise, (function (error) {
            return Curry._1(setTxState, (function (param) {
                          return /* Declined */Block.__(1, [error.message]);
                        }));
          }));
    
  };
  return /* tuple */[
          buyFunction,
          match[0]
        ];
}

function useUpdateDeposit(isGsn) {
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optSteward = useStewardContract(isGsn);
  return /* tuple */[
          (function (value) {
              var value$1 = Ethers.utils.parseUnits(value, 0);
              Curry._1(setTxState, (function (param) {
                      return /* Created */1;
                    }));
              if (optSteward === undefined) {
                return ;
              }
              var updateDepositPromise = $$Promise.Js.toResult(optSteward.depositWei({
                        value: value$1
                      }));
              $$Promise.getOk(updateDepositPromise, (function (tx) {
                      Curry._1(setTxState, (function (param) {
                              return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                            }));
                      var txMinedPromise = $$Promise.Js.toResult(tx.wait());
                      $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                              return Curry._1(setTxState, (function (param) {
                                            return /* Complete */Block.__(2, [txOutcome]);
                                          }));
                            }));
                      $$Promise.getError(txMinedPromise, (function (_error) {
                              return Curry._1(setTxState, (function (param) {
                                            return /* Failed */2;
                                          }));
                            }));
                      
                    }));
              $$Promise.getError(updateDepositPromise, (function (error) {
                      console.log("error processing transaction: " + error.message);
                      
                    }));
              
            }),
          match[0]
        ];
}

function useWithdrawDeposit(isGsn) {
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optSteward = useStewardContract(isGsn);
  return /* tuple */[
          (function (amountToWithdraw) {
              var value = Ethers.utils.parseUnits("0", 0);
              console.log(amountToWithdraw + " is the amount I'm trying to withdraw");
              var amountToWithdrawEncoded = Ethers.utils.parseUnits(amountToWithdraw, 0);
              Curry._1(setTxState, (function (param) {
                      return /* Created */1;
                    }));
              if (optSteward === undefined) {
                return ;
              }
              var updateDepositPromise = $$Promise.Js.toResult(optSteward.withdrawDeposit(amountToWithdrawEncoded, {
                        value: value
                      }));
              $$Promise.getOk(updateDepositPromise, (function (tx) {
                      Curry._1(setTxState, (function (param) {
                              return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                            }));
                      var txMinedPromise = $$Promise.Js.toResult(tx.wait());
                      $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                              console.log(txOutcome);
                              return Curry._1(setTxState, (function (param) {
                                            return /* Complete */Block.__(2, [txOutcome]);
                                          }));
                            }));
                      $$Promise.getError(txMinedPromise, (function (error) {
                              Curry._1(setTxState, (function (param) {
                                      return /* Failed */2;
                                    }));
                              console.log(error);
                              
                            }));
                      
                    }));
              $$Promise.getError(updateDepositPromise, (function (error) {
                      return Curry._1(setTxState, (function (param) {
                                    return /* Declined */Block.__(1, [error.message]);
                                  }));
                    }));
              
            }),
          match[0]
        ];
}

function useUserLoyaltyTokenBalance(address) {
  var match = React.useState((function () {
          
        }));
  var setResult = match[1];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setCounter = match$1[1];
  var counter = match$1[0];
  var optSteward = useLoyaltyTokenContract(false);
  React.useEffect((function () {
          if (optSteward !== undefined) {
            Async$WildCards.let_(optSteward.balanceOf(address), (function (balance) {
                    var balanceString = balance.toString();
                    Curry._1(setResult, (function (param) {
                            return Caml_option.some(new BnJs.default(balanceString));
                          }));
                    return Globals$WildCards.async(undefined);
                  }));
          }
          
        }), /* tuple */[
        counter,
        setResult,
        optSteward,
        address
      ]);
  return /* tuple */[
          match[0],
          (function (param) {
              return Curry._1(setCounter, (function (param) {
                            return counter + 1 | 0;
                          }));
            })
        ];
}

function useVoteApprovedTokens(owner) {
  var match = React.useState((function () {
          
        }));
  var setResult = match[1];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setCounter = match$1[1];
  var counter = match$1[0];
  var optLoyaltyTokens = useLoyaltyTokenContract(false);
  var optNetworkId = Core.useWeb3React().chainId;
  React.useEffect((function () {
          if (optLoyaltyTokens !== undefined && optNetworkId !== undefined) {
            var voteContractAddress = Globals$WildCards.$pipe$pipe$pipe$pipe(voteAddressFromChainId(optNetworkId), "0x0000000000000000000000000000000000000500");
            Async$WildCards.let_(optLoyaltyTokens.allowance(owner, voteContractAddress), (function (allowance) {
                    var allowanceString = allowance.toString();
                    Curry._1(setResult, (function (param) {
                            return Caml_option.some(new BnJs.default(allowanceString));
                          }));
                    return Globals$WildCards.async(undefined);
                  }));
          }
          
        }), /* tuple */[
        counter,
        setResult,
        optLoyaltyTokens,
        owner,
        optNetworkId
      ]);
  return /* tuple */[
          match[0],
          (function (param) {
              return Curry._1(setCounter, (function (param) {
                            return counter + 1 | 0;
                          }));
            })
        ];
}

function useCurrentIteration(param) {
  var match = React.useState((function () {
          
        }));
  var setResult = match[1];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setCounter = match$1[1];
  var counter = match$1[0];
  var optVoteContract = useVoteContract(false);
  React.useEffect((function () {
          if (optVoteContract !== undefined) {
            Async$WildCards.let_(optVoteContract.proposalIteration(), (function (currentIteration) {
                    var currentIterationString = currentIteration.toString();
                    Curry._1(setResult, (function (param) {
                            return Belt_Int.fromString(currentIterationString);
                          }));
                    return Globals$WildCards.async(undefined);
                  }));
          }
          
        }), /* tuple */[
        counter,
        setResult,
        optVoteContract
      ]);
  return /* tuple */[
          match[0],
          (function (param) {
              return Curry._1(setCounter, (function (param) {
                            return counter + 1 | 0;
                          }));
            })
        ];
}

function useCurrentWinner(param) {
  var match = React.useState((function () {
          
        }));
  var setResult = match[1];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setCounter = match$1[1];
  var counter = match$1[0];
  var optVoteContract = useVoteContract(false);
  React.useEffect((function () {
          if (optVoteContract !== undefined) {
            Async$WildCards.let_(optVoteContract.currentWinner(), (function (currentWinnerBn) {
                    var currentWinnerString = currentWinnerBn.toString();
                    Curry._1(setResult, (function (param) {
                            return Belt_Int.fromString(currentWinnerString);
                          }));
                    return Globals$WildCards.async(undefined);
                  }));
          }
          
        }), /* tuple */[
        counter,
        setResult,
        optVoteContract
      ]);
  return /* tuple */[
          match[0],
          (function (param) {
              return Curry._1(setCounter, (function (param) {
                            return counter + 1 | 0;
                          }));
            })
        ];
}

function useProposalVotes(iteration, projectId) {
  var match = React.useState((function () {
          
        }));
  var setResult = match[1];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setCounter = match$1[1];
  var counter = match$1[0];
  var optVoteContract = useVoteContract(false);
  React.useEffect((function () {
          if (optVoteContract !== undefined) {
            Async$WildCards.let_(optVoteContract.proposalVotes(iteration, projectId), (function (proposalVotes) {
                    var propsalVotesString = proposalVotes.toString();
                    Curry._1(setResult, (function (param) {
                            return Caml_option.some(new BnJs.default(propsalVotesString));
                          }));
                    return Globals$WildCards.async(undefined);
                  }));
          }
          
        }), /* tuple */[
        counter,
        setResult,
        optVoteContract,
        iteration,
        projectId
      ]);
  return /* tuple */[
          match[0],
          (function (param) {
              return Curry._1(setCounter, (function (param) {
                            return counter + 1 | 0;
                          }));
            })
        ];
}

function useHasUserVotedForProposalIteration(iteration, userAddress, projectId, isGsn) {
  var match = React.useState((function () {
          
        }));
  var setResult = match[1];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setCounter = match$1[1];
  var counter = match$1[0];
  var optVoteContract = useVoteContract(isGsn);
  React.useEffect((function () {
          if (optVoteContract !== undefined) {
            Async$WildCards.let_(optVoteContract.hasUserVotedForProposalIteration(iteration, userAddress, projectId), (function (hasVotedForProposal) {
                    Curry._1(setResult, (function (param) {
                            return hasVotedForProposal;
                          }));
                    return Globals$WildCards.async(undefined);
                  }));
          }
          
        }), /* tuple */[
        counter,
        setResult,
        optVoteContract,
        iteration,
        projectId,
        userAddress
      ]);
  return /* tuple */[
          match[0],
          (function (param) {
              return Curry._1(setCounter, (function (param) {
                            return counter + 1 | 0;
                          }));
            })
        ];
}

function useTotalVotes(param) {
  var match = React.useState((function () {
          
        }));
  var setResult = match[1];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setCounter = match$1[1];
  var counter = match$1[0];
  var optVoteContract = useVoteContract(false);
  React.useEffect((function () {
          if (optVoteContract !== undefined) {
            Async$WildCards.let_(optVoteContract.totalVotes(), (function (totalVotes) {
                    var totalVotesString = totalVotes.toString();
                    Curry._1(setResult, (function (param) {
                            return Caml_option.some(new BnJs.default(totalVotesString));
                          }));
                    return Globals$WildCards.async(undefined);
                  }));
          }
          
        }), /* tuple */[
        counter,
        setResult,
        optVoteContract
      ]);
  return /* tuple */[
          match[0],
          (function (param) {
              return Curry._1(setCounter, (function (param) {
                            return counter + 1 | 0;
                          }));
            })
        ];
}

function useProposalDeadline(param) {
  var match = React.useState((function () {
          
        }));
  var setResult = match[1];
  var match$1 = React.useState((function () {
          return 0;
        }));
  var setCounter = match$1[1];
  var counter = match$1[0];
  var optSteward = useVoteContract(false);
  React.useEffect((function () {
          if (optSteward !== undefined) {
            Async$WildCards.let_(optSteward.proposalDeadline(), (function (currentIteration) {
                    var currentIterationString = currentIteration.toString();
                    Curry._1(setResult, (function (param) {
                            return Belt_Int.fromString(currentIterationString);
                          }));
                    return Globals$WildCards.async(undefined);
                  }));
          }
          
        }), /* tuple */[
        counter,
        setResult,
        optSteward
      ]);
  return /* tuple */[
          match[0],
          (function (param) {
              return Curry._1(setCounter, (function (param) {
                            return counter + 1 | 0;
                          }));
            })
        ];
}

function useChangePrice(animal, isGsn) {
  var animalId = TokenId$WildCards.toString(animal);
  var match = React.useState((function () {
          return /* UnInitialised */0;
        }));
  var setTxState = match[1];
  var optSteward = useStewardContract(isGsn);
  return /* tuple */[
          (function (newPrice) {
              var value = Ethers.utils.parseUnits("0", 0);
              var newPriceEncoded = Ethers.utils.parseUnits(newPrice, 0);
              Curry._1(setTxState, (function (param) {
                      return /* Created */1;
                    }));
              if (optSteward === undefined) {
                return ;
              }
              var updatePricePromise = $$Promise.Js.toResult(optSteward.changePrice(animalId, newPriceEncoded, {
                        value: value
                      }));
              $$Promise.getOk(updatePricePromise, (function (tx) {
                      Curry._1(setTxState, (function (param) {
                              return /* SignedAndSubmitted */Block.__(0, [tx.hash]);
                            }));
                      var txMinedPromise = $$Promise.Js.toResult(tx.wait());
                      $$Promise.getOk(txMinedPromise, (function (txOutcome) {
                              console.log(txOutcome);
                              return Curry._1(setTxState, (function (param) {
                                            return /* Complete */Block.__(2, [txOutcome]);
                                          }));
                            }));
                      $$Promise.getError(txMinedPromise, (function (error) {
                              Curry._1(setTxState, (function (param) {
                                      return /* Failed */2;
                                    }));
                              console.log(error);
                              
                            }));
                      
                    }));
              $$Promise.getError(updatePricePromise, (function (error) {
                      return Curry._1(setTxState, (function (param) {
                                    return /* Declined */Block.__(1, [error.message]);
                                  }));
                    }));
              
            }),
          match[0]
        ];
}

var stewardAddressMaticMain = "0x6D47CF86F6A490c6410fC082Fd1Ad29CF61492d0";

var stewardAddressMumbai = "0x0C00CFE8EbB34fE7C31d4915a43Cde211e9F0F3B";

var loyaltyTokenAddressMaticMain = "0x773c75c2277eD3e402BDEfd28Ec3b51A3AfbD8a4";

var loyaltyTokenAddressMumbai = "0xd7d8c42ab5b83aa3d4114e5297989dc27bdfb715";

export {
  getProviderOrSigner ,
  voteContract ,
  loyaltyTokenAbi ,
  getExchangeContract ,
  getLoyaltyTokenContract ,
  getVotingContract ,
  stewardAddressMainnet ,
  stewardAddressGoerli ,
  stewardAddressRinkeby ,
  loyaltyTokenAddressMainnet ,
  loyaltyTokenAddressGoerli ,
  voteContractMainnet ,
  voteContractGoerli ,
  stewardAddressMaticMain ,
  stewardAddressMumbai ,
  loyaltyTokenAddressMaticMain ,
  loyaltyTokenAddressMumbai ,
  useStewardAbi ,
  defaultStewardAddressFromChainId ,
  useStewardAddress ,
  loyaltyTokenAddressFromChainId ,
  voteAddressFromChainId ,
  useStewardContract ,
  useLoyaltyTokenContract ,
  useVoteContract ,
  useBuy ,
  useBuyAuction ,
  useRedeemLoyaltyTokens ,
  useApproveLoyaltyTokens ,
  useVoteForProject ,
  useIncreaseVoteIteration ,
  useUpdateDeposit ,
  useWithdrawDeposit ,
  useUserLoyaltyTokenBalance ,
  useVoteApprovedTokens ,
  useCurrentIteration ,
  useCurrentWinner ,
  useProposalVotes ,
  useHasUserVotedForProposalIteration ,
  useTotalVotes ,
  useProposalDeadline ,
  useChangePrice ,
  
}
/* voteContract Not a pure module */
