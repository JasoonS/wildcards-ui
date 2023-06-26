// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as CssJs from "bs-css-emotion/src/CssJs.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import BnJs from "bn.js";
import * as React from "react";
import * as Animal from "../harberger-lib/Animal.bs.js";
import * as Helper from "../harberger-lib/Helper.bs.js";
import * as Styles from "../Styles.bs.js";
import * as Amounts from "./Amounts.bs.js";
import * as Blockie from "../harberger-lib/bindings/ethereum-blockies-base64/Blockie.bs.js";
import * as Globals from "../harberger-lib/Globals.bs.js";
import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Js_json from "rescript/lib/es6/js_json.js";
import * as QlHooks from "../harberger-lib/QlHooks.bs.js";
import * as TokenId from "../harberger-lib/TokenId.bs.js";
import * as Validate from "./Validate.bs.js";
import * as CONSTANTS from "../CONSTANTS.bs.js";
import * as Web3Utils from "../harberger-lib/Web3Utils.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as RootProvider from "../harberger-lib/RootProvider.bs.js";
import * as UserProvider from "../harberger-lib/js/user-provider/UserProvider.bs.js";
import * as ActionButtons from "./ActionButtons.bs.js";
import * as UpdateDeposit from "../harberger-lib/components/UpdateDeposit.bs.js";
import * as Belt_SetString from "rescript/lib/es6/belt_SetString.js";
import * as ContractActions from "../harberger-lib/eth/ContractActions.bs.js";
import * as TotalContribution from "./Leaderboards/TotalContribution.bs.js";
import * as JsxPPXReactSupport from "rescript/lib/es6/jsxPPXReactSupport.js";
import * as LazyThreeBoxUpdate from "./LazyThreeBoxUpdate.bs.js";

var centreAlignOnMobile = Curry._1(Css.style, {
      hd: Css.media("(max-width: 831px)", {
            hd: Css.alignItems(Css.center),
            tl: {
              hd: Css.justifyContent(Css.center),
              tl: /* [] */0
            }
          }),
      tl: /* [] */0
    });

function UserProfile$Token(props) {
  var tokenId = props.tokenId;
  var clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute(undefined);
  var image = Animal.useAvatar(tokenId);
  return React.createElement("div", {
              className: CssJs.style([
                    CssJs.width(CssJs.vh(12)),
                    CssJs.cursor("pointer"),
                    Styles.imageHoverStyle
                  ])
            }, React.createElement("img", {
                  className: Curry._1(Css.style, {
                        hd: Css.width({
                              NAME: "percent",
                              VAL: 100
                            }),
                        tl: /* [] */0
                      }),
                  src: image,
                  onClick: (function (_e) {
                      Curry._1(clearAndPush, "/#details/" + TokenId.toString(tokenId));
                    })
                }));
}

var Token = {
  make: UserProfile$Token
};

function UserProfile$ClaimLoyaltyTokenButtons(props) {
  var refreshLoyaltyTokenBalance = props.refreshLoyaltyTokenBalance;
  var tokenId = TokenId.fromStringUnsafe(props.id);
  var match = ContractActions.useRedeemLoyaltyTokens(props.userAddress);
  var transactionStatus = match[1];
  var redeemLoyaltyTokens = match[0];
  var balanceAvailableOnTokens = QlHooks.useUnredeemedLoyaltyTokenDueForUser(props.chain, tokenId, props.numberOfTokens);
  var etherScanUrl = RootProvider.useEtherscanUrl(undefined);
  React.useEffect((function () {
          if (typeof transactionStatus !== "number" && transactionStatus.TAG === /* Complete */4) {
            Curry._1(refreshLoyaltyTokenBalance, undefined);
          }
          
        }), [
        transactionStatus,
        refreshLoyaltyTokenBalance
      ]);
  if (balanceAvailableOnTokens === undefined) {
    return null;
  }
  var tmp;
  if (typeof transactionStatus === "number") {
    switch (transactionStatus) {
      case /* UnInitialised */0 :
          tmp = React.createElement("p", undefined, React.createElement("a", {
                    onClick: (function (param) {
                        Curry._1(redeemLoyaltyTokens, undefined);
                      })
                  }, "Redeem " + (Web3Utils.fromWeiBNToEthPrecision(Caml_option.valFromOption(balanceAvailableOnTokens), 5) + " loyalty tokens")));
          break;
      case /* Failed */4 :
          tmp = React.createElement("p", undefined, "Transaction failed");
          break;
      default:
        tmp = React.createElement("p", undefined, "Transaction Created");
    }
  } else {
    switch (transactionStatus.TAG | 0) {
      case /* SignedAndSubmitted */1 :
          tmp = React.createElement("p", undefined, "Processing: ", React.createElement("a", {
                    href: "https://" + (etherScanUrl + ("/tx/" + transactionStatus._0)),
                    rel: "noopener noreferrer",
                    target: "_blank"
                  }, "view transaction"));
          break;
      case /* Declined */2 :
          tmp = React.createElement("p", undefined, "Submitting transaction failed: " + transactionStatus._0);
          break;
      case /* Complete */4 :
          tmp = React.createElement("p", undefined, "Tokens claimed (please reload the page, this will be improved soon)");
          break;
      default:
        tmp = React.createElement("p", undefined, "Transaction Created");
    }
  }
  return React.createElement("small", undefined, tmp);
}

var ClaimLoyaltyTokenButtons = {
  make: UserProfile$ClaimLoyaltyTokenButtons
};

function UserProfile$UserDetails(props) {
  var userAddress = props.userAddress;
  var optThreeBoxData = props.optThreeBoxData;
  var patronQueryResultMatic = props.patronQueryResultMatic;
  var patronQueryResultMainnet = props.patronQueryResultMainnet;
  var isForeclosedMainnet = QlHooks.useIsForeclosed(/* MainnetQuery */2, userAddress);
  var isForeclosedMatic = QlHooks.useIsForeclosed(/* MaticQuery */1, userAddress);
  var isAddressCurrentUser = RootProvider.useIsAddressCurrentUser(userAddress);
  var currentlyOwnedTokens = Belt_Array.concat(isForeclosedMainnet ? [] : Belt_Option.mapWithDefault(patronQueryResultMainnet, [], (function (patronMainnet) {
                return Belt_Array.map(patronMainnet.tokens, (function (token) {
                              return Belt_Option.getWithDefault(Js_json.decodeString(token.tokenId), "0");
                            }));
              })), isForeclosedMatic ? [] : Belt_Option.mapWithDefault(patronQueryResultMatic, [], (function (patronMainnet) {
                return Belt_Array.map(patronMainnet.tokens, (function (token) {
                              return Belt_Option.getWithDefault(Js_json.decodeString(token.tokenId), "0");
                            }));
              })));
  var allPreviouslyOwnedTokens = Belt_Array.concat(Belt_Option.mapWithDefault(patronQueryResultMainnet, [], (function (patronMainnet) {
              return Belt_Array.map(patronMainnet.previouslyOwnedTokens, (function (token) {
                            return Belt_Option.getWithDefault(Js_json.decodeString(token.tokenId), "0");
                          }));
            })), Belt_Option.mapWithDefault(patronQueryResultMatic, [], (function (patronMainnet) {
              return Belt_Array.map(patronMainnet.previouslyOwnedTokens, (function (token) {
                            return Belt_Option.getWithDefault(Js_json.decodeString(token.tokenId), "0");
                          }));
            })));
  var uniquePreviouslyOwnedTokens = Belt_SetString.toArray(Belt_SetString.removeMany(Belt_SetString.fromArray(allPreviouslyOwnedTokens), currentlyOwnedTokens));
  var optProfile = Belt_Option.flatMap(optThreeBoxData, (function (a) {
          return a.profile;
        }));
  var image = Belt_Option.mapWithDefault(Belt_Option.flatMap(Belt_Option.map(Belt_Option.flatMap(Belt_Option.flatMap(optProfile, (function (a) {
                          return a.image;
                        })), (function (img) {
                      return Belt_Array.get(img, 0);
                    })), (function (a) {
                  return a.contentUrl;
                })), (function (content) {
              return Js_dict.get(content, "/");
            })), Blockie.makeBlockie(userAddress), (function (hash) {
          return "https://ipfs.infura.io/ipfs/" + hash;
        }));
  var optName = Belt_Option.flatMap(optProfile, (function (a) {
          return a.name;
        }));
  var optDescription = Belt_Option.flatMap(optProfile, (function (a) {
          return a.description;
        }));
  var optTwitter = Belt_Option.map(Belt_Option.flatMap(Belt_Option.flatMap(optThreeBoxData, (function (a) {
                  return a.verifications;
                })), (function (a) {
              return a.twitter;
            })), (function (a) {
          return a.username;
        }));
  var etherScanUrl = RootProvider.useEtherscanUrl(undefined);
  var monthlyContributionWei = isForeclosedMainnet ? CONSTANTS.zeroBn : Belt_Option.mapWithDefault(patronQueryResultMainnet, CONSTANTS.zeroBn, (function (patronMainnet) {
            return patronMainnet.patronTokenCostScaledNumerator.mul(CONSTANTS.secondsInAMonthBn).div(CONSTANTS.secondsIn365DaysPrecisionScaled);
          }));
  var monthlyContributionDai = isForeclosedMatic ? CONSTANTS.zeroBn : Belt_Option.mapWithDefault(patronQueryResultMatic, CONSTANTS.zeroBn, (function (patronMainnet) {
            return patronMainnet.patronTokenCostScaledNumerator.mul(CONSTANTS.secondsInAMonthBn).div(CONSTANTS.secondsIn365DaysPrecisionScaled);
          }));
  var currentTimestamp = QlHooks.useCurrentTime(undefined);
  var totalContributionWei = Belt_Option.mapWithDefault(patronQueryResultMainnet, CONSTANTS.zeroBn, (function (param) {
          var timeElapsed = new BnJs(currentTimestamp).sub(param.lastUpdated);
          return TotalContribution.calcTotalContibutedByPatron(timeElapsed, param.patronTokenCostScaledNumerator, param.totalContributed);
        }));
  var totalContributionDai = Belt_Option.mapWithDefault(patronQueryResultMatic, CONSTANTS.zeroBn, (function (param) {
          var timeElapsed = new BnJs(currentTimestamp).sub(param.lastUpdated);
          return TotalContribution.calcTotalContibutedByPatron(timeElapsed, param.patronTokenCostScaledNumerator, param.totalContributed);
        }));
  var match = ContractActions.useUserLoyaltyTokenBalance(userAddress);
  var totalLoyaltyTokensAvailableAndClaimedOpt = QlHooks.useTotalLoyaltyToken(/* MainnetQuery */2, userAddress);
  var nonUrlState = RootProvider.useNonUrlState(undefined);
  var clearNonUrlState = RootProvider.useClearNonUrlState(undefined);
  var tmp;
  var exit = 0;
  if (typeof nonUrlState === "number") {
    switch (nonUrlState) {
      case /* UserVerificationScreen */0 :
          tmp = React.createElement("div", {
                className: Curry._1(Css.style, {
                      hd: Css.position("relative"),
                      tl: /* [] */0
                    })
              }, React.createElement(RimbleUi.Button.Text, {
                    onClick: (function (param) {
                        Curry._1(clearNonUrlState, undefined);
                      }),
                    icononly: true,
                    icon: "Close",
                    color: "moon-gray",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    m: 1
                  }), React.createElement(React.Suspense, {
                    children: Caml_option.some(React.createElement(LazyThreeBoxUpdate.make, {})),
                    fallback: Caml_option.some(React.createElement(RimbleUi.Loader, {}))
                  }));
          break;
      case /* UpdateDepositScreen */1 :
          tmp = React.createElement("div", {
                className: Curry._1(Css.style, {
                      hd: Css.position("relative"),
                      tl: /* [] */0
                    })
              }, React.createElement(RimbleUi.Button.Text, {
                    onClick: (function (param) {
                        Curry._1(clearNonUrlState, undefined);
                      }),
                    icononly: true,
                    icon: "Close",
                    color: "moon-gray",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    m: 1
                  }), React.createElement(UpdateDeposit.make, {
                    closeButtonText: "Close",
                    chain: /* MainnetQuery */2
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
    tmp = React.createElement(React.Fragment, undefined, Globals.reactMap(optName, (function (name) {
                return React.createElement("h2", undefined, name);
              })), Globals.reactMap(optTwitter, (function (twitterHandle) {
                return React.createElement("a", {
                            className: Styles.navListText,
                            href: "https://twitter.com/" + twitterHandle,
                            rel: "noopener noreferrer",
                            target: "_blank"
                          }, "@" + twitterHandle);
              })), React.createElement("br", undefined), Globals.reactMap(optDescription, (function (description) {
                return React.createElement("p", undefined, description);
              })), React.createElement("a", {
              className: Styles.navListText,
              href: "https://" + (etherScanUrl + ("/address/" + userAddress)),
              rel: "noopener noreferrer",
              target: "_blank"
            }, Helper.elipsify(userAddress, 10)), React.createElement("br", undefined), isAddressCurrentUser ? React.createElement(React.Fragment, undefined, React.createElement("small", undefined, React.createElement("p", undefined, "Claimed Loyalty Token Balance: " + (Belt_Option.mapWithDefault(match[0], "Loading", (function (claimedLoyaltyTokens) {
                                return Web3Utils.fromWeiBNToEthPrecision(claimedLoyaltyTokens, 6);
                              })) + " WLT"))), currentlyOwnedTokens.length !== 0 ? React.createElement(UserProfile$ClaimLoyaltyTokenButtons, {
                      chain: props.chain,
                      userAddress: userAddress,
                      id: currentlyOwnedTokens[0],
                      refreshLoyaltyTokenBalance: match[1],
                      numberOfTokens: currentlyOwnedTokens.length
                    }) : null, React.createElement("a", {
                    href: "/#ethturin-quadratic-voting"
                  }, "vote")) : React.createElement("small", undefined, React.createElement("p", undefined, "Loyalty Token Balance Generated: " + (Belt_Option.mapWithDefault(totalLoyaltyTokensAvailableAndClaimedOpt, "Loading", (function (param) {
                            return Web3Utils.fromWeiBNToEthPrecision(param[0], 5);
                          })) + " WLT"))), isAddressCurrentUser ? React.createElement(React.Fragment, {
                children: null
              }, React.createElement("br", undefined), React.createElement(ActionButtons.UpdateDeposit.make, {}), React.createElement("br", undefined), React.createElement(Validate.make, {})) : null);
  }
  return React.createElement("div", {
              className: Curry._1(Css.style, {
                    hd: Css.width({
                          NAME: "percent",
                          VAL: 100
                        }),
                    tl: /* [] */0
                  })
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
                      className: Curry._1(Css.style, {
                            hd: Css.textAlign("center"),
                            tl: /* [] */0
                          })
                    }, React.createElement("img", {
                          className: Curry._1(Css.style, {
                                hd: Css.borderRadius({
                                      NAME: "percent",
                                      VAL: 100
                                    }),
                                tl: {
                                  hd: Css.width({
                                        NAME: "vh",
                                        VAL: 25
                                      }),
                                  tl: {
                                    hd: Css.height({
                                          NAME: "vh",
                                          VAL: 25
                                        }),
                                    tl: {
                                      hd: Css.objectFit("cover"),
                                      tl: /* [] */0
                                    }
                                  }
                                }
                              }),
                          src: image
                        }), React.createElement("br", undefined), tmp), React.createElement(RimbleUi.Box, {
                      p: 1,
                      children: null,
                      width: [
                        1,
                        1,
                        0.3333
                      ]
                    }, React.createElement("h2", undefined, "Monthly Contribution"), React.createElement(Amounts.Basic.make, {
                          mainnetEth: monthlyContributionWei,
                          maticDai: monthlyContributionDai
                        }), React.createElement("h2", undefined, "Total Contributed"), React.createElement(Amounts.AmountRaised.make, {
                          mainnetEth: totalContributionWei,
                          maticDai: totalContributionDai
                        })), React.createElement(RimbleUi.Box, {
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
                                children: "Currently owned Wildcards"
                              }), React.createElement(RimbleUi.Flex, {
                                children: Belt_Array.map(currentlyOwnedTokens, (function (tokenId) {
                                        return JsxPPXReactSupport.createElementWithKey(tokenId, UserProfile$Token, {
                                                    tokenId: TokenId.fromStringUnsafe(tokenId)
                                                  });
                                      })),
                                flexWrap: "wrap",
                                className: centreAlignOnMobile
                              }), React.createElement("br", undefined), React.createElement("br", undefined), React.createElement("br", undefined)) : (
                        uniquePreviouslyOwnedTokens.length !== 0 ? React.createElement("p", undefined, "User currently doesn't own a wildcard.") : React.createElement("p", undefined, "User has never owned a wildcard.")
                      ), uniquePreviouslyOwnedTokens.length !== 0 ? React.createElement(React.Fragment, {
                            children: null
                          }, React.createElement(RimbleUi.Heading, {
                                children: "Previously owned Wildcards"
                              }), React.createElement(RimbleUi.Flex, {
                                children: Belt_Array.map(uniquePreviouslyOwnedTokens, (function (tokenId) {
                                        return JsxPPXReactSupport.createElementWithKey(tokenId, UserProfile$Token, {
                                                    tokenId: TokenId.fromStringUnsafe(tokenId)
                                                  });
                                      })),
                                flexWrap: "wrap",
                                className: centreAlignOnMobile
                              })) : null)));
}

var UserDetails = {
  make: UserProfile$UserDetails
};

function UserProfile(props) {
  var userAddress = props.userAddress;
  var userAddressLowerCase = userAddress.toLowerCase();
  var patronQuery = QlHooks.useQueryPatronQuery(/* MainnetQuery */2, undefined, userAddressLowerCase);
  var patronQueryMatic = QlHooks.useQueryPatronQuery(/* MaticQuery */1, undefined, userAddressLowerCase);
  var userInfoContext = UserProvider.useUserInfoContext(undefined);
  Curry._2(userInfoContext.update, userAddressLowerCase, false);
  var optThreeBoxData = UserProvider.use3BoxUserData(userAddressLowerCase);
  var tmp;
  var exit = 0;
  if (patronQuery.loading || patronQueryMatic.loading) {
    exit = 1;
  } else {
    tmp = patronQueryMatic.error !== undefined || patronQuery.error !== undefined ? "There was an error loading some of this user's data" : React.createElement(UserProfile$UserDetails, {
            chain: props.chain,
            patronQueryResultMainnet: Belt_Option.flatMap(patronQuery.data, (function (param) {
                    return param.patron;
                  })),
            patronQueryResultMatic: Belt_Option.flatMap(patronQueryMatic.data, (function (param) {
                    return param.patron;
                  })),
            optThreeBoxData: optThreeBoxData,
            userAddress: userAddress
          });
  }
  if (exit === 1) {
    tmp = React.createElement("div", undefined, React.createElement(RimbleUi.Heading, {
              children: "Loading user profile:"
            }), React.createElement(RimbleUi.Loader, {}));
  }
  return React.createElement(RimbleUi.Flex, {
              children: tmp,
              flexWrap: "wrap",
              alignItems: "center",
              className: Styles.topBody
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
