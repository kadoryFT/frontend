import React from 'react'
import { Text } from '../../../../../components/uikit'

const PriceChange = ({ priceChange }: { priceChange: string }) => {
  const isPositive = parseFloat(priceChange) > 0
  const changeStyle = {
    color: isPositive ? 'success' : 'error',
    ml: '5px'
  }

  return (
    <Text sx={changeStyle}>
      {isPositive ? '+' : ''}
      {priceChange} %
    </Text>
  )
}

export default PriceChange
