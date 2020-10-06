// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as UserProvider from "./UserProvider";
import * as Helper$WildCards from "../../Helper.bs.js";
import * as Globals$WildCards from "../../Globals.bs.js";

var make = UserProvider.UserInfoProvider;

function useUserInfoContext(prim) {
  return UserProvider.useUserInfoContext();
}

function useDisplayName(ethAddress) {
  var userContext = UserProvider.useUserInfoContext();
  var ethAddressLower = ethAddress.toLowerCase();
  var opt3box = Globals$WildCards.$less$$great(Js_dict.get(userContext.userInfo, ethAddressLower), (function (a) {
          return a.threeBox;
        }));
  var opt3boxName = Globals$WildCards.$great$great$eq(Globals$WildCards.$great$great$eq(opt3box, (function (a) {
              return a.profile;
            })), (function (a) {
          return a.name;
        }));
  return Belt_Option.mapWithDefault(opt3boxName, Belt_Option.mapWithDefault(Globals$WildCards.$less$$great(Globals$WildCards.$great$great$eq(Globals$WildCards.$great$great$eq(opt3box, (function (a) {
                                return a.verifications;
                              })), (function (a) {
                            return a.twitter;
                          })), (function (a) {
                        return a.username;
                      })), /* EthAddress */Block.__(2, [ethAddress]), (function (a) {
                    return /* TwitterHandle */Block.__(0, [a]);
                  })), (function (a) {
                return /* ThreeBoxName */Block.__(1, [a]);
              }));
}

function use3BoxUserData(ethAddress) {
  var userContext = UserProvider.useUserInfoContext();
  var ethAddressLower = ethAddress.toLowerCase();
  var userInfo = Js_dict.get(userContext.userInfo, ethAddressLower);
  if (userInfo !== undefined) {
    return userInfo.threeBox;
  }
  
}

function useIsUserValidated(ethAddress) {
  var match = useDisplayName(ethAddress);
  switch (match.tag | 0) {
    case /* TwitterHandle */0 :
        return true;
    case /* ThreeBoxName */1 :
    case /* EthAddress */2 :
        return false;
    
  }
}

function displayNameToString(displayName) {
  switch (displayName.tag | 0) {
    case /* TwitterHandle */0 :
    case /* ThreeBoxName */1 :
        return displayName[0];
    case /* EthAddress */2 :
        return Helper$WildCards.elipsify(displayName[0], 12);
    
  }
}

export {
  make ,
  useUserInfoContext ,
  useDisplayName ,
  use3BoxUserData ,
  useIsUserValidated ,
  displayNameToString ,
  
}
/* make Not a pure module */
