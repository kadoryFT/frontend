import React, { useState } from 'react'
import { fetchPoolsUserDataAsync } from 'state/pools'
import { getEtherscanLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { useSousHarvestAll } from '../hooks/useHarvestAll'
import { Button } from 'components/uikit'
import { poolStyles } from '../components/styles'
import { SupportedChainId } from '@ape.swap/sdk-core'

interface HarvestActionsProps {
  sousIds: number[]
  disabled?: boolean
}

const HarvestAll: React.FC<HarvestActionsProps> = ({ sousIds, disabled }) => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvestAll } = useSousHarvestAll(sousIds)
  // const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const handleHarvestAll = async () => {
    setPendingTrx(true)
    await onHarvestAll()
      .then((resp) => {
        resp.map((trx) =>
          // toastSuccess(t('Harvest Successful'), {
          //   text: t('View Transaction'),
          //   url: getEtherscanLink(trx.transactionHash, 'transaction', chainId),
          // })
          console.log(trx),
        )
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(fetchPoolsUserDataAsync(chainId as SupportedChainId, account ?? ''))
    setPendingTrx(false)
  }

  return (
    <Button
      size="sm"
      sx={poolStyles.harvestAllBtn}
      disabled={disabled || pendingTrx || sousIds.length <= 0}
      onClick={handleHarvestAll}
      load={pendingTrx}
    >
      {t('HARVEST ALL')} ({sousIds?.length})
    </Button>
  )
}

export default React.memo(HarvestAll)
