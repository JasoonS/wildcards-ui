// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as InputHelp from "../InputHelp.bs.js";
import * as TxTemplate from "../../components/components/TxTemplate.bs.js";
import * as Web3Utils from "web3-utils";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as ContractActions from "../eth/ContractActions.bs.js";
import * as Core from "@web3-react/core";
import UpdateDepositInput from "./UpdateDepositInput";

var make = UpdateDepositInput;

var UpdateDepositInput$1 = {
  make: make
};

function getToDisplay(label, value) {
  return label + (": " + Belt_Option.mapWithDefault(value, "loading", (function (a) {
                  return a;
                })));
}

function UpdateDeposit(Props) {
  var closeButtonText = Props.closeButtonText;
  var chain = Props.chain;
  var match = React.useState(function () {
        return "";
      });
  var setDepositChange = match[1];
  var depositChange = match[0];
  var match$1 = React.useState(function () {
        return true;
      });
  var setIsAddDeposit = match$1[1];
  var isAddDeposit = match$1[0];
  var web3Context = Core.useWeb3React();
  var match$2 = ContractActions.useUpdateDeposit(chain, web3Context.library, web3Context.account, Belt_Option.getWithDefault(web3Context.chainId, 1));
  var depositFunc = match$2[0];
  var match$3 = ContractActions.useWithdrawDeposit(chain, web3Context.library, web3Context.account, Belt_Option.getWithDefault(web3Context.chainId, 1));
  var withdrawFunc = match$3[0];
  var onSubmitDepositChange = function ($$event) {
    $$event.preventDefault();
    var depositChangeWei = Web3Utils.toWei(depositChange, "ether");
    if (isAddDeposit) {
      return Curry._1(depositFunc, depositChangeWei);
    } else {
      return Curry._1(withdrawFunc, depositChangeWei);
    }
  };
  var updateDepositChange = function ($$event) {
    $$event.preventDefault();
    return InputHelp.onlyUpdateIfPositiveFloat(depositChange, setDepositChange, $$event);
  };
  var updateIsAddDeposit = function (isDeposit) {
    return Curry._1(setIsAddDeposit, (function (param) {
                  return isDeposit;
                }));
  };
  return React.createElement(TxTemplate.make, {
              children: React.createElement(TxTemplate.make, {
                    children: React.createElement(make, {
                          depositChange: depositChange,
                          updateDepositChange: updateDepositChange,
                          isAddDeposit: isAddDeposit,
                          updateIsAddDeposit: updateIsAddDeposit,
                          onSubmitDepositChange: onSubmitDepositChange
                        }),
                    txState: match$2[1],
                    closeButtonText: closeButtonText,
                    chain: chain
                  }),
              txState: match$3[1],
              closeButtonText: closeButtonText,
              chain: chain
            });
}

var make$1 = UpdateDeposit;

export {
  UpdateDepositInput$1 as UpdateDepositInput,
  getToDisplay ,
  make$1 as make,
  
}
/* make Not a pure module */
