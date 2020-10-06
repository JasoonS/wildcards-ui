// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as RimbleUi from "rimble-ui";
import * as Styles$WildCards from "../../Styles.bs.js";
import * as YoutubeVideoJs from "./YoutubeVideo.js";
import * as Globals$WildCards from "../../harberger-lib/Globals.bs.js";

var gorillaOnVine = "/img/wildcardsimages/hanging-gorilla-from-vine.png";

var make = YoutubeVideoJs.default;

var YoutubeVid = {
  make: make
};

var infoModalStyle = Curry._1(Css.style, /* :: */[
      Css.padding(Css.rem(3)),
      /* :: */[
        Css.borderRadius(Css.px(5)),
        /* :: */[
          Css.width(Css.px(640)),
          /* :: */[
            Css.maxWidth(/* `vw */[
                  26433,
                  100
                ]),
            /* [] */0
          ]
        ]
      ]
    ]);

function HowItWorks(Props) {
  var match = React.useState((function () {
          return false;
        }));
  var setModalOpen = match[1];
  return React.createElement(RimbleUi.Box, {
              children: React.createElement(RimbleUi.Flex, {
                    children: null,
                    flexWrap: "wrap"
                  }, React.createElement(RimbleUi.Box, {
                        children: React.createElement(RimbleUi.Card, {
                              className: Styles$WildCards.infoCardStyles,
                              children: null
                            }, React.createElement(make, {
                                  videoCode: "n7GBm6ruVaQ"
                                }), React.createElement("br", undefined), React.createElement(RimbleUi.Box, {
                                  children: React.createElement(RimbleUi.Button, {
                                        className: Styles$WildCards.centerItemsMargin,
                                        children: Globals$WildCards.restr("Click here for a simple text explanation"),
                                        onClick: (function (param) {
                                            return Curry._1(setModalOpen, (function (param) {
                                                          return true;
                                                        }));
                                          })
                                      }),
                                  width: [1]
                                }), React.createElement(RimbleUi.Modal, {
                                  isOpen: match[0],
                                  children: React.createElement(RimbleUi.Card, {
                                        className: infoModalStyle,
                                        children: null
                                      }, React.createElement(RimbleUi.Button.Text, {
                                            onClick: (function (param) {
                                                return Curry._1(setModalOpen, (function (param) {
                                                              return false;
                                                            }));
                                              }),
                                            icononly: true,
                                            icon: "Close",
                                            color: "moon-gray",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            m: 3
                                          }), React.createElement(RimbleUi.Heading, {
                                            children: Globals$WildCards.restr("How it works"),
                                            className: Styles$WildCards.centerText
                                          }), React.createElement("br", undefined), React.createElement("hr", undefined), React.createElement(RimbleUi.Text, {
                                            children: null
                                          }, Globals$WildCards.restr("You can become the guardian of a wildcard by simply clicking buy on any of the listed wildcards. Wildcards are "), React.createElement("strong", undefined, Globals$WildCards.restr("always for sale")), Globals$WildCards.restr(" since anyone can purchase them at anytime for their current sale price. When someone purchases a wildcard, they are required to immediately set a sale price for that wildcard. This ensures wildcards are "), React.createElement("strong", undefined, Globals$WildCards.restr("always for sale"))), React.createElement("br", undefined), React.createElement(RimbleUi.Text, {
                                            children: null
                                          }, Globals$WildCards.restr("As the gaurdian of a wildcard, you pay a "), React.createElement("strong", undefined, Globals$WildCards.restr("Harberger tax")), Globals$WildCards.restr(" (percentage based fee) on your newly set sale price. This fee goes towards supporting wildlife conservation. ")), React.createElement("br", undefined), React.createElement(RimbleUi.Text, {
                                            children: null
                                          }, React.createElement("strong", undefined, Globals$WildCards.restr("Here's where it gets interesting.")), Globals$WildCards.restr(" When someone purchases your wildcard from you, you will receive the sale price you set for that wildcard. Depending on what sale price you set and the harberger tax you have already paid, you may make a profit. The only constant is that the conservation organisation will continually receive funding based on the current selling price of each wildcard.")), React.createElement("br", undefined), React.createElement(RimbleUi.Text, {
                                            children: React.createElement("span", {
                                                  className: Styles$WildCards.redDisclaimer
                                                }, Globals$WildCards.restr("The first wildcard we released, Vitalik, has a 2.5% Harberger tax rate per month. Other wildcards have different harberger tax rates ranging from 2.5% to 100% per month."))
                                          }))
                                })),
                        width: [
                          1,
                          1,
                          0.59
                        ],
                        className: Styles$WildCards.infoCardContainer
                      }), React.createElement(RimbleUi.Box, {
                        children: React.createElement("img", {
                              src: gorillaOnVine,
                              width: "100%"
                            }),
                        width: [0.41],
                        className: Styles$WildCards.animalImage
                      })),
              className: Styles$WildCards.infoBackground
            });
}

var make$1 = HowItWorks;

export {
  gorillaOnVine ,
  YoutubeVid ,
  infoModalStyle ,
  make$1 as make,
  
}
/* make Not a pure module */
