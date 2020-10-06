// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as BnJs from "bn.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Belt_Float from "bs-platform/lib/es6/belt_Float.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Belt_SetString from "bs-platform/lib/es6/belt_SetString.js";
import * as Animal$WildCards from "../harberger-lib/Animal.bs.js";
import * as Helper$WildCards from "../harberger-lib/Helper.bs.js";
import * as Styles$WildCards from "../Styles.bs.js";
import * as Blockie$WildCards from "../harberger-lib/bindings/ethereum-blockies-base64/Blockie.bs.js";
import * as Globals$WildCards from "../harberger-lib/Globals.bs.js";
import * as QlHooks$WildCards from "../harberger-lib/QlHooks.bs.js";
import * as TokenId$WildCards from "../harberger-lib/TokenId.bs.js";
import * as Validate$WildCards from "./Validate.bs.js";
import * as Web3Utils$WildCards from "../harberger-lib/Web3Utils.bs.js";
import * as RootProvider$WildCards from "../harberger-lib/RootProvider.bs.js";
import * as UserProvider$WildCards from "../harberger-lib/js/user-provider/UserProvider.bs.js";
import * as ActionButtons$WildCards from "./ActionButtons.bs.js";
import * as UpdateDeposit$WildCards from "../harberger-lib/components/UpdateDeposit.bs.js";
import * as ContractActions$WildCards from "../harberger-lib/eth/ContractActions.bs.js";
import * as UsdPriceProvider$WildCards from "../harberger-lib/components/UsdPriceProvider.bs.js";
import * as LazyThreeBoxUpdate$WildCards from "./LazyThreeBoxUpdate.bs.js";

var centreAlignOnMobile = Curry._1(Css.style, /* :: */[
      Css.media("(max-width: 831px)", /* :: */[
            Css.alignItems(Css.center),
            /* :: */[
              Css.justifyContent(Css.center),
              /* [] */0
            ]
          ]),
      /* [] */0
    ]);

function UserProfile$Token(Props) {
  var tokenId = Props.tokenId;
  var clearAndPush = RootProvider$WildCards.useClearNonUrlStateAndPushRoute(undefined);
  var image = Animal$WildCards.useAvatar(tokenId);
  return React.createElement("div", {
              className: Curry._1(Css.style, /* :: */[
                    Css.width(Css.vh(12)),
                    /* [] */0
                  ])
            }, React.createElement("img", {
                  className: Curry._1(Css.style, /* :: */[
                        Css.width(/* `percent */[
                              -119887163,
                              100
                            ]),
                        /* [] */0
                      ]),
                  src: image,
                  onClick: (function (_e) {
                      return Curry._1(clearAndPush, "/#details/" + TokenId$WildCards.toString(tokenId));
                    })
                }));
}

var Token = {
  make: UserProfile$Token
};

function UserProfile$ClaimLoyaltyTokenButtons(Props) {
  var id = Props.id;
  var refreshLoyaltyTokenBalance = Props.refreshLoyaltyTokenBalance;
  var match = ContractActions$WildCards.useRedeemLoyaltyTokens(id, false);
  var transactionStatus = match[1];
  var redeemLoyaltyTokens = match[0];
  var balanceAvailableOnToken = QlHooks$WildCards.useUnredeemedLoyaltyTokenDueFromWildcard(TokenId$WildCards.makeWithDefault(id, 0));
  var tokenName = Globals$WildCards.$pipe$pipe$pipe$pipe(QlHooks$WildCards.useWildcardName(TokenId$WildCards.fromStringUnsafe(id)), "loading");
  var etherScanUrl = RootProvider$WildCards.useEtherscanUrl(undefined);
  React.useEffect((function () {
          if (typeof transactionStatus !== "number" && transactionStatus.tag === /* Complete */2) {
            Curry._1(refreshLoyaltyTokenBalance, undefined);
          }
          
        }), /* tuple */[
        transactionStatus,
        refreshLoyaltyTokenBalance
      ]);
  if (balanceAvailableOnToken === undefined) {
    return null;
  }
  var tmp;
  if (typeof transactionStatus === "number") {
    switch (transactionStatus) {
      case /* UnInitialised */0 :
          tmp = React.createElement("p", undefined, React.createElement("a", {
                    onClick: (function (param) {
                        return Curry._1(redeemLoyaltyTokens, undefined);
                      })
                  }, Globals$WildCards.restr("redeem " + (Web3Utils$WildCards.fromWeiBNToEthPrecision(Caml_option.valFromOption(balanceAvailableOnToken), 5) + (" tokens for " + tokenName)))));
          break;
      case /* Created */1 :
          tmp = React.createElement("p", undefined, Globals$WildCards.restr("Transaction Created"));
          break;
      case /* Failed */2 :
          tmp = React.createElement("p", undefined, Globals$WildCards.restr("Transaction failed"));
          break;
      
    }
  } else {
    switch (transactionStatus.tag | 0) {
      case /* SignedAndSubmitted */0 :
          tmp = React.createElement("p", undefined, Globals$WildCards.restr("Processing: "), React.createElement("a", {
                    href: "https://" + (etherScanUrl + ("/tx/" + transactionStatus[0])),
                    rel: "noopener noreferrer",
                    target: "_blank"
                  }, Globals$WildCards.restr("view transaction")));
          break;
      case /* Declined */1 :
          tmp = React.createElement("p", undefined, Globals$WildCards.restr("Submitting transaction failed: " + transactionStatus[0]));
          break;
      case /* Complete */2 :
          tmp = React.createElement("p", undefined, Globals$WildCards.restr("Tokens claimed (please reload the page, this will be improved soon)"));
          break;
      
    }
  }
  return React.createElement("small", undefined, tmp);
}

var ClaimLoyaltyTokenButtons = {
  make: UserProfile$ClaimLoyaltyTokenButtons
};

function UserProfile$UserDetails(Props) {
  var patronQueryResult = Props.patronQueryResult;
  var optThreeBoxData = Props.optThreeBoxData;
  var userAddress = Props.userAddress;
  var isForeclosed = QlHooks$WildCards.useIsForeclosed(userAddress);
  var isAddressCurrentUser = RootProvider$WildCards.useIsAddressCurrentUser(userAddress);
  var currentlyOwnedTokens = isForeclosed ? [] : Globals$WildCards.$pipe$pipe$pipe$pipe(Globals$WildCards.oMap(patronQueryResult.patron, (function (patron) {
                return Belt_Array.map(patron.tokens, (function (token) {
                              return token.id;
                            }));
              })), []);
  var allPreviouslyOwnedTokens = Globals$WildCards.$pipe$pipe$pipe$pipe(Globals$WildCards.oMap(patronQueryResult.patron, (function (patron) {
              return Belt_Array.map(patron.previouslyOwnedTokens, (function (token) {
                            return token.id;
                          }));
            })), []);
  var uniquePreviouslyOwnedTokens = isForeclosed ? allPreviouslyOwnedTokens : Belt_SetString.toArray(Belt_SetString.removeMany(Belt_SetString.fromArray(allPreviouslyOwnedTokens), currentlyOwnedTokens));
  var optProfile = Globals$WildCards.$great$great$eq(optThreeBoxData, (function (a) {
          return a.profile;
        }));
  var image = Belt_Option.mapWithDefault(Globals$WildCards.$great$great$eq(Globals$WildCards.$less$$great(Globals$WildCards.$great$great$eq(Globals$WildCards.$great$great$eq(optProfile, (function (a) {
                          return a.image;
                        })), (function (img) {
                      return Belt_Array.get(img, 0);
                    })), (function (a) {
                  return a.contentUrl;
                })), (function (content) {
              return Js_dict.get(content, "/");
            })), Blockie$WildCards.makeBlockie(userAddress), (function (hash) {
          return "https://ipfs.infura.io/ipfs/" + hash;
        }));
  var optName = Globals$WildCards.$great$great$eq(optProfile, (function (a) {
          return a.name;
        }));
  var optDescription = Globals$WildCards.$great$great$eq(optProfile, (function (a) {
          return a.description;
        }));
  var optTwitter = Globals$WildCards.$less$$great(Globals$WildCards.$great$great$eq(Globals$WildCards.$great$great$eq(optThreeBoxData, (function (a) {
                  return a.verifications;
                })), (function (a) {
              return a.twitter;
            })), (function (a) {
          return a.username;
        }));
  var etherScanUrl = RootProvider$WildCards.useEtherscanUrl(undefined);
  var optUsdPrice = UsdPriceProvider$WildCards.useUsdPrice(undefined);
  var optMonthlyCotribution = Globals$WildCards.$less$$great(Globals$WildCards.$less$$great(patronQueryResult.patron, (function (patron) {
              return patron.patronTokenCostScaledNumerator.mul(new BnJs.default("2592000")).div(new BnJs.default("31536000000000000000"));
            })), (function (monthlyContributionWei) {
          var monthlyContributionEth = Web3Utils$WildCards.fromWeiBNToEthPrecision(monthlyContributionWei, 4);
          var optMonthlyContributionUsd = Globals$WildCards.$less$$great(optUsdPrice, (function (currentUsdEthPrice) {
                  return Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(Belt_Option.mapWithDefault(Belt_Float.fromString(monthlyContributionEth), 0, (function (a) {
                                    return a;
                                  })) * currentUsdEthPrice, 2);
                }));
          return /* tuple */[
                  monthlyContributionEth,
                  optMonthlyContributionUsd
                ];
        }));
  var match = ContractActions$WildCards.useUserLoyaltyTokenBalance(userAddress);
  var updateFunction = match[1];
  var totalLoyaltyTokensAvailableAndClaimedOpt = QlHooks$WildCards.useTotalLoyaltyToken(userAddress);
  var nonUrlState = RootProvider$WildCards.useNonUrlState(undefined);
  var clearNonUrlState = RootProvider$WildCards.useClearNonUrlState(undefined);
  var tmp;
  var exit = 0;
  if (typeof nonUrlState === "number") {
    switch (nonUrlState) {
      case /* UserVerificationScreen */0 :
          tmp = React.createElement("div", {
                className: Curry._1(Css.style, /* :: */[
                      Css.position(/* relative */903134412),
                      /* [] */0
                    ])
              }, React.createElement(RimbleUi.Button.Text, {
                    onClick: (function (param) {
                        return Curry._1(clearNonUrlState, undefined);
                      }),
                    icononly: true,
                    icon: "Close",
                    color: "moon-gray",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    m: 1
                  }), React.createElement(React.Suspense, {
                    children: React.createElement(LazyThreeBoxUpdate$WildCards.Lazy.make, { }),
                    fallback: React.createElement(RimbleUi.Loader, { })
                  }));
          break;
      case /* UpdateDepositScreen */1 :
          tmp = React.createElement("div", {
                className: Curry._1(Css.style, /* :: */[
                      Css.position(/* relative */903134412),
                      /* [] */0
                    ])
              }, React.createElement(RimbleUi.Button.Text, {
                    onClick: (function (param) {
                        return Curry._1(clearNonUrlState, undefined);
                      }),
                    icononly: true,
                    icon: "Close",
                    color: "moon-gray",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    m: 1
                  }), React.createElement(UpdateDeposit$WildCards.make, {
                    closeButtonText: "Close"
                  }));
          break;
      case /* NoExtraState */2 :
          exit = 1;
          break;
      
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    tmp = React.createElement(React.Fragment, undefined, Globals$WildCards.reactMap(optName, (function (name) {
                return React.createElement("h2", undefined, Globals$WildCards.restr(name));
              })), Globals$WildCards.reactMap(optTwitter, (function (twitterHandle) {
                return React.createElement("a", {
                            className: Styles$WildCards.navListText,
                            href: "https://twitter.com/" + twitterHandle,
                            rel: "noopener noreferrer",
                            target: "_blank"
                          }, Globals$WildCards.restr("@" + twitterHandle));
              })), React.createElement("br", undefined), Globals$WildCards.reactMap(optDescription, (function (description) {
                return React.createElement("p", undefined, Globals$WildCards.restr(description));
              })), React.createElement("a", {
              className: Styles$WildCards.navListText,
              href: "https://" + (etherScanUrl + ("/address/" + userAddress)),
              rel: "noopener noreferrer",
              target: "_blank"
            }, Globals$WildCards.restr(Helper$WildCards.elipsify(userAddress, 10))), React.createElement("br", undefined), isAddressCurrentUser ? React.createElement(React.Fragment, undefined, React.createElement("small", undefined, React.createElement("p", undefined, Globals$WildCards.restr("Claimed Loyalty Token Balance: " + (Belt_Option.mapWithDefault(match[0], "Loading", (function (claimedLoyaltyTokens) {
                                    return Web3Utils$WildCards.fromWeiBNToEthPrecision(claimedLoyaltyTokens, 6);
                                  })) + " WLT")))), currentlyOwnedTokens.length !== 0 ? Belt_Array.map(currentlyOwnedTokens, (function (id) {
                        return React.createElement(UserProfile$ClaimLoyaltyTokenButtons, {
                                    id: id,
                                    refreshLoyaltyTokenBalance: updateFunction,
                                    key: id
                                  });
                      })) : null, React.createElement("a", {
                    href: "/#ethturin-quadratic-voting"
                  }, Globals$WildCards.restr("vote"))) : React.createElement("small", undefined, React.createElement("p", undefined, Globals$WildCards.restr("Loyalty Token Balance Generated: " + (Belt_Option.mapWithDefault(totalLoyaltyTokensAvailableAndClaimedOpt, "Loading", (function (param) {
                                return Web3Utils$WildCards.fromWeiBNToEthPrecision(param[0], 5);
                              })) + " WLT")))), isAddressCurrentUser ? React.createElement(React.Fragment, {
                children: null
              }, isForeclosed ? null : React.createElement(React.Fragment, undefined, React.createElement("br", undefined), React.createElement(ActionButtons$WildCards.UpdateDeposit.make, { })), React.createElement("br", undefined), React.createElement(Validate$WildCards.make, { })) : null);
  }
  return React.createElement("div", {
              className: Curry._1(Css.style, /* :: */[
                    Css.width(/* `percent */[
                          -119887163,
                          100
                        ]),
                    /* [] */0
                  ])
            }, React.createElement(RimbleUi.Flex, {
                  children: null,
                  flexWrap: "wrap",
                  alignItems: "start"
                }, React.createElement(RimbleUi.Box, {
                      p: 1,
                      children: null,
                      width: [
                        1,
                        1,
                        0.3333
                      ],
                      className: Curry._1(Css.style, /* :: */[
                            Css.textAlign(/* center */98248149),
                            /* [] */0
                          ])
                    }, React.createElement("img", {
                          className: Curry._1(Css.style, /* :: */[
                                Css.borderRadius(/* `percent */[
                                      -119887163,
                                      100
                                    ]),
                                /* :: */[
                                  Css.width(/* `vh */[
                                        26418,
                                        25
                                      ]),
                                  /* :: */[
                                    Css.height(/* `vh */[
                                          26418,
                                          25
                                        ]),
                                    /* :: */[
                                      Css.objectFit(/* cover */-899416265),
                                      /* [] */0
                                    ]
                                  ]
                                ]
                              ]),
                          src: image
                        }), React.createElement("br", undefined), tmp), React.createElement(RimbleUi.Box, {
                      p: 1,
                      children: null,
                      width: [
                        1,
                        1,
                        0.3333
                      ]
                    }, React.createElement("h2", undefined, Globals$WildCards.restr("Monthly Contribution")), React.createElement("p", undefined, Globals$WildCards.reactMapWithDefault(optMonthlyCotribution, Globals$WildCards.restr("0 ETH"), (function (param) {
                                return React.createElement(React.Fragment, {
                                            children: null
                                          }, Globals$WildCards.restr("" + (String(param[0]) + " ETH\xa0")), Globals$WildCards.reactMap(param[1], (function (usdValue) {
                                                  return React.createElement("small", undefined, Globals$WildCards.restr("(" + (String(usdValue) + " USD)")));
                                                })));
                              })))), React.createElement(RimbleUi.Box, {
                      p: 1,
                      children: null,
                      width: [
                        1,
                        1,
                        0.3333
                      ]
                    }, currentlyOwnedTokens.length !== 0 ? React.createElement(React.Fragment, {
                            children: null
                          }, React.createElement(RimbleUi.Heading, {
                                children: "Currently owned tokens"
                              }), React.createElement(RimbleUi.Flex, {
                                children: Belt_Array.map(currentlyOwnedTokens, (function (tokenId) {
                                        return React.createElement(UserProfile$Token, {
                                                    tokenId: TokenId$WildCards.fromStringUnsafe(tokenId),
                                                    key: tokenId
                                                  });
                                      })),
                                flexWrap: "wrap",
                                className: centreAlignOnMobile
                              }), React.createElement("br", undefined), React.createElement("br", undefined), React.createElement("br", undefined)) : (
                        uniquePreviouslyOwnedTokens.length !== 0 ? React.createElement("p", undefined, Globals$WildCards.restr("User currently doesn't currently own a wildcard.")) : React.createElement("p", undefined, Globals$WildCards.restr("User has never owned a wildcard."))
                      ), uniquePreviouslyOwnedTokens.length !== 0 ? React.createElement(React.Fragment, {
                            children: null
                          }, React.createElement(RimbleUi.Heading, {
                                children: "Previously owned tokens"
                              }), React.createElement(RimbleUi.Flex, {
                                children: Belt_Array.map(uniquePreviouslyOwnedTokens, (function (tokenId) {
                                        return React.createElement(UserProfile$Token, {
                                                    tokenId: TokenId$WildCards.fromStringUnsafe(tokenId),
                                                    key: tokenId
                                                  });
                                      })),
                                flexWrap: "wrap",
                                className: centreAlignOnMobile
                              })) : null)));
}

var UserDetails = {
  make: UserProfile$UserDetails
};

function UserProfile(Props) {
  var userAddress = Props.userAddress;
  var userAddressLowerCase = userAddress.toLowerCase();
  var patronQuery = QlHooks$WildCards.usePatronQuery(userAddressLowerCase);
  var userInfoContext = UserProvider$WildCards.useUserInfoContext(undefined);
  Curry._2(userInfoContext.update, userAddressLowerCase, false);
  var optThreeBoxData = UserProvider$WildCards.use3BoxUserData(userAddressLowerCase);
  return React.createElement(RimbleUi.Flex, {
              children: patronQuery !== undefined ? React.createElement(UserProfile$UserDetails, {
                      patronQueryResult: Caml_option.valFromOption(patronQuery),
                      optThreeBoxData: optThreeBoxData,
                      userAddress: userAddress
                    }) : React.createElement("div", undefined, React.createElement(RimbleUi.Heading, {
                          children: "Loading user profile:"
                        }), React.createElement(RimbleUi.Loader, { })),
              flexWrap: "wrap",
              alignItems: "center",
              className: Styles$WildCards.topBody
            });
}

var make = UserProfile;

export {
  centreAlignOnMobile ,
  Token ,
  ClaimLoyaltyTokenButtons ,
  UserDetails ,
  make ,
  
}
/* centreAlignOnMobile Not a pure module */
