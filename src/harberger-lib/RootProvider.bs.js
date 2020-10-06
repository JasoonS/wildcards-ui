// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Ethers from "ethers";
import * as $$Promise from "reason-promise/src/js/promise.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Eth$WildCards from "./Eth.bs.js";
import * as Core from "@web3-react/core";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.js";
import * as UserProvider$WildCards from "./js/user-provider/UserProvider.bs.js";
import * as ThemeProvider$WildCards from "./bindings/rimble/ThemeProvider.bs.js";
import * as Web3Connectors$WildCards from "./bindings/web3-react/Web3Connectors.bs.js";

var Web3ReactProvider = { };

function getLibrary(provider) {
  var library = new (Ethers.providers.Web3Provider)(provider);
  var setPollingInterval = (lib => {lib.pollingInterval = 8000; return lib; });
  return setPollingInterval(library);
}

var initialState = {
  nonUrlState: /* NoExtraState */2,
  ethState: /* Disconnected */0,
  config: {
    stewardContractAddress: undefined,
    stewardAbi: undefined
  }
};

function reducer(_prevState, _action) {
  while(true) {
    var action = _action;
    var prevState = _prevState;
    if (typeof action === "number") {
      switch (action) {
        case /* GoToDepositUpdate */1 :
            var match = prevState.ethState;
            if (match) {
              return {
                      nonUrlState: /* UpdateDepositScreen */1,
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            } else {
              return {
                      nonUrlState: /* LoginScreen */Block.__(0, [action]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            }
        case /* GoToUserVerification */2 :
            var match$1 = prevState.ethState;
            if (match$1) {
              return {
                      nonUrlState: /* UserVerificationScreen */0,
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            } else {
              return {
                      nonUrlState: /* LoginScreen */Block.__(0, [action]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            }
        case /* NoAction */0 :
        case /* ClearNonUrlState */3 :
            return {
                    nonUrlState: /* NoExtraState */2,
                    ethState: prevState.ethState,
                    config: prevState.config
                  };
        case /* Logout */4 :
            return {
                    nonUrlState: /* NoExtraState */2,
                    ethState: /* Disconnected */0,
                    config: prevState.config
                  };
        
      }
    } else {
      switch (action.tag | 0) {
        case /* GoToBuy */0 :
            var match$2 = prevState.ethState;
            if (match$2) {
              return {
                      nonUrlState: /* BuyScreen */Block.__(2, [action[0]]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            } else {
              return {
                      nonUrlState: /* LoginScreen */Block.__(0, [action]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            }
        case /* GoToAuction */1 :
            var match$3 = prevState.ethState;
            if (match$3) {
              return {
                      nonUrlState: /* AuctionScreen */Block.__(3, [action[0]]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            } else {
              return {
                      nonUrlState: /* LoginScreen */Block.__(0, [action]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            }
        case /* GoToPriceUpdate */2 :
            var match$4 = prevState.ethState;
            if (match$4) {
              return {
                      nonUrlState: /* UpdatePriceScreen */Block.__(1, [action[0]]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            } else {
              return {
                      nonUrlState: /* LoginScreen */Block.__(0, [action]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            }
        case /* GoToWeb3Connect */3 :
            var action$1 = action[0];
            var match$5 = prevState.ethState;
            if (!match$5) {
              return {
                      nonUrlState: /* LoginScreen */Block.__(0, [action$1]),
                      ethState: prevState.ethState,
                      config: prevState.config
                    };
            }
            _action = action$1;
            continue ;
        case /* LoadAddress */4 :
            var newState_nonUrlState = prevState.nonUrlState;
            var newState_ethState = /* Connected */[
              action[0],
              action[1]
            ];
            var newState_config = prevState.config;
            var newState = {
              nonUrlState: newState_nonUrlState,
              ethState: newState_ethState,
              config: newState_config
            };
            var followOnAction = prevState.nonUrlState;
            if (typeof followOnAction === "number") {
              return newState;
            }
            if (followOnAction.tag) {
              return newState;
            }
            _action = followOnAction[0];
            _prevState = newState;
            continue ;
        
      }
    }
  };
}

var context = React.createContext(/* tuple */[
      initialState,
      (function (param) {
          
        })
    ]);

var make = context.Provider;

function makeProps(value, children, param) {
  return {
          value: value,
          children: children
        };
}

var RootContext = {
  context: context,
  make: make,
  makeProps: makeProps
};

function RootProvider$RootWithWeb3(Props) {
  var children = Props.children;
  var stewardContractAddress = Props.stewardContractAddress;
  var stewardAbi = Props.stewardAbi;
  var match = React.useReducer(reducer, {
        nonUrlState: /* NoExtraState */2,
        ethState: /* Disconnected */0,
        config: {
          stewardContractAddress: stewardContractAddress,
          stewardAbi: stewardAbi
        }
      });
  var dispatch = match[1];
  var context = Core.useWeb3React();
  var contextMatic = Core.useWeb3React("matic");
  console.log("context.chainId");
  console.log(context.chainId);
  console.log("MATIC.chainId");
  console.log(contextMatic.chainId);
  var match$1 = React.useState((function () {
          return false;
        }));
  var setTriedLoginAlready = match$1[1];
  var triedLoginAlready = match$1[0];
  React.useEffect((function () {
          $$Promise.get(Curry._1(Web3Connectors$WildCards.injected.isAuthorized, undefined), (function (authorised) {
                  if (authorised && !triedLoginAlready) {
                    $$Promise.Js.$$catch(Curry._3(context.activate, Web3Connectors$WildCards.injected, (function (param) {
                                
                              }), true), (function (param) {
                            Curry._1(setTriedLoginAlready, (function (param) {
                                    return true;
                                  }));
                            return $$Promise.resolved(undefined);
                          }));
                    return ;
                  } else {
                    return Curry._1(setTriedLoginAlready, (function (param) {
                                  return true;
                                }));
                  }
                }));
          var match = context.chainId;
          if (match !== undefined) {
            
          } else {
            Curry._1(dispatch, /* Logout */4);
          }
          
        }), /* tuple */[
        context.activate,
        context.chainId,
        dispatch,
        setTriedLoginAlready,
        triedLoginAlready
      ]);
  React.useEffect((function () {
          var match = context.chainId;
          var maticChainId = match !== undefined && (match === 5 || match === 4) ? 80001 : 137;
          console.log("ACTIVATING THIS", maticChainId);
          $$Promise.Js.$$catch(Curry._3(contextMatic.activate, Web3Connectors$WildCards.injected, (function (param) {
                      
                    }), true), (function (e) {
                  console.log("ERROR ACTIVATING MATIC CONNECTION");
                  console.log(e);
                  return $$Promise.resolved(undefined);
                }));
          
        }), /* tuple */[
        contextMatic.activate,
        context.chainId,
        contextMatic.chainId
      ]);
  React.useEffect((function () {
          if (!triedLoginAlready && context.active) {
            Curry._1(setTriedLoginAlready, (function (param) {
                    return true;
                  }));
          }
          
        }), /* tuple */[
        triedLoginAlready,
        context.active,
        setTriedLoginAlready
      ]);
  React.useEffect((function () {
          var match = context.library;
          var match$1 = context.account;
          if (match !== undefined && match$1 !== undefined) {
            $$Promise.get($$Promise.Js.$$catch(match.getBalance(match$1), (function (param) {
                        return $$Promise.resolved(undefined);
                      })), (function (newBalance) {
                    return Curry._1(dispatch, /* LoadAddress */Block.__(4, [
                                  match$1,
                                  Belt_Option.flatMap(newBalance, (function (balance) {
                                          return Eth$WildCards.make(balance.toString());
                                        }))
                                ]));
                  }));
            return ;
          }
          
        }), /* tuple */[
        context.library,
        context.account,
        context.chainId,
        dispatch
      ]);
  return React.createElement(make, makeProps(/* tuple */[
                  match[0],
                  dispatch
                ], children, undefined));
}

var RootWithWeb3 = {
  make: RootProvider$RootWithWeb3
};

function useRootContext(param) {
  return React.useContext(context)[0];
}

function useStewardContractAddress(param) {
  var match = React.useContext(context);
  return match[0].config.stewardContractAddress;
}

function useStewardAbi(param) {
  var match = React.useContext(context);
  return match[0].config.stewardAbi;
}

function useCurrentUser(param) {
  var match = React.useContext(context);
  var match$1 = match[0].ethState;
  if (match$1) {
    return match$1[0];
  }
  
}

function useIsAddressCurrentUser(address) {
  var currentUser = useCurrentUser(undefined);
  if (currentUser !== undefined) {
    return address.toLowerCase() === currentUser.toLowerCase();
  } else {
    return false;
  }
}

function useIsProviderSelected(param) {
  var match = React.useContext(context);
  var match$1 = match[0].ethState;
  if (match$1) {
    return true;
  } else {
    return false;
  }
}

function useEthBalance(param) {
  var match = React.useContext(context);
  var match$1 = match[0].ethState;
  if (match$1) {
    return match$1[1];
  }
  
}

function useNonUrlState(param) {
  var match = React.useContext(context);
  return match[0].nonUrlState;
}

function useShowLogin(param) {
  var nonUrlRouting = useNonUrlState(undefined);
  if (typeof nonUrlRouting === "number" || nonUrlRouting.tag) {
    return false;
  } else {
    return true;
  }
}

function useNetworkId(param) {
  return Core.useWeb3React().chainId;
}

function useEtherscanUrl(param) {
  var networkId = Core.useWeb3React().chainId;
  if (networkId === 5) {
    return "goerli.etherscan.io";
  } else {
    return "etherscan.io";
  }
}

function useDeactivateWeb3(param) {
  return Core.useWeb3React().deactivate;
}

function useWeb3(param) {
  return Core.useWeb3React().library;
}

function useGoToBuy(param) {
  var match = React.useContext(context);
  var dispatch = match[1];
  return (function (animal) {
      return Curry._1(dispatch, /* GoToBuy */Block.__(0, [animal]));
    });
}

function useGoToAuction(param) {
  var match = React.useContext(context);
  var dispatch = match[1];
  return (function (animal) {
      return Curry._1(dispatch, /* GoToAuction */Block.__(1, [animal]));
    });
}

function useGoToDepositUpdate(param) {
  var match = React.useContext(context);
  var dispatch = match[1];
  return (function (param) {
      return Curry._1(dispatch, /* GoToDepositUpdate */1);
    });
}

function useGoToPriceUpdate(param) {
  var match = React.useContext(context);
  var dispatch = match[1];
  return (function (animal) {
      return Curry._1(dispatch, /* GoToPriceUpdate */Block.__(2, [animal]));
    });
}

function useVerifyUser(param) {
  var match = React.useContext(context);
  var dispatch = match[1];
  return (function (param) {
      return Curry._1(dispatch, /* GoToUserVerification */2);
    });
}

function useClearNonUrlState(param) {
  var match = React.useContext(context);
  var dispatch = match[1];
  return (function (param) {
      return Curry._1(dispatch, /* ClearNonUrlState */3);
    });
}

function useConnectWeb3(param) {
  var match = React.useContext(context);
  var dispatch = match[1];
  return (function (action) {
      return Curry._1(dispatch, /* GoToWeb3Connect */Block.__(3, [action]));
    });
}

function useCloseWeb3Login(param) {
  var match = React.useContext(context);
  var dispatch = match[1];
  return (function (param) {
      return Curry._1(dispatch, /* ClearNonUrlState */3);
    });
}

function useClearNonUrlStateAndPushRoute(param) {
  var clearNonUrlState = useClearNonUrlState(undefined);
  return (function (url) {
      Curry._1(clearNonUrlState, undefined);
      return ReasonReactRouter.push(url);
    });
}

function useActivateConnector(param) {
  var context = Core.useWeb3React();
  var match = React.useState((function () {
          return /* Standby */0;
        }));
  var setConnectionStatus = match[1];
  return /* tuple */[
          match[0],
          (function (provider) {
              $$Promise.get($$Promise.Js.$$catch(Curry._3(context.activate, provider, (function (param) {
                              
                            }), true), (function (error) {
                          console.log("Error connecting to network:");
                          console.log(error);
                          Curry._1(setConnectionStatus, (function (param) {
                                  return /* ErrorConnecting */3;
                                }));
                          return $$Promise.resolved(undefined);
                        })), (function (param) {
                      return Curry._1(setConnectionStatus, (function (param) {
                                    return /* Connected */1;
                                  }));
                    }));
              return Curry._1(setConnectionStatus, (function (param) {
                            return /* Connecting */2;
                          }));
            })
        ];
}

function RootProvider(Props) {
  var children = Props.children;
  var stewardContractAddress = Props.stewardContractAddress;
  var stewardAbi = Props.stewardAbi;
  return React.createElement(Core.Web3ReactProvider, {
              getLibrary: getLibrary,
              children: React.createElement(Web3Connectors$WildCards.Custom.make, {
                    id: "matic",
                    getLibrary: getLibrary,
                    children: React.createElement(RootProvider$RootWithWeb3, {
                          children: React.createElement(UserProvider$WildCards.make, {
                                children: React.createElement(ThemeProvider$WildCards.make, {
                                      children: children
                                    })
                              }),
                          stewardContractAddress: stewardContractAddress,
                          stewardAbi: stewardAbi
                        })
                  })
            });
}

var make$1 = RootProvider;

export {
  Web3ReactProvider ,
  getLibrary ,
  initialState ,
  reducer ,
  RootContext ,
  RootWithWeb3 ,
  useRootContext ,
  useStewardContractAddress ,
  useStewardAbi ,
  useCurrentUser ,
  useIsAddressCurrentUser ,
  useIsProviderSelected ,
  useEthBalance ,
  useNonUrlState ,
  useShowLogin ,
  useNetworkId ,
  useEtherscanUrl ,
  useDeactivateWeb3 ,
  useWeb3 ,
  useGoToBuy ,
  useGoToAuction ,
  useGoToDepositUpdate ,
  useGoToPriceUpdate ,
  useVerifyUser ,
  useClearNonUrlState ,
  useConnectWeb3 ,
  useCloseWeb3Login ,
  useClearNonUrlStateAndPushRoute ,
  useActivateConnector ,
  make$1 as make,
  
}
/* context Not a pure module */
