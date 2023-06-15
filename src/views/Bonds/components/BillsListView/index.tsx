import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { MainContainer } from './styles'
import BillsListMenu from './components/BillsListMenu'
import orderBy from 'lodash/orderBy'
import BillsRows from './components/BillsRows'
import { useRouter } from 'next/router'
import { Flex } from 'components/uikit'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { Bills } from 'views/Bonds/types'
import { useBills } from 'state/bills/hooks'
import { useSetZapOutputList } from 'state/zap/hooks'

const BillsListView: React.FC = () => {
  const bills = useBills()
  const { chainId } = useWeb3React()
  const { asPath } = useRouter()
  const [query, setQuery] = useState('')
  const [filterOption, setFilterOption] = useState('filter')
  const [sortOption, setSortOption] = useState('sort')
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false)
  const [showAvailable, setShowAvailable] = useState(true)
  const noResults = !!query || filterOption !== 'all' || showOnlyDiscount

  const isSoldOut = useCallback(
    (bill: Bills) => {
      const { earnToken, maxTotalPayOut, totalPayoutGiven, earnTokenPrice, discount } = bill
      const available = new BigNumber(maxTotalPayOut ?? '0')
        ?.minus(new BigNumber(totalPayoutGiven ?? '0'))
        ?.div(new BigNumber(10).pow(earnToken?.decimals?.[chainId as SupportedChainId] ?? '18'))

      const thresholdToHide = new BigNumber(11).div(earnTokenPrice ?? '0')
      return available.lte(thresholdToHide) || discount === '100.00'
    },
    [chainId],
  )

  const hasDiscount = useCallback((bill: Bills) => {
    const { discount } = bill
    return new BigNumber(discount ?? '0').gt(0)
  }, [])

  const sortBills = useCallback(
    (billsToSort: Bills[]) => {
      switch (sortOption) {
        case 'discount':
          return orderBy(billsToSort, (bill: Bills) => parseFloat(bill?.discount ?? '0'), 'desc')
        case 'vesting':
          return orderBy(billsToSort, (bill: Bills) => parseFloat(bill?.vestingTime ?? '0'), 'asc')
        case 'new':
          return orderBy(billsToSort, (bill: Bills) => bill.index, 'desc')
        default:
          return billsToSort
      }
    },
    [sortOption],
  )

  const billsToRender = useMemo((): Bills[] => {
    let billsToReturn: any[] = []
    bills?.forEach((bill: any) => {
      if (bill.inactive) return
      const disabled = isSoldOut(bill)
      const discount = hasDiscount(bill)
      if (showAvailable && disabled) return
      if (!showAvailable && !disabled) return
      if (showOnlyDiscount && !discount) return
      if (location.search.includes(`id=${bill.index}`)) {
        billsToReturn.unshift(bill)
      } else {
        billsToReturn.push(bill)
      }
    })
    if (query) {
      billsToReturn = billsToReturn?.filter((bill) => {
        return bill.lpToken.symbol.toUpperCase().includes(query.toUpperCase())
      })
    }
    if (filterOption === 'liquidity') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'liquidity'.toUpperCase())
    }
    if (filterOption === 'reserve') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'reserve'.toUpperCase())
    }
    if (filterOption === 'launch') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'launch'.toUpperCase())
    }
    return sortBills(billsToReturn)
  }, [bills, isSoldOut, query, showAvailable, filterOption, showOnlyDiscount, hasDiscount, sortBills])

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  // Set zap output list to match dual farms
  useSetZapOutputList(
    billsToRender.map((bill) => {
      return {
        currencyIdA: bill?.token.address[chainId as SupportedChainId] ?? '',
        currencyIdB: bill?.quoteToken.address[chainId as SupportedChainId] ?? '',
      }
    }),
  )

  return (
    <MainContainer>
      <BillsListMenu
        onHandleQueryChange={handleChangeQuery}
        setFilterOption={setFilterOption}
        filterOption={filterOption}
        setSortOption={setSortOption}
        sortOption={sortOption}
        query={query}
        showOnlyDiscount={showOnlyDiscount}
        setShowOnlyDiscount={setShowOnlyDiscount}
        showAvailable={showAvailable}
        setShowAvailable={setShowAvailable}
      />
      <Flex flexDirection="column" sx={{ padding: '20px 0 50px 0' }}>
        <BillsRows billsToRender={billsToRender} noResults={noResults} />
      </Flex>
    </MainContainer>
  )
}

export default React.memo(BillsListView)