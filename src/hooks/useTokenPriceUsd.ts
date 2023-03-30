import { Currency, Token } from '@ape.swap/sdk-core'
import { BigNumber } from 'ethers'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { usePriceGetter } from './useContract'

const useTokenPriceUsd = (token: Currency | undefined | null): [number, boolean] => {
  const priceGetterContract = usePriceGetter()
  const address = token ? (token as Token).address : undefined
  const isNative = token ? token.isNative : undefined

  const { result, loading } = useSingleCallResult(
    priceGetterContract,
    isNative ? 'getETHPrice' : 'getPrice',
    isNative ? [0] : [address, 0],
  )
  const bigNumberResponse = BigNumber.from(result?.toString() || 0)
  const value = getBalanceNumber(bigNumberResponse, 18)
  return [value, loading]
}

export default useTokenPriceUsd