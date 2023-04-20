import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Button, Modal } from 'components/uikit'
import { getFullDisplayBalance } from 'utils/getBalanceNumber'
import ModalInput from 'components/ModalInput/ModalInput'

interface DepositModalProps {
  max: string
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
}

const modalProps = {
  sx: {
    maxHeight: 'calc(100% - 30px)',
    minWidth: ['90%', '400px'],
    width: '200px',
    maxWidth: '425px',
  },
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '', addLiquidityUrl }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(max))
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={t('Stake LP tokens')} onDismiss={onDismiss} {...modalProps}>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        addLiquidityUrl={addLiquidityUrl}
        inputTitle={t('Stake')}
      />
      <Button
        fullWidth
        disabled={pendingTx || fullBalance === '0' || val === '0' || parseFloat(fullBalance) < parseFloat(val)}
        onClick={async () => {
          setPendingTx(true)
          try {
            await onConfirm(val)
            onDismiss?.()
          } catch (e) {
            console.error('Transaction Failed')
          } finally {
            setPendingTx(false)
          }
        }}
        load={pendingTx}
        style={{
          borderRadius: '10px',
          marginTop: '10px',
        }}
      >
        {pendingTx ? t('Pending Confirmation') : t('Confirm')}
      </Button>
    </Modal>
  )
}

export default React.memo(DepositModal)
