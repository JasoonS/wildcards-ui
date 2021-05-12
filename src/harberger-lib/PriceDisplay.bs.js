// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Styles from "../Styles.bs.js";
import * as QlHooks from "./QlHooks.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Float from "rescript/lib/es6/belt_Float.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as FormatMoney from "../components/components/FormatMoney.bs.js";
import * as UsdPriceProvider from "./components/UsdPriceProvider.bs.js";

function priceWeiToTuple(wei, optCurrentUsdEthPrice) {
  var totalPatronageEth = FormatMoney.toFixedWithPrecisionNoTrailingZerosEth(undefined, wei);
  var optTotaPatronageUsd = Belt_Option.map(optCurrentUsdEthPrice, (function (currentUsdEthPrice) {
          return FormatMoney.toFixedWithPrecisionNoTrailingZeros(Belt_Option.mapWithDefault(Belt_Float.fromString(totalPatronageEth), 0, (function (a) {
                            return a;
                          })) * currentUsdEthPrice, 2);
        }));
  return [
          totalPatronageEth,
          optTotaPatronageUsd
        ];
}

function usePrice(chain, animal) {
  var optPriceWei = QlHooks.usePrice(chain, animal);
  var optCurrentUsdEthPrice = UsdPriceProvider.useUsdPrice(undefined);
  if (typeof optPriceWei === "number") {
    return ;
  } else if (optPriceWei.TAG === /* Foreclosed */0) {
    return [
            "0",
            "0"
          ];
  } else {
    return priceWeiToTuple(optPriceWei._0, optCurrentUsdEthPrice);
  }
}

function PriceDisplay$PurePriceDisplay(Props) {
  var priceEth = Props.priceEth;
  var optPriceUsd = Props.optPriceUsd;
  return React.createElement(React.Fragment, undefined, React.createElement("p", {
                  className: Styles.noMarginTop + (" " + Styles.noMarginBottom)
                }, priceEth + " ETH"), optPriceUsd !== undefined ? React.createElement("p", {
                    className: Styles.noMarginTop
                  }, React.createElement("small", undefined, "(" + (optPriceUsd + " USD)"))) : null);
}

var PurePriceDisplay = {
  make: PriceDisplay$PurePriceDisplay
};

function PriceDisplay$InUSD(Props) {
  var chain = Props.chain;
  var animal = Props.animal;
  var optPriceWei = QlHooks.usePrice(chain, animal);
  if (typeof optPriceWei === "number") {
    return React.createElement(RimbleUi.Loader, {});
  } else if (optPriceWei.TAG === /* Foreclosed */0) {
    return React.createElement("p", {
                className: Styles.noMarginTop + (" " + Styles.noMarginBottom)
              }, "0 USD");
  } else {
    return React.createElement("p", {
                className: Styles.noMarginTop + (" " + Styles.noMarginBottom)
              }, FormatMoney.toFixedWithPrecisionNoTrailingZerosEth(undefined, optPriceWei._0) + " USD");
  }
}

var InUSD = {
  make: PriceDisplay$InUSD
};

function PriceDisplay$InEth(Props) {
  var chain = Props.chain;
  var animal = Props.animal;
  var optCurrentPrice = usePrice(chain, animal);
  if (optCurrentPrice !== undefined) {
    return React.createElement(PriceDisplay$PurePriceDisplay, {
                priceEth: optCurrentPrice[0],
                optPriceUsd: optCurrentPrice[1]
              });
  } else {
    return React.createElement(RimbleUi.Loader, {});
  }
}

var InEth = {
  make: PriceDisplay$InEth
};

function PriceDisplay(Props) {
  var chain = Props.chain;
  var animal = Props.animal;
  if (chain >= 2) {
    return React.createElement(PriceDisplay$InEth, {
                chain: chain,
                animal: animal
              });
  } else {
    return React.createElement(PriceDisplay$InUSD, {
                chain: chain,
                animal: animal
              });
  }
}

var make = PriceDisplay;

export {
  priceWeiToTuple ,
  usePrice ,
  PurePriceDisplay ,
  InUSD ,
  InEth ,
  make ,
  
}
/* react Not a pure module */
