// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Styles from "../../Styles.bs.js";
import * as Amounts from "../Amounts.bs.js";
import * as QlHooks from "../../harberger-lib/QlHooks.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function TotalRaised(Props) {
  var optTotalPatronageWei = QlHooks.useAmountRaised(/* MainnetQuery */2);
  var optTotalPatronageDai = QlHooks.useAmountRaised(/* MaticQuery */1);
  if (optTotalPatronageWei !== undefined && optTotalPatronageDai !== undefined) {
    return React.createElement("div", {
                className: Curry._1(Css.style, {
                      hd: Css.display("flex"),
                      tl: {
                        hd: Css.alignItems("center"),
                        tl: {
                          hd: Css.justifyContent("center"),
                          tl: {
                            hd: Css.flexDirection("column"),
                            tl: /* [] */0
                          }
                        }
                      }
                    })
              }, React.createElement("p", {
                    className: Curry._1(Css.style, {
                          hd: Css.display("table"),
                          tl: /* [] */0
                        })
                  }, "Wildcards has currently raised ", React.createElement("br", undefined), React.createElement(Amounts.AmountRaised.make, {
                        populateElement: (function (bigTextComponent, smallTextComponent, optCommentTextComponent) {
                            return React.createElement(React.Fragment, undefined, React.createElement("span", {
                                            className: Styles.totalRaisedText(4)
                                          }, bigTextComponent, React.createElement("span", {
                                                className: Styles.totalRaisedText(0.75)
                                              }, smallTextComponent), React.createElement("strong", undefined, " USD")), React.createElement("br", undefined), optCommentTextComponent !== undefined ? React.createElement(React.Fragment, {
                                              children: React.createElement("span", {
                                                    className: Styles.totalRaisedText(2)
                                                  }, Caml_option.valFromOption(optCommentTextComponent))
                                            }) : null, React.createElement("br", undefined), React.createElement("span", {
                                            className: Styles.totalRaisedText(1.5)
                                          }, " for conservation."));
                          }),
                        mainnetEth: Caml_option.valFromOption(optTotalPatronageWei),
                        maticDai: Caml_option.valFromOption(optTotalPatronageDai)
                      })));
  }
  return React.createElement(RimbleUi.Loader, {});
}

var make = TotalRaised;

export {
  make ,
  
}
/* Css Not a pure module */
