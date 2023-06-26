module ExpertView = {
  @react.component
  let make = (
    ~monthlyRate,
    ~tokenName,
    ~optMonthlyPledgeEth,
    ~unit,
    ~showEthWithUsdConversion,
    ~optMonthlyPledgeUsd,
    ~userIdType as _,
    ~currentPatron as _,
    ~displayNameStr,
    ~depositAvailableToWithdrawEth,
    ~depositAvailableToWithdrawUsd,
    ~totalPatronage,
    ~totalPatronageUsd,
    ~definiteTime,
    ~daysHeld,
  ) => {
    let clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute()

    <React.Fragment>
      <div>
        <small>
          <strong>
            {("Monthly Pledge (at " ++ (monthlyRate ++ "%): "))->React.string}
            <Rimble.Tooltip
              message={"This is the monthly percentage contribution of " ++
              (tokenName ++
              "'s sale price that will go towards conservation of at risk animals. This is deducted continuously from the deposit and paid by the owner of the animal")}
              placement="top">
              <span> {`ⓘ`->React.string} </span>
            </Rimble.Tooltip>
          </strong>
        </small>
        <br />
        {switch optMonthlyPledgeEth {
        | Some(monthlyPledgeEth) => (monthlyPledgeEth ++ (" " ++ unit))->React.string
        | None => <Rimble.Loader />
        }}
        <br />
        {switch (showEthWithUsdConversion, optMonthlyPledgeUsd) {
        | (true, Some(monthlyPledgeUsd)) =>
          <small> {("(" ++ (monthlyPledgeUsd ++ " USD)"))->React.string} </small>
        | _ => React.null
        }}
      </div>
      <p>
        <small>
          <strong>
            {"Current Patron: "->React.string}
            <Rimble.Tooltip
              message={`This is the $userIdType of the current owner`} placement="top">
              <span> {`ⓘ`->React.string} </span>
            </Rimble.Tooltip>
          </strong>
        </small>
        <br />
        <a
          onClick={e => {
            ReactEvent.Mouse.preventDefault(e)
            clearAndPush(`/#user/$currentPatron`)
          }}>
          {displayNameStr->React.string}
        </a>
      </p>
      <p>
        <small>
          <strong>
            {"Available Deposit: "->React.string}
            <Rimble.Tooltip
              message="This is the amount the owner has deposited to pay their monthly contribution"
              placement="top">
              <span> {`ⓘ`->React.string} </span>
            </Rimble.Tooltip>
          </strong>
        </small>
        <br />
        {(depositAvailableToWithdrawEth ++ (" " ++ unit))->React.string}
        <br />
        {showEthWithUsdConversion
          ? <small> {("(" ++ (depositAvailableToWithdrawUsd ++ " USD)"))->React.string} </small>
          : React.null}
      </p>
      <p>
        <small>
          <strong>
            {(tokenName ++ "'s Patronage: ")->React.string}
            <Rimble.Tooltip
              message={"This is the total contribution that has been raised thanks to the wildcard, " ++
              tokenName}
              placement="top">
              <span> {`ⓘ`->React.string} </span>
            </Rimble.Tooltip>
          </strong>
        </small>
        <br />
        {(totalPatronage ++ (" " ++ unit))->React.string}
        <br />
        {showEthWithUsdConversion
          ? <small> {("(" ++ (totalPatronageUsd ++ " USD)"))->React.string} </small>
          : React.null}
      </p>
      {switch definiteTime {
      | Some(date) =>
        <p>
          <small>
            <strong>
              {"Foreclosure date: "->React.string}
              <Rimble.Tooltip
                message={"This is the date the deposit will run out and the current owner will lose guardianship of " ++
                tokenName}
                placement="top">
                <span> {`ⓘ`->React.string} </span>
              </Rimble.Tooltip>
            </strong>
          </small>
          <br />
          {MomentRe.Moment.format("LLLL", date)->React.string}
          <br />
          <small>
            {"( "->React.string}
            <CountDown endDateMoment=date />
            {")"->React.string}
          </small>
        </p>
      | None => React.null
      }}
      {switch daysHeld {
      | Some((daysHeldFloat, timeAquired)) =>
        let timeAcquiredString = timeAquired->MomentRe.Moment.toISOString
        <p>
          <small>
            <strong>
              {"Days Held: "->React.string}
              <Rimble.Tooltip
                message={"This is the amount of time " ++
                (tokenName ++
                (" has been held. It was acquired on the " ++ (timeAcquiredString ++ ".")))}
                placement="top">
                <span> {`ⓘ`->React.string} </span>
              </Rimble.Tooltip>
            </strong>
          </small>
          <br />
          {daysHeldFloat->Js.Float.toFixed->React.string}
          <br />
        </p>
      | None => React.null
      }}
    </React.Fragment>
  }
}
module SimpleView = {
  @react.component
  let make = (
    ~monthlyRate,
    ~tokenName,
    ~optMonthlyPledgeEth,
    ~unit,
    ~currentPatron as _,
    ~displayNameStr,
    ~totalPatronage,
    ~definiteTime,
    ~daysHeld,
    ~orgId as _,
    ~orgName,
    ~priceString,
    ~optionalSpecies,
  ) => {
    let clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute()

    let linkStyle = {
      open Css
      style(list{textDecoration(underline)})
    }
    let userLink =
      <a
        className=linkStyle
        onClick={e => {
          ReactEvent.Mouse.preventDefault(e)
          clearAndPush(`/#user/$currentPatron`)
        }}>
        {displayNameStr->React.string}
      </a>

    let orgLink =
      <a
        className=linkStyle
        onClick={e => {
          ReactEvent.Mouse.preventDefault(e)
          clearAndPush(`/#org/$orgId`)
        }}>
        {orgName->React.string}
      </a>

    <React.Fragment>
      <p>
        {(tokenName ++ " is currently protected by ")->React.string}
        userLink
        {(" who values their guardianship of " ++
        (tokenName ++
        (" at " ++
        (priceString ++
        (". " ++
        (tokenName ++
        (" has a monthly pledge rate of " ++ (monthlyRate ++ "%. This means "))))))))->React.string}
        userLink
        {(" has to contribute " ++
        (switch optMonthlyPledgeEth {
        | Some(monthlyPledgeEth) => monthlyPledgeEth ++ (" " ++ unit)
        | None => "Loading"
        } ++
        " monthly to "))->React.string}
        orgLink
        {(" for the protection of " ++
        (tokenName ++
        (optionalSpecies->Option.mapWithDefault("", species => " the " ++ species) ++ ".")))
          ->React.string}
      </p>
      {switch daysHeld {
      | Some((daysHeldFloat, _timeAquired)) =>
        <p>
          userLink
          {(" has been the guardian of " ++
          (tokenName ++
          (" for " ++ (daysHeldFloat->Js.Float.toFixed ++ " days "))))->React.string}
          {switch definiteTime {
          | Some(date) =>
            <>
              {"and has enough deposit to last "->React.string}
              <CountDown endDateMoment=date />
              {` - remember to keep topping up that deposit 😉.`->React.string}
            </>
          | None => React.null
          }}
        </p>
      | None => React.null
      }}
      <p>
        {("" ++ (tokenName ++ (" has earned " ++ (totalPatronage ++ (" " ++ (unit ++ " for "))))))
          ->React.string}
        orgLink
        {(". Congratulations to all the honourable and loyal patrons of " ++ (tokenName ++ "!"))
          ->React.string}
      </p>
    </React.Fragment>
    // let clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute();
  }
}

@react.component
let make = (~chain, ~tokenId: TokenId.t) => {
  let daysHeld = QlHooks.useDaysHeld(~chain, tokenId)

  let currentPatron = Option.getWithDefault(QlHooks.usePatron(~chain, tokenId), "Loading")
  let userId = UserProvider.useDisplayName(currentPatron)
  let displayName = UserProvider.useDisplayName(currentPatron)
  let displayNameStr = UserProvider.displayNameToString(displayName)
  let tokenName = Option.getWithDefault(tokenId->QlHooks.useWildcardName, "loading name")
  let userIdType = switch userId {
  | EthAddress(_) => "public address"
  | TwitterHandle(_) => "verified twitter account"
  | ThreeBoxName(_) => "3box name"
  }

  let currentUsdEthPrice = UsdPriceProvider.useUsdPrice()
  let (depositAvailableToWithdrawEth, depositAvailableToWithdrawUsd) =
    QlHooks.useRemainingDepositEth(~chain, currentPatron)->Option.mapWithDefault(
      ("Loading", "Loading"),
      a => (
        Option.getWithDefault(
          a->FormatMoney.getEthUnit(Eth.Eth(#ether))->Float.fromString,
          0.0,
        )->FormatMoney.toFixedWithPrecisionNoTrailingZeros(~digits=9),
        currentUsdEthPrice->Option.mapWithDefault("Loading", usdEthRate =>
          a->FormatMoney.getEthUnit(Eth.Usd(usdEthRate, 2))
        ),
      ),
    )

  let (totalPatronage, totalPatronageUsd) =
    QlHooks.useAmountRaisedToken(~chain, tokenId)->Option.mapWithDefault(
      ("Loading", "Loading"),
      a => (
        Option.getWithDefault(
          a->FormatMoney.getEthUnit(Eth.Eth(#ether))->Float.fromString,
          0.0,
        )->FormatMoney.toFixedWithPrecisionNoTrailingZeros(~digits=9),
        currentUsdEthPrice->Option.mapWithDefault("Loading", usdEthRate =>
          a->FormatMoney.getEthUnit(Eth.Usd(usdEthRate, 2))
        ),
      ),
    )
  let foreclosureTime = QlHooks.useForeclosureTime(~chain, currentPatron)
  let definiteTime = foreclosureTime->Option.mapWithDefault(None, a => Some(a))

  let ratio = QlHooks.usePledgeRate(~chain, tokenId)

  let optCurrentPrice = PriceDisplay.usePrice(~chain, tokenId)

  let (optMonthlyPledgeEth, optMonthlyPledgeUsd) = switch optCurrentPrice {
  | Some((priceEth, optPriceUsd)) => (
      Some(
        FormatMoney.toFixedWithPrecisionNoTrailingZeros(
          Float.fromString(priceEth)->Accounting.defaultZeroF *. ratio,
          ~digits=4,
        ),
      ),
      switch optPriceUsd {
      | Some(_priceUsd) => None

      | None => None
      },
    )
  | None => (None, None)
  }

  let monthlyRate = Js.Float.toString(ratio *. 100.)

  let showEthWithUsdConversion = switch chain {
  | Client.MaticQuery => false
  | Client.Neither
  | Client.MainnetQuery => true
  }
  let unit = showEthWithUsdConversion ? "ETH" : "USD"
  let translationModeContext = ReactTranslate.useTranslationModeContext()
  let orgName = Option.getWithDefault(QlHooks.useWildcardOrgName(~tokenId), " the organisation")
  let orgId = Option.getWithDefault(QlHooks.useWildcardOrgId(~tokenId), " the organisation")

  let currentPriceWei = QlHooks.usePrice(~chain, tokenId)
  let priceString = switch currentPriceWei {
  | Foreclosed(price)
  | Price(price) =>
    price->Web3Utils.fromWeiBNToEthPrecision(~digits=2) ++ (" " ++ unit)
  | Loading => "Loading"
  }

  <>
    <div
      className={
        open Css
        style(list{
          color(grey),
          cursor(#pointer),
          display(#flex),
          justifyContent(#right),
          alignItems(#right),
        })
      }>
      <small
        onClick={event => {
          event->ReactEvent.Mouse.preventDefault
          translationModeContext.setTranslationModeCrypto(
            !translationModeContext.translationModeCrypto,
          )
        }}>
        {(
          translationModeContext.translationModeCrypto ? "EXPERT MODE " : "DEFAULT MODE "
        )->React.string}
      </small>
      <ReactSwitch
        onChange=translationModeContext.setTranslationModeCrypto
        checked=translationModeContext.translationModeCrypto
        height=16
        handleDiameter=18
        width=30
        onColor="#6BAD3F"
        onHandleColor="#346D4C"
        offHandleColor="#aaaaaa"
        uncheckedIcon=false
        checkedIcon=false
        className=Styles.translationSwitch
      />
    </div>
    {translationModeContext.translationModeCrypto
      ? <ExpertView
          monthlyRate
          tokenName
          optMonthlyPledgeEth
          unit
          showEthWithUsdConversion
          optMonthlyPledgeUsd
          userIdType
          currentPatron
          displayNameStr
          depositAvailableToWithdrawEth
          depositAvailableToWithdrawUsd
          totalPatronage
          totalPatronageUsd
          definiteTime
          daysHeld
        />
      : <SimpleView
          monthlyRate
          tokenName
          optMonthlyPledgeEth
          unit
          currentPatron
          displayNameStr
          totalPatronage
          definiteTime
          daysHeld
          orgName
          orgId
          priceString
          optionalSpecies=None
        />}
  </>
}

module Auction = {
  @react.component
  let make = (~chain, ~tokenId: TokenId.t, ~abandoned: bool, ~auctionStartTime) => {
    let currentPatron = Option.getWithDefault(QlHooks.usePatron(~chain, tokenId), "Loading")
    let displayName = UserProvider.useDisplayName(currentPatron)
    let displayNameStr = UserProvider.displayNameToString(displayName)

    let tokenName = Option.getWithDefault(tokenId->QlHooks.useWildcardName, "loading name")

    let clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute()

    let currentUsdEthPrice = UsdPriceProvider.useUsdPrice()
    let (totalPatronage, totalPatronageUsd) =
      QlHooks.useAmountRaisedToken(~chain, tokenId)->Option.mapWithDefault(
        ("Loading", "Loading"),
        a => (
          Option.getWithDefault(
            a->FormatMoney.getEthUnit(Eth.Eth(#ether))->Float.fromString,
            0.0,
          )->FormatMoney.toFixedWithPrecisionNoTrailingZeros(~digits=9),
          currentUsdEthPrice->Option.mapWithDefault("Loading", usdEthRate =>
            a->FormatMoney.getEthUnit(Eth.Usd(usdEthRate, 2))
          ),
        ),
      )

    let ratio = QlHooks.usePledgeRate(~chain, tokenId)

    let monthlyRate = Js.Float.toString(ratio *. 100.)

    let showEthWithUsdConversion = switch chain {
    | Client.MaticQuery => false
    | Client.Neither
    | Client.MainnetQuery => true
    }
    let unit = showEthWithUsdConversion ? "ETH" : "USD"

    <React.Fragment>
      <div>
        {if ratio == 0. {
          <p> {"The monthly pledge rate will be revealed at launch."->React.string} </p>
        } else {
          <>
            <small>
              <strong>
                {"Monthly Pledge Rate:"->React.string}
                <Rimble.Tooltip
                  message={"This is the monthly percentage contribution of " ++
                  (tokenName ++
                  "'s sale price that will go towards conservation of at risk animals. This is deducted continuously from the deposit and paid by the guardian of the animal")}
                  placement="top">
                  <span> {`ⓘ`->React.string} </span>
                </Rimble.Tooltip>
              </strong>
            </small>
            <br />
            {(monthlyRate ++ " %")->React.string}
          </>
        }}
      </div>
      {abandoned
        ? <p>
            <strong>
              {"The previous guardian was "->React.string}
              <a
                onClick={e => {
                  ReactEvent.Mouse.preventDefault(e)
                  clearAndPush(`/#user/$currentPatron`)
                }}>
                {displayNameStr->React.string}
              </a>
              <Rimble.Tooltip
                message={`This happens when the user's deposit runs out for the wildcard.`}
                placement="top">
                <span> {`ⓘ`->React.string} </span>
              </Rimble.Tooltip>
            </strong>
            <br />
          </p>
        : <p>
            {(tokenName ++ " has never had a guardian - you can be the first.")->React.string}
          </p>}
      <p>
        <small>
          <strong>
            {(tokenName ++ "'s Patronage: ")->React.string}
            <Rimble.Tooltip
              message={"This is the total contribution that has been raised thanks to " ++
              tokenName}
              placement="top">
              <span> {`ⓘ`->React.string} </span>
            </Rimble.Tooltip>
          </strong>
        </small>
        <br />
        {(totalPatronage ++ (" " ++ unit))->React.string}
        <br />
        {showEthWithUsdConversion
          ? <small> {("(" ++ (totalPatronageUsd ++ " USD)"))->React.string} </small>
          : React.null}
      </p>
      {abandoned
        ? <>
            <p>
              <small>
                <strong>
                  {"Abandoned since: "->React.string}
                  <Rimble.Tooltip
                    message={"This is the date the deposit ran out and the current guardian will lose guardianship of " ++
                    tokenName}
                    placement="top">
                    <span> {`ⓘ`->React.string} </span>
                  </Rimble.Tooltip>
                </strong>
              </small>
              <br />
              {MomentRe.Moment.format("LLLL", auctionStartTime)->React.string}
              <br />
            </p>
            // TODO: show how long it was held by the previous patron
            //  {switch (daysHeld) {
            //   | Some((daysHeldFloat, timeAquired)) =>
            //     let timeAcquiredString =
            //       timeAquired->MomentRe.Moment.toISOString;
            //     <p>
            //       <small>
            //         <strong>
            //           "Days Held: "->React.string
            //           <Rimble.Tooltip
            //             message={
            //               "This is the amount of time "
            //               ++ tokenName
            //               ++ " has been held. It was acquired on the "
            //               ++ timeAcquiredString
            //               ++ "."
            //             }
            //             placement="top">
            //             <span> {js|ⓘ|js}->React.string </span>
            //           </Rimble.Tooltip>
            //         </strong>
            //       </small>
            //       <br />
            //       {daysHeldFloat->Js.Float.toFixed->React.string}
            //       <br />
            //     </p>;
            //   | None => React.null
            //   }}
          </>
        : React.null}
    </React.Fragment>
  }
}
