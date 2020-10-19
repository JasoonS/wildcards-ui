// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Dapp$WildCards from "./Dapp.bs.js";
import * as Globals$WildCards from "../harberger-lib/Globals.bs.js";
import * as QlHooks$WildCards from "../harberger-lib/QlHooks.bs.js";
import * as TokenId$WildCards from "../harberger-lib/TokenId.bs.js";

var backgroundStyle = Curry._1(Css.style, /* :: */[
      Css.paddingTop(Css.rem(1)),
      /* :: */[
        Css.unsafe("backgroundImage", "linear-gradient(to top, #74C7D7 0%, white 100%)"),
        /* [] */0
      ]
    ]);

var headingStyle = Curry._1(Css.style, /* :: */[
      Css.paddingTop(Css.rem(5)),
      /* :: */[
        Css.textAlign(/* center */98248149),
        /* [] */0
      ]
    ]);

function BuyGrid$Grid(Props) {
  var chain = Props.chain;
  var allAnimals = QlHooks$WildCards.useAnimalList(chain);
  console.log("All animals", allAnimals);
  return React.createElement(RimbleUi.Flex, {
              children: null,
              flexWrap: "wrap",
              alignItems: "stretch",
              justifyContent: "space-around",
              px: 50
            }, Belt_Array.map(allAnimals, (function (animal) {
                    return React.createElement(RimbleUi.Box, {
                                p: 3,
                                fontSize: 4,
                                children: React.createElement(RimbleUi.Card, {
                                      children: React.createElement(Dapp$WildCards.CarouselAnimal.make, {
                                            animal: animal,
                                            scalar: 1,
                                            chain: chain
                                          })
                                    }),
                                width: [
                                  1,
                                  1,
                                  0.3
                                ],
                                key: TokenId$WildCards.toString(animal)
                              });
                  })), React.createElement(RimbleUi.Box, {
                  p: 3,
                  fontSize: 4,
                  children: null,
                  width: [
                    1,
                    1,
                    0.3
                  ]
                }), React.createElement(RimbleUi.Box, {
                  p: 3,
                  fontSize: 4,
                  children: null,
                  width: [
                    1,
                    1,
                    0.3
                  ]
                }));
}

var Grid = {
  make: BuyGrid$Grid
};

function BuyGrid(Props) {
  return React.createElement("div", {
              className: backgroundStyle
            }, React.createElement("div", undefined, React.createElement("h1", {
                      className: headingStyle
                    }, Globals$WildCards.restr("Wildcards Kingdom")), React.createElement(BuyGrid$Grid, {
                      chain: /* MaticQuery */1
                    })));
}

var make = BuyGrid;

export {
  backgroundStyle ,
  headingStyle ,
  Grid ,
  make ,
  
}
/* backgroundStyle Not a pure module */
