// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Globals$WildCards from "../../harberger-lib/Globals.bs.js";

var cardStyle = Curry._1(Css.style, /* :: */[
      Css.height(/* `percent */[
            -119887163,
            100
          ]),
      /* :: */[
        Css.backgroundColor(/* `hex */[
              5194459,
              "73C8D7"
            ]),
        /* [] */0
      ]
    ]);

var titleStyle = Curry._1(Css.style, /* :: */[
      Css.color(/* `hex */[
            5194459,
            "cccccc"
          ]),
      /* [] */0
    ]);

var profileImageStyle = Curry._1(Css.style, /* :: */[
      Css.borderWidth(Css.px(6)),
      /* :: */[
        Css.borderStyle(/* solid */12956715),
        /* :: */[
          Css.borderColor(/* `hex */[
                5194459,
                "73C8D7"
              ]),
          /* :: */[
            Css.width(/* `percent */[
                  -119887163,
                  100
                ]),
            /* [] */0
          ]
        ]
      ]
    ]);

var plantStyle = Curry._1(Css.style, /* :: */[
      Css.width(/* `percent */[
            -119887163,
            100
          ]),
      /* :: */[
        Css.transform(Css.translateY(Css.px(30))),
        /* [] */0
      ]
    ]);

var iconStyle = Curry._1(Css.style, /* :: */[
      Css.height(Css.px(20)),
      /* :: */[
        Css.paddingRight(Css.px(3)),
        /* :: */[
          Css.margin(/* auto */-1065951377),
          /* [] */0
        ]
      ]
    ]);

function Team(Props) {
  var teamMembers = [
    {
      name: "JonJon Clark",
      img: "https://dd2wadt5nc0o7.cloudfront.net/team/jonjon.jpg",
      title: "Co-founder",
      linkedIn: "https://www.linkedin.com/in/jonathan-clark-637344143/",
      twitterHandle: "jonjonclark",
      githubHandle: "moose-code"
    },
    {
      name: "Jason Smythe",
      img: "https://dd2wadt5nc0o7.cloudfront.net/team/jason.jpg",
      title: "Co-founder",
      linkedIn: "https://www.linkedin.com/in/jason-smythe-0501ab88/",
      twitterHandle: "jasoonsmythe",
      githubHandle: "jasoons"
    },
    {
      name: "Denham Preen",
      img: "https://dd2wadt5nc0o7.cloudfront.net/team/denham.jpg",
      title: "Co-founder",
      linkedIn: "https://www.linkedin.com/in/denhampreen/",
      twitterHandle: "denhampreen",
      githubHandle: "DenhamPreen"
    },
    {
      name: "Rio Button",
      img: "https://dd2wadt5nc0o7.cloudfront.net/team/rio.jpg",
      title: "Lead conservationist",
      linkedIn: "https://www.linkedin.com/in/riob/",
      twitterHandle: "biologistbutton",
      githubHandle: undefined
    },
    {
      name: "Luke Gillott",
      img: "https://dd2wadt5nc0o7.cloudfront.net/team/luke.jpg",
      title: "Executive board",
      linkedIn: "https://www.linkedin.com/in/luke-gillott/",
      twitterHandle: undefined,
      githubHandle: undefined
    }
  ];
  return React.createElement("div", undefined, React.createElement(RimbleUi.Flex, {
                  children: React.createElement("h1", undefined, Globals$WildCards.restr("Wildcards Team")),
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  justifyContent: "space-around",
                  px: 50,
                  pb: 20,
                  pt: 20
                }), React.createElement(RimbleUi.Flex, {
                  children: Belt_Array.mapWithIndex(teamMembers, (function (i, member) {
                          var link = member.linkedIn;
                          var handle = member.twitterHandle;
                          var handle$1 = member.githubHandle;
                          return React.createElement(RimbleUi.Box, {
                                      mb: 20,
                                      mt: 20,
                                      children: React.createElement(RimbleUi.Card, {
                                            className: cardStyle,
                                            children: null
                                          }, React.createElement("img", {
                                                className: profileImageStyle,
                                                alt: member.name,
                                                src: member.img
                                              }), React.createElement("p", undefined, member.name, React.createElement("br", undefined), React.createElement("span", {
                                                    className: titleStyle
                                                  }, React.createElement("small", undefined, member.title))), link !== undefined ? React.createElement("a", {
                                                  href: link,
                                                  rel: "noopener noreferrer",
                                                  target: "_blank"
                                                }, React.createElement("img", {
                                                      className: iconStyle,
                                                      alt: member.name,
                                                      src: "/img/socials/linkedin.svg"
                                                    })) : null, handle !== undefined ? React.createElement("a", {
                                                  href: "https://twitter.com/" + handle,
                                                  rel: "noopener noreferrer",
                                                  target: "_blank"
                                                }, React.createElement("img", {
                                                      className: iconStyle,
                                                      alt: handle,
                                                      src: "/img/socials/twitter.svg"
                                                    })) : null, handle$1 !== undefined ? React.createElement("a", {
                                                  href: "https://github.com/" + handle$1,
                                                  rel: "noopener noreferrer",
                                                  target: "_blank"
                                                }, React.createElement("img", {
                                                      className: iconStyle,
                                                      alt: handle$1,
                                                      src: "/img/socials/github.svg"
                                                    })) : null),
                                      width: [
                                        0.45,
                                        0.45,
                                        0.18
                                      ],
                                      key: String(i)
                                    });
                        })),
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  justifyContent: "space-around",
                  px: 50,
                  pb: 50
                }), React.createElement(RimbleUi.Flex, {
                  children: React.createElement("img", {
                        className: plantStyle,
                        alt: "wildcards plants",
                        src: "/img/wildcardsimages/plants.png"
                      }),
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  justifyContent: "space-around",
                  px: 50,
                  pb: 2,
                  pt: 2
                }));
}

var make = Team;

export {
  cardStyle ,
  titleStyle ,
  profileImageStyle ,
  plantStyle ,
  iconStyle ,
  make ,
  
}
/* cardStyle Not a pure module */
