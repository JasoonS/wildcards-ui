// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Animal from "../harberger-lib/Animal.bs.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.bs.js";

function useUrlState(param) {
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  return React.useMemo((function () {
                var urlArray = url.hash.split("/");
                var exit = 0;
                var animalStr;
                var tab;
                var animalStr$1;
                var len = urlArray.length;
                if (len >= 6) {
                  exit = 1;
                } else {
                  switch (len) {
                    case 0 :
                        exit = 1;
                        break;
                    case 1 :
                        var match = urlArray[0];
                        switch (match) {
                          case "dao" :
                              return /* VotePage */3;
                          case "increase-iteration" :
                              return /* IncreaseVoteIteration */2;
                          case "organisations" :
                              return /* Organisations */0;
                          default:
                            exit = 1;
                        }
                        break;
                    case 2 :
                        var match$1 = urlArray[0];
                        switch (match$1) {
                          case "artist" :
                              var id = urlArray[1];
                              return {
                                      TAG: /* Artist */1,
                                      _0: id
                                    };
                          case "details" :
                              var animalStr$2 = urlArray[1];
                              var optionAnimal = Animal.getAnimal(animalStr$2);
                              return {
                                      TAG: /* Home */5,
                                      _0: /* DetailView */{
                                        _0: optionAnimal
                                      }
                                    };
                          case "leaderboards" :
                              var leaderboardType = urlArray[1];
                              switch (leaderboardType) {
                                case "days-held" :
                                    return {
                                            TAG: /* Leaderboards */4,
                                            _0: /* TotalDaysHeld */1
                                          };
                                case "monthly-contribution" :
                                    return {
                                            TAG: /* Leaderboards */4,
                                            _0: /* MonthlyContribution */3
                                          };
                                case "total-contribution" :
                                    return {
                                            TAG: /* Leaderboards */4,
                                            _0: /* TotalContribution */0
                                          };
                                default:
                                  return {
                                          TAG: /* Leaderboards */4,
                                          _0: /* Unknown */2
                                        };
                              }
                          case "org" :
                              var orgId = urlArray[1];
                              return {
                                      TAG: /* Org */2,
                                      _0: orgId.toLowerCase(),
                                      _1: undefined
                                    };
                          case "user" :
                              var address = urlArray[1];
                              return {
                                      TAG: /* User */0,
                                      _0: address.toLowerCase()
                                    };
                          default:
                            exit = 1;
                        }
                        break;
                    case 3 :
                        var match$2 = urlArray[0];
                        switch (match$2) {
                          case "explorer" :
                              var match$3 = urlArray[1];
                              if (match$3 === "details") {
                                var animalStr$3 = urlArray[2];
                                animalStr = animalStr$3;
                                exit = 2;
                              } else {
                                exit = 1;
                              }
                              break;
                          case "org" :
                              var orgId$1 = urlArray[1];
                              var wildcardId = urlArray[2];
                              return {
                                      TAG: /* Org */2,
                                      _0: orgId$1.toLowerCase(),
                                      _1: Belt_Int.fromString(wildcardId)
                                    };
                          default:
                            exit = 1;
                        }
                        break;
                    case 4 :
                        var match$4 = urlArray[0];
                        if (match$4 === "explorer") {
                          var tab$1 = urlArray[1];
                          var exit$1 = 0;
                          if (tab$1 === "details") {
                            var animalStr$4 = urlArray[2];
                            var match$5 = urlArray[3];
                            if (match$5 === "") {
                              animalStr = animalStr$4;
                              exit = 2;
                            } else {
                              exit$1 = 4;
                            }
                          } else {
                            exit$1 = 4;
                          }
                          if (exit$1 === 4) {
                            var match$6 = urlArray[2];
                            if (match$6 === "details") {
                              var animalStr$5 = urlArray[3];
                              tab = tab$1;
                              animalStr$1 = animalStr$5;
                              exit = 3;
                            } else {
                              exit = 1;
                            }
                          }
                          
                        } else {
                          exit = 1;
                        }
                        break;
                    case 5 :
                        var match$7 = urlArray[0];
                        if (match$7 === "explorer") {
                          var tab$2 = urlArray[1];
                          var match$8 = urlArray[2];
                          if (match$8 === "details") {
                            var animalStr$6 = urlArray[3];
                            var match$9 = urlArray[4];
                            if (match$9 === "") {
                              tab = tab$2;
                              animalStr$1 = animalStr$6;
                              exit = 3;
                            } else {
                              exit = 1;
                            }
                          } else {
                            exit = 1;
                          }
                        } else {
                          exit = 1;
                        }
                        break;
                    
                  }
                }
                switch (exit) {
                  case 1 :
                      var match$10 = Belt_Option.getWithDefault(Belt_Array.get(urlArray, 0), "");
                      switch (match$10) {
                        case "explorer" :
                            var match$11 = Belt_Option.getWithDefault(Belt_Array.get(urlArray, 1), "");
                            var tmp;
                            switch (match$11) {
                              case "1st-edition" :
                                  tmp = /* Gen1 */0;
                                  break;
                              case "2nd-edition" :
                                  tmp = /* Gen2 */1;
                                  break;
                              default:
                                tmp = /* Gen2 */1;
                            }
                            return {
                                    TAG: /* Explorer */3,
                                    _0: tmp,
                                    _1: /* NormalView */0
                                  };
                        case "team" :
                            return /* Team */1;
                        default:
                          return {
                                  TAG: /* Home */5,
                                  _0: /* NormalView */0
                                };
                      }
                  case 2 :
                      var optionAnimal$1 = Animal.getAnimal(animalStr);
                      return {
                              TAG: /* Explorer */3,
                              _0: /* Gen2 */1,
                              _1: /* DetailView */{
                                _0: optionAnimal$1
                              }
                            };
                  case 3 :
                      var optionAnimal$2 = Animal.getAnimal(animalStr$1);
                      var tmp$1;
                      switch (tab) {
                        case "1st-edition" :
                            tmp$1 = /* Gen1 */0;
                            break;
                        case "2nd-edition" :
                            tmp$1 = /* Gen2 */1;
                            break;
                        default:
                          tmp$1 = /* Gen1 */0;
                      }
                      return {
                              TAG: /* Explorer */3,
                              _0: tmp$1,
                              _1: /* DetailView */{
                                _0: optionAnimal$2
                              }
                            };
                  
                }
              }), [url.hash]);
}

function useIsExplorer(param) {
  var urlState = useUrlState(undefined);
  return React.useMemo((function () {
                if (typeof urlState === "number" || urlState.TAG !== /* Explorer */3) {
                  return false;
                } else {
                  return true;
                }
              }), [urlState]);
}

function isDetailsAnimalPage(animalPageState) {
  if (animalPageState) {
    return true;
  } else {
    return false;
  }
}

function useIsDetails(param) {
  var urlState = useUrlState(undefined);
  return React.useMemo((function () {
                if (typeof urlState === "number") {
                  return false;
                }
                switch (urlState.TAG | 0) {
                  case /* Explorer */3 :
                      return isDetailsAnimalPage(urlState._1);
                  case /* Home */5 :
                      return isDetailsAnimalPage(urlState._0);
                  default:
                    return false;
                }
              }), [urlState]);
}

function useIsHome(param) {
  var urlState = useUrlState(undefined);
  return React.useMemo((function () {
                if (typeof urlState === "number" || !(urlState.TAG === /* Home */5 && !urlState._0)) {
                  return false;
                } else {
                  return true;
                }
              }), [urlState]);
}

function getAnimalFormAnimalPageState(animalPageState) {
  if (animalPageState) {
    return animalPageState._0;
  }
  
}

function useAnimalForDetails(param) {
  var urlState = useUrlState(undefined);
  return React.useMemo((function () {
                if (typeof urlState === "number") {
                  return ;
                }
                switch (urlState.TAG | 0) {
                  case /* Explorer */3 :
                      return getAnimalFormAnimalPageState(urlState._1);
                  case /* Home */5 :
                      return getAnimalFormAnimalPageState(urlState._0);
                  default:
                    return ;
                }
              }), [urlState]);
}

export {
  useUrlState ,
  useIsExplorer ,
  isDetailsAnimalPage ,
  useIsDetails ,
  useIsHome ,
  getAnimalFormAnimalPageState ,
  useAnimalForDetails ,
  
}
/* react Not a pure module */
