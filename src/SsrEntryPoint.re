// [%bs.raw {|require("./custom.css")|}];
open Globals;

module Router = {
  [@react.component]
  let make = () => {
    let url = ReasonReactRouter.useUrl();
    switch (url.path) {
    // | ["new-data"] => <QlHooks />
    | [_] => <p> {React.string("Unknown page")} </p>
    | _ => <Layout />
    };
  };
};

module ApolloProvider = {
  [@react.component]
  let make = (~children, ~client) => {
    <ReasonApollo.Provider client>
      <ReasonApolloHooks.ApolloHooks.Provider client>
        children
      </ReasonApolloHooks.ApolloHooks.Provider>
    </ReasonApollo.Provider>;
  };
};

[@bs.val]
external mainnetApi: option(string) = "process.env.REACT_APP_MAINNET_BE";
[@bs.val]
external goerliApi: option(string) = "process.env.REACT_APP_GOERLI_BE";

// TODO: SSR doesn't work correctly here, need to use the external apollo client
[@react.component]
let make = () =>
  <WildcardsProvider
    getGraphEndpoints={(networkId, ()) => {
      open Client;
      let endpoints =
        switch (networkId) {
        | 5 => {
            mainnet:
              goerliApi |||| "https://goerli.api.wildcards.world/v1/graphq",
            matic: "https://api.mumbai-graph.matic.today/subgraphs/name/wildcards-world/wildcards-mumbai/graphql",
            ws: "wss://api.thegraph.com/subgraphs/name/wildcards-world/wildcards-goerli",
          }
        | _ => {
            mainnet: mainnetApi |||| "https://api.wildcards.world/v1/graphql",
            matic: "https://api.mumbai-graph.matic.today/subgraphs/name/wildcards-world/wildcards-mumbai/graphql",
            ws: "wss://api.thegraph.com/subgraphs/name/wildcards-world/wildcards",
          }
        };
      endpoints;
    }}>
    <Router />
  </WildcardsProvider>;
