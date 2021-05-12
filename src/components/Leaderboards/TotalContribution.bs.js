// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import BnJs from "bn.js";
import * as React from "react";
import * as Helper from "../../harberger-lib/Helper.bs.js";
import * as QlHooks from "../../harberger-lib/QlHooks.bs.js";
import * as CONSTANTS from "../../CONSTANTS.bs.js";
import * as Web3Utils from "../../harberger-lib/Web3Utils.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as RootProvider from "../../harberger-lib/RootProvider.bs.js";
import * as UserProvider from "../../harberger-lib/js/user-provider/UserProvider.bs.js";
import * as GqlConverters from "../../gql/GqlConverters.bs.js";
import * as ApolloClient__React_Hooks_UseQuery from "rescript-apollo-client/src/@apollo/client/react/hooks/ApolloClient__React_Hooks_UseQuery.bs.js";

var Raw = {};

var query = (require("@apollo/client").gql`
  query   {
    patrons(first: 30, orderBy: totalContributed, orderDirection: desc, where: {id_not: "0x6d47cf86f6a490c6410fc082fd1ad29cf61492d0"})  {
      __typename
      id
      patronTokenCostScaledNumerator
      totalContributed
      lastUpdated
    }
  }
`);

function parse(value) {
  var value$1 = value.patrons;
  return {
          patrons: value$1.map(function (value) {
                return {
                        __typename: value.__typename,
                        id: value.id,
                        patronTokenCostScaledNumerator: GqlConverters.$$BigInt.parse(value.patronTokenCostScaledNumerator),
                        totalContributed: GqlConverters.$$BigInt.parse(value.totalContributed),
                        lastUpdated: GqlConverters.$$BigInt.parse(value.lastUpdated)
                      };
              })
        };
}

function serialize(value) {
  var value$1 = value.patrons;
  var patrons = value$1.map(function (value) {
        var value$1 = value.lastUpdated;
        var value$2 = GqlConverters.$$BigInt.serialize(value$1);
        var value$3 = value.totalContributed;
        var value$4 = GqlConverters.$$BigInt.serialize(value$3);
        var value$5 = value.patronTokenCostScaledNumerator;
        var value$6 = GqlConverters.$$BigInt.serialize(value$5);
        var value$7 = value.id;
        var value$8 = value.__typename;
        return {
                __typename: value$8,
                id: value$7,
                patronTokenCostScaledNumerator: value$6,
                totalContributed: value$4,
                lastUpdated: value$2
              };
      });
  return {
          patrons: patrons
        };
}

function serializeVariables(param) {
  
}

function makeVariables(param) {
  
}

function makeDefaultVariables(param) {
  
}

var LoadMostContributed_inner = {
  Raw: Raw,
  query: query,
  parse: parse,
  serialize: serialize,
  serializeVariables: serializeVariables,
  makeVariables: makeVariables,
  makeDefaultVariables: makeDefaultVariables
};

var include = ApolloClient__React_Hooks_UseQuery.Extend({
      query: query,
      Raw: Raw,
      parse: parse,
      serialize: serialize,
      serializeVariables: serializeVariables
    });

var use = include.use;

var LoadMostContributed_refetchQueryDescription = include.refetchQueryDescription;

var LoadMostContributed_useLazy = include.useLazy;

var LoadMostContributed_useLazyWithVariables = include.useLazyWithVariables;

var LoadMostContributed = {
  LoadMostContributed_inner: LoadMostContributed_inner,
  Raw: Raw,
  query: query,
  parse: parse,
  serialize: serialize,
  serializeVariables: serializeVariables,
  makeVariables: makeVariables,
  makeDefaultVariables: makeDefaultVariables,
  refetchQueryDescription: LoadMostContributed_refetchQueryDescription,
  use: use,
  useLazy: LoadMostContributed_useLazy,
  useLazyWithVariables: LoadMostContributed_useLazyWithVariables
};

function calcTotalContibutedByPatron(timeElapsed, patronTokenCostScaledNumerator, totalContributed) {
  var amountContributedSinceLastUpdate = patronTokenCostScaledNumerator.mul(timeElapsed).div(CONSTANTS.secondsIn365DaysPrecisionScaled);
  return totalContributed.add(amountContributedSinceLastUpdate);
}

function useLoadMostContributedData(param) {
  var currentTimestamp = QlHooks.useCurrentTime(undefined);
  var match = Curry.app(use, [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ]);
  var match$1 = match.data;
  if (match.loading || match.error !== undefined || match$1 === undefined) {
    return ;
  } else {
    return Belt_Array.map(match$1.patrons, (function (param) {
                    var timeElapsed = new BnJs(currentTimestamp).sub(param.lastUpdated);
                    return [
                            param.id,
                            calcTotalContibutedByPatron(timeElapsed, param.patronTokenCostScaledNumerator, param.totalContributed)
                          ];
                  })).sort(function (param, param$1) {
                return param$1[1].cmp(param[1]);
              });
  }
}

var goldTrophyImg = "/img/icons/gold-trophy.png";

var silverTrophyImg = "/img/icons/silver-trophy.png";

var bronzeTrophyImg = "/img/icons/bronze-trophy.png";

var leaderboardTable = Curry._1(Css.style, {
      hd: Css.width({
            NAME: "percent",
            VAL: 100
          }),
      tl: {
        hd: Css.tableLayout("fixed"),
        tl: {
          hd: Css.overflowWrap("breakWord"),
          tl: /* [] */0
        }
      }
    });

var leaderboardHeader = Curry._1(Css.style, {
      hd: Css.backgroundColor({
            NAME: "hex",
            VAL: "73c7d7ff"
          }),
      tl: /* [] */0
    });

var streakTextLeaderboard = Curry._1(Css.style, {
      hd: Css.position(Css.absolute),
      tl: {
        hd: Css.zIndex(100),
        tl: {
          hd: Css.bottom({
                NAME: "percent",
                VAL: -10
              }),
          tl: {
            hd: Css.right({
                  NAME: "percent",
                  VAL: 50
                }),
            tl: {
              hd: Css.transform(Css.translateX({
                        NAME: "px",
                        VAL: -5
                      })),
              tl: /* [] */0
            }
          }
        }
      }
    });

var flameImgLeaderboard = Curry._1(Css.style, {
      hd: Css.width({
            NAME: "percent",
            VAL: 100
          }),
      tl: {
        hd: Css.maxWidth(Css.px(50)),
        tl: /* [] */0
      }
    });

var rankText = Curry._1(Css.style, {
      hd: Css.position(Css.absolute),
      tl: {
        hd: Css.zIndex(100),
        tl: {
          hd: Css.bottom({
                NAME: "percent",
                VAL: -10
              }),
          tl: {
            hd: Css.right({
                  NAME: "percent",
                  VAL: 50
                }),
            tl: {
              hd: Css.transform(Css.translate({
                        NAME: "px",
                        VAL: -4
                      }, {
                        NAME: "px",
                        VAL: -15
                      })),
              tl: /* [] */0
            }
          }
        }
      }
    });

var trophyImg = Curry._1(Css.style, {
      hd: Css.width({
            NAME: "percent",
            VAL: 100
          }),
      tl: {
        hd: Css.width(Css.px(50)),
        tl: {
          hd: Css.height(Css.px(50)),
          tl: /* [] */0
        }
      }
    });

var centerFlame = Curry._1(Css.style, {
      hd: Css.display(Css.block),
      tl: {
        hd: Css.margin(Css.auto),
        tl: {
          hd: Css.width({
                NAME: "px",
                VAL: 70
              }),
          tl: {
            hd: Css.position(Css.relative),
            tl: /* [] */0
          }
        }
      }
    });

var rankMetric = Curry._1(Css.style, {
      hd: Css.fontSize({
            NAME: "px",
            VAL: 16
          }),
      tl: /* [] */0
    });

function rankingColor(index) {
  return Curry._1(Css.style, {
              hd: Css.backgroundColor({
                    NAME: "hex",
                    VAL: index % 2 === 1 ? "b5b5bd22" : "ffffffff"
                  }),
              tl: /* [] */0
            });
}

function TotalContribution$ContributorsRow(Props) {
  var contributor = Props.contributor;
  var amount = Props.amount;
  var index = Props.index;
  Curry._2(UserProvider.useUserInfoContext(undefined).update, contributor, false);
  var optThreeBoxData = UserProvider.use3BoxUserData(contributor);
  var optUserName = Belt_Option.flatMap(Belt_Option.flatMap(optThreeBoxData, (function (threeBoxData) {
              return threeBoxData.profile;
            })), (function (threeBoxData) {
          return threeBoxData.name;
        }));
  var clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute(undefined);
  return React.createElement("tr", {
              key: contributor,
              className: rankingColor(index)
            }, React.createElement("td", undefined, React.createElement("span", {
                      className: centerFlame
                    }, index === 0 ? React.createElement("img", {
                            className: trophyImg,
                            src: goldTrophyImg
                          }) : (
                        index === 1 ? React.createElement("img", {
                                className: trophyImg,
                                src: silverTrophyImg
                              }) : (
                            index === 2 ? React.createElement("img", {
                                    className: trophyImg,
                                    src: bronzeTrophyImg
                                  }) : React.createElement("div", {
                                    className: trophyImg
                                  })
                          )
                      ), React.createElement("p", {
                          className: rankText
                        }, React.createElement("strong", undefined, "#", String(index + 1 | 0))))), React.createElement("td", undefined, React.createElement("a", {
                      onClick: (function (e) {
                          e.preventDefault();
                          return Curry._1(clearAndPush, "/#user/" + contributor);
                        })
                    }, optUserName !== undefined ? React.createElement("span", undefined, optUserName) : React.createElement("span", undefined, Helper.elipsify(contributor, 20)))), React.createElement("td", {
                  className: rankMetric
                }, amount + " ETH"));
}

var ContributorsRow = {
  make: TotalContribution$ContributorsRow
};

function TotalContribution$MostContributed(Props) {
  var highestContributors = Props.highestContributors;
  return Belt_Array.mapWithIndex(highestContributors, (function (index, param) {
                return React.createElement(TotalContribution$ContributorsRow, {
                            contributor: param[0],
                            amount: Web3Utils.fromWeiBNToEthPrecision(param[1], 4),
                            index: index
                          });
              }));
}

var MostContributed = {
  make: TotalContribution$MostContributed
};

function TotalContribution(Props) {
  var numberOfLeaders = Props.numberOfLeaders;
  var highestContributorsOpt = useLoadMostContributedData(undefined);
  var tmp;
  if (highestContributorsOpt !== undefined) {
    var highestContributors = Belt_Array.slice(highestContributorsOpt, 0, numberOfLeaders);
    tmp = React.createElement(TotalContribution$MostContributed, {
          highestContributors: highestContributors
        });
  } else {
    tmp = null;
  }
  return React.createElement("div", undefined, React.createElement(RimbleUi.Heading, {
                  children: "Wildcards Total Contribution Leaderboard"
                }), React.createElement("br", undefined), React.createElement(RimbleUi.Table, {
                  children: null,
                  className: leaderboardTable
                }, React.createElement("thead", {
                      className: leaderboardHeader
                    }, React.createElement("tr", undefined, React.createElement("th", undefined, "Rank"), React.createElement("th", undefined, "Guardian"), React.createElement("th", undefined, "Total Contribution"))), React.createElement("tbody", undefined, tmp)));
}

var make = TotalContribution;

export {
  LoadMostContributed ,
  calcTotalContibutedByPatron ,
  useLoadMostContributedData ,
  goldTrophyImg ,
  silverTrophyImg ,
  bronzeTrophyImg ,
  leaderboardTable ,
  leaderboardHeader ,
  streakTextLeaderboard ,
  flameImgLeaderboard ,
  rankText ,
  trophyImg ,
  centerFlame ,
  rankMetric ,
  rankingColor ,
  ContributorsRow ,
  MostContributed ,
  make ,
  
}
/* query Not a pure module */
