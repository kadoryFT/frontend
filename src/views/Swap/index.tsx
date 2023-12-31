import { Currency, CurrencyAmount, SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import DexNav from 'components/DexNav'
import DexPanel from 'components/DexPanel'
import { Flex } from 'components/uikit'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useMemo } from 'react'
import { TradeState } from 'state/routing/types'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { currencyAmountToPreciseFloat, formatTransactionAmount } from 'utils/formatNumbers'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Actions from './actions'
import LoadingBestRoute from './components/LoadingBestRoute'
import Risk from './components/Risk/Risk'
import SwapSwitchButton from './components/SwapSwitchButton'
import TradeDetails from './components/TradeDetails'

const Swap = () => {
  const { chainId } = useWeb3React()
  // const loadedUrlParams = useDefaultsFromURLSearch()

  // TODO: Add token warning stuff

  // token warning stuff
  // const [loadedInputCurrency, loadedOutputCurrency] = [
  //   useCurrency(loadedUrlParams?.[Field.INPUT]?.currencyId),
  //   useCurrency(loadedUrlParams?.[Field.OUTPUT]?.currencyId),
  // ]

  // const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  // const urlLoadedTokens: Token[] = useMemo(
  //   () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
  //   [loadedInputCurrency, loadedOutputCurrency],
  // )

  // const handleConfirmTokenWarning = useCallback(() => {
  //   setDismissTokenWarning(true)
  // }, [])

  // dismiss warning if all imported tokens are in active lists
  // const defaultTokens = useAllTokens()
  // const importTokensNotInDefault = useMemo(
  //   () =>
  //     urlLoadedTokens &&
  //     urlLoadedTokens
  //       .filter((token: Token) => {
  //         return !(token.address in defaultTokens)
  //       })
  //       .filter((token: Token) => {
  //         // Any token addresses that are loaded from the shorthands map do not need to show the import URL
  //         const supported = supportedChainId(chainId)
  //         if (!supported) return true
  //         return !Object.keys(TOKEN_SHORTHANDS).some((shorthand) => {
  //           const shorthandTokenAddress = TOKEN_SHORTHANDS[shorthand][supported]
  //           return shorthandTokenAddress && shorthandTokenAddress === token.address
  //         })
  //       }),
  //   [chainId, defaultTokens, urlLoadedTokens],
  // )

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const {
    trade: { state: tradeState, trade },
    allowedSlippage,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade],
  )

  const [routeNotFound, routeIsLoading, routeIsSyncing] = useMemo(
    () => [!trade?.swaps, TradeState.LOADING === tradeState, TradeState.SYNCING === tradeState],
    [trade, tradeState],
  )

  const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const formattedAmounts = useMemo(
    () => ({
      [independentField]: typedValue,
      [dependentField]: showWrap
        ? parsedAmounts[independentField]?.toExact() ?? ''
        : formatTransactionAmount(currencyAmountToPreciseFloat(parsedAmounts[dependentField])),
    }),
    [dependentField, independentField, parsedAmounts, showWrap, typedValue],
  )

  const maxInputAmount: CurrencyAmount<Currency> | undefined = useMemo(
    () => maxAmountSpend(currencyBalances[Field.INPUT]),
    [currencyBalances],
  )

  // const stablecoinPriceImpact = useMemo(
  //   () => (routeIsSyncing || !trade ? undefined : computeFia(fiatValueTradeInput, fiatValueTradeOutput)),
  //   [fiatValueTradeInput, fiatValueTradeOutput, routeIsSyncing, trade],
  // )
  useDefaultsFromURLSearch()

  return (
    <Flex variant="flex.dexContainer">
      <DexNav />
      <Flex sx={{ margin: '25px 0px', maxWidth: '100%', width: '420px' }} />
      <DexPanel
        panelText="From"
        onCurrencySelect={(currency) => onCurrencySelection(Field.INPUT, currency)}
        onUserInput={(val) => onUserInput(Field.INPUT, val)}
        handleMaxInput={() => maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())}
        value={formattedAmounts[Field.INPUT]}
        currency={currencies[Field.INPUT]}
        otherCurrency={currencies[Field.OUTPUT]}
      />
      <Flex sx={{ width: '100%', justifyContent: 'flex-end', height: '50px', alignItems: 'center' }}>
        <SwapSwitchButton onClick={onSwitchTokens} />
        <Risk chainId={chainId ?? SupportedChainId.BSC} currency={currencies[Field.OUTPUT]} />
      </Flex>
      <DexPanel
        panelText="To"
        onCurrencySelect={(currency) => onCurrencySelection(Field.OUTPUT, currency)}
        onUserInput={(val) => onUserInput(Field.OUTPUT, val)}
        value={formattedAmounts[Field.OUTPUT]}
        currency={currencies[Field.OUTPUT]}
        otherCurrency={currencies[Field.INPUT]}
      />
      <Actions
        tradeState={tradeState}
        swapInputError={swapInputError}
        trade={trade}
        allowedSlippage={allowedSlippage}
        recipient={recipient}
        showWrap={showWrap}
        wrapInputError={wrapInputError}
        wrapType={wrapType}
        onWrap={onWrap}
        stablecoinPriceImpact={null}
      />
      {!showWrap &&
        (routeIsLoading || routeIsSyncing ? (
          <Flex mt="10px">
            <LoadingBestRoute />
          </Flex>
        ) : !routeNotFound ? (
          <Flex mt="10px">
            <TradeDetails trade={trade} allowedSlippage={allowedSlippage} />
          </Flex>
        ) : (
          <></>
        ))}
    </Flex>
  )
}
export default Swap
