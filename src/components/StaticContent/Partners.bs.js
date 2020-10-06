// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as Js_option from "bs-platform/lib/es6/js_option.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Animal$WildCards from "../../harberger-lib/Animal.bs.js";
import * as Styles$WildCards from "../../Styles.bs.js";
import * as Globals$WildCards from "../../harberger-lib/Globals.bs.js";
import * as RootProvider$WildCards from "../../harberger-lib/RootProvider.bs.js";
import * as ApolloHooks$ReasonApolloHooks from "@wildcards/reason-apollo-hooks/src/ApolloHooks.bs.js";

var ubisoftLogo = "/img/logos/Ubisoft.png";

var ethCapeTownLogo = "/img/logos/EthCapeTown.png";

var cvLabsLogo = "/img/logos/cvlabszug.jpg";

var kernelLogo = "/img/logos/kernel.gif";

var ppx_printed_query = "query ActivePartners  {\norganisations(where: {onboarding_status: {_in: [live, signed, listed]}})  {\nlogo  \nid  \nname  \n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var value$2 = Js_dict.get(value$1, "organisations");
  return {
          organisations: value$2 !== undefined ? Js_option.getExn(Js_json.decodeArray(Caml_option.valFromOption(value$2))).map((function (value) {
                    var value$1 = Js_option.getExn(Js_json.decodeObject(value));
                    var value$2 = Js_dict.get(value$1, "logo");
                    var tmp;
                    if (value$2 !== undefined) {
                      var value$3 = Caml_option.valFromOption(value$2);
                      var value$4 = Js_json.decodeString(value$3);
                      tmp = value$4 !== undefined ? value$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                    } else {
                      tmp = Js_exn.raiseError("graphql_ppx: Field logo on type organisations is missing");
                    }
                    var value$5 = Js_dict.get(value$1, "id");
                    var tmp$1;
                    if (value$5 !== undefined) {
                      var value$6 = Caml_option.valFromOption(value$5);
                      var value$7 = Js_json.decodeString(value$6);
                      tmp$1 = value$7 !== undefined ? value$7 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$6));
                    } else {
                      tmp$1 = Js_exn.raiseError("graphql_ppx: Field id on type organisations is missing");
                    }
                    var value$8 = Js_dict.get(value$1, "name");
                    var tmp$2;
                    if (value$8 !== undefined) {
                      var value$9 = Caml_option.valFromOption(value$8);
                      var value$10 = Js_json.decodeString(value$9);
                      tmp$2 = value$10 !== undefined ? value$10 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$9));
                    } else {
                      tmp$2 = Js_exn.raiseError("graphql_ppx: Field name on type organisations is missing");
                    }
                    return {
                            logo: tmp,
                            id: tmp$1,
                            name: tmp$2
                          };
                  })) : Js_exn.raiseError("graphql_ppx: Field organisations on type query_root is missing")
        };
}

function make(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeWithVariables(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeVariables(param) {
  return null;
}

function definition_002(graphql_ppx_use_json_variables_fn) {
  return 0;
}

var definition = /* tuple */[
  parse,
  ppx_printed_query,
  definition_002
];

function ret_type(f) {
  return { };
}

var MT_Ret = { };

var LoadPatronNoDecode = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  make: make,
  makeWithVariables: makeWithVariables,
  makeVariables: makeVariables,
  definition: definition,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

function usePartners(param) {
  var match = ApolloHooks$ReasonApolloHooks.useQuery(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, definition);
  var simple = match[0];
  if (typeof simple === "number" || simple.tag) {
    return ;
  } else {
    return Belt_Array.map(simple[0].organisations, (function (org) {
                  return {
                          logo: org.logo,
                          id: org.id,
                          name: org.name
                        };
                }));
  }
}

var blueBackground = Curry._1(Css.style, /* :: */[
      Css.backgroundColor(/* `hex */[
            5194459,
            "73C8D7"
          ]),
      /* [] */0
    ]);

var cardStyle = Curry._1(Css.style, /* :: */[
      Css.height(/* `percent */[
            -119887163,
            100
          ]),
      /* [] */0
    ]);

var logoStyle = Curry._1(Css.style, /* :: */[
      Css.marginLeft(/* `percent */[
            -119887163,
            10
          ]),
      /* :: */[
        Css.width(/* `percent */[
              -119887163,
              80
            ]),
        /* [] */0
      ]
    ]);

var centerText = Curry._1(Css.style, /* :: */[
      Css.textAlign(/* center */98248149),
      /* [] */0
    ]);

function Partners$OrgDetails(Props) {
  var conservation = Props.conservation;
  var clearAndPush = RootProvider$WildCards.useClearNonUrlStateAndPushRoute(undefined);
  var id = conservation.id;
  return React.createElement(RimbleUi.Card, {
              className: cardStyle,
              children: React.createElement("a", {
                    onClick: (function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return Curry._1(clearAndPush, "#org/" + id);
                      })
                  }, React.createElement("img", {
                        className: Curry._1(Css.style, /* :: */[
                              Css.marginLeft(/* `percent */[
                                    -119887163,
                                    10
                                  ]),
                              /* :: */[
                                Css.width(/* `percent */[
                                      -119887163,
                                      80
                                    ]),
                                /* [] */0
                              ]
                            ]),
                        alt: conservation.name,
                        src: Animal$WildCards.cdnBase + conservation.logo
                      }))
            });
}

var OrgDetails = {
  make: Partners$OrgDetails
};

function Partners(Props) {
  var newConservationPartners = usePartners(undefined);
  var orgBox = function (content, key) {
    return React.createElement(RimbleUi.Box, {
                mb: 20,
                mt: 20,
                children: content,
                width: [
                  0.45,
                  0.45,
                  0.18
                ],
                color: "black",
                key: key
              });
  };
  return React.createElement("div", {
              width: "100%"
            }, React.createElement(RimbleUi.Flex, {
                  children: React.createElement("h1", undefined, Globals$WildCards.restr("Conservation Partners")),
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  justifyContent: "space-around",
                  px: 50,
                  pt: 50,
                  className: blueBackground
                }), React.createElement(RimbleUi.Flex, {
                  children: newConservationPartners !== undefined ? React.createElement(React.Fragment, undefined, Belt_Array.map(newConservationPartners, (function (conservation) {
                                return orgBox(React.createElement(Partners$OrgDetails, {
                                                conservation: conservation
                                              }), conservation.id);
                              })), orgBox(null, "a"), orgBox(null, "b"), orgBox(null, "c"), orgBox(null, "d")) : null,
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  justifyContent: "space-around",
                  px: 50,
                  pb: 50,
                  className: blueBackground
                }), React.createElement(RimbleUi.Flex, {
                  children: null,
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  justifyContent: "space-around",
                  px: 50,
                  className: Styles$WildCards.infoBackground
                }, React.createElement(RimbleUi.Box, {
                      mb: 70,
                      mt: 70,
                      children: React.createElement(RimbleUi.Card, {
                            className: cardStyle,
                            children: React.createElement("a", {
                                  href: "https://www.ubisoft.com/en-us/company/start-ups/station-f.aspx"
                                }, React.createElement("img", {
                                      className: logoStyle,
                                      alt: "ubisoft",
                                      src: ubisoftLogo
                                    }), React.createElement(RimbleUi.Text, {
                                      children: Globals$WildCards.restr("Ubisoft's Entrepreneurs Lab, Season 4, participants"),
                                      className: centerText
                                    }))
                          }),
                      width: [
                        1,
                        1,
                        0.2
                      ],
                      color: "black"
                    }), React.createElement(RimbleUi.Box, {
                      mb: 70,
                      mt: 70,
                      children: React.createElement(RimbleUi.Card, {
                            className: cardStyle,
                            children: React.createElement("a", {
                                  href: "https://ethcapetown.com/"
                                }, React.createElement("img", {
                                      className: logoStyle,
                                      alt: "eth-cape-town",
                                      src: ethCapeTownLogo
                                    }), React.createElement(RimbleUi.Text, {
                                      children: Globals$WildCards.restr("Overall winners of EthCapeTown hackathon"),
                                      className: centerText
                                    }))
                          }),
                      width: [
                        1,
                        1,
                        0.2
                      ],
                      color: "black"
                    }), React.createElement(RimbleUi.Box, {
                      mb: 70,
                      mt: 70,
                      children: React.createElement(RimbleUi.Card, {
                            className: cardStyle,
                            children: React.createElement("a", {
                                  href: "https://cvvc.com/index.php"
                                }, React.createElement("img", {
                                      className: logoStyle,
                                      alt: "cv-labs",
                                      src: cvLabsLogo
                                    }), React.createElement(RimbleUi.Text, {
                                      children: Globals$WildCards.restr("CV Labs Incubator Program, Batch 2"),
                                      className: centerText
                                    }))
                          }),
                      width: [
                        1,
                        1,
                        0.2
                      ],
                      color: "black"
                    }), React.createElement(RimbleUi.Box, {
                      mb: 70,
                      mt: 70,
                      children: React.createElement(RimbleUi.Card, {
                            className: cardStyle,
                            children: React.createElement("a", {
                                  href: "https://kernel.community/"
                                }, React.createElement("img", {
                                      className: logoStyle,
                                      alt: "Kernel Gitcoin",
                                      src: kernelLogo
                                    }), React.createElement(RimbleUi.Text, {
                                      children: Globals$WildCards.restr("Gitcoin Kernel genesis block participants"),
                                      className: centerText
                                    }))
                          }),
                      width: [
                        1,
                        1,
                        0.2
                      ],
                      color: "black"
                    })));
}

var make$1 = Partners;

export {
  ubisoftLogo ,
  ethCapeTownLogo ,
  cvLabsLogo ,
  kernelLogo ,
  LoadPatronNoDecode ,
  usePartners ,
  blueBackground ,
  cardStyle ,
  logoStyle ,
  centerText ,
  OrgDetails ,
  make$1 as make,
  
}
/* blueBackground Not a pure module */
