import { Farm, FarmTypes } from 'state/farms/types'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView/ListView'
import { Button, Flex, Svg, Text } from 'components/uikit'
import ListViewContent from 'components/ListView/ListViewContent'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { ListTagVariants } from 'components/uikit/Tag/types'
import { styles } from './styles'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import Tooltip from 'components/Tooltip/Tooltip'
import { SupportedChainId } from '@ape.swap/sdk-core'
import Harvest from '../actions/Harvest'
import CardActions from '../actions'

const DisplayFarms = ({ farms, openPid, farmTags }: { farms: Farm[]; openPid?: string; farmTags?: any[] }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const farmsListView = farms.map((farm) => {
    const token0 = farm.tokenSymbol
    const token1 = farm.quoteTokenSymbol
    const userAllowance = farm?.userData?.allowance
    const userEarnings = getBalanceNumber(new BigNumber(farm?.userData?.rewards ?? 0))?.toFixed(2)
    const userSecondEarnings = getBalanceNumber(new BigNumber(farm?.userData?.secondRewards ?? 0))?.toFixed(2)
    const userEarningsUsd = `$${(farm.farmType === FarmTypes.DUAL_FARM
      ? getBalanceNumber(new BigNumber(farm?.userData?.rewards ?? 0)) * farm.earnTokenPrice +
        getBalanceNumber(new BigNumber(farm?.userData?.secondRewards ?? 0)) * (farm?.secondEarnTokenPrice ?? 0)
      : getBalanceNumber(new BigNumber(farm?.userData?.rewards ?? 0)) * farm.earnTokenPrice
    ).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(new BigNumber(farm?.userData?.tokenBalance ?? 0))?.toFixed(6)} LP`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(new BigNumber(farm?.userData?.tokenBalance ?? 0) || new BigNumber(0)) * (farm?.lpValueUsd ?? 0)
    ).toFixed(2)}`
    const fTag = farmTags?.find((tag) => tag.pid === farm.pid)
    console.log(userEarningsUsd)
    return {
      tokenDisplayProps: {
        token1: farm.pid === 184 ? 'NFTY2' : token0,
        token2: token1,
        token3:
          farm.farmType === FarmTypes.MASTER_CHEF_V1 || farm.farmType === FarmTypes.MASTER_CHEF_V2
            ? 'BANANA'
            : farm.rewardToken.symbol,
        token4:
          farm.farmType === FarmTypes.DUAL_FARM
            ? farm?.dualImage !== false
              ? farm.pid === 11
                ? 'NFTY2'
                : farm?.secondRewardToken?.symbol
              : undefined
            : undefined,
        stakeLp: true,
      },
      listProps: {
        id: farm.id,
        // open: farm.pid === openPid,
        title: (
          <ListViewContent
            tag={fTag?.pid === farm.pid ? (fTag?.text.toLowerCase() as ListTagVariants) : null}
            value={farm?.lpStakeTokenSymbol}
            style={{ maxWidth: '170px' }}
          />
        ),
        titleWidth: '290px',
        infoContent: (
          <Tooltip
            valueTitle={t('Multiplier')}
            valueContent={farm?.multiplier ?? '0X'}
            secondURL={farm?.projectLink}
            secondURLTitle={t('Learn More')}
            tokenContract={farm?.lpStakeTokenAddress}
            jungleFarm={farm}
          />
        ),
        cardContent: (
          <Flex sx={styles.cardContent}>
            <ListViewContent
              title={t('APY')}
              value={parseFloat(farm?.apy ?? '0') > 1000000 ? `>1,000,000%` : `${farm?.apy}%`}
              toolTip={t(
                'APY includes annualized BANANA rewards and rewards for providing liquidity (DEX swap fees), compounded daily.',
              )}
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(8%, 0%)"
              // aprCalculator={
              //   <CalcButton
              //     label={farm.lpSymbol}
              //     rewardTokenName="BANANA"
              //     rewardTokenPrice={farm.bananaPrice}
              //     apr={parseFloat(farm?.apr)}
              //     lpApr={parseFloat(farm?.lpApr)}
              //     apy={parseFloat(farm?.apy)}
              //     lpAddress={farm.lpAddresses[chainId]}
              //     isLp
              //     tokenAddress={farm.tokenAddresses[chainId]}
              //     quoteTokenAddress={farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAdresses[chainId]}
              //     lpCurr1={farm?.tokenAddresses[chainId]}
              //     lpCurr2={farm?.quoteTokenAdresses[chainId]}
              //   />
              // }
              style={styles.apyInfo}
            />
            <Flex sx={{ ...styles.onlyDesktop, maxWidth: '180px', width: '100%' }}>
              <ListViewContent
                title={t('APR')}
                value={`${farm?.apr}%`}
                value2={`${farm?.lpApr ?? 0}%`}
                value2Icon={
                  <span style={{ marginRight: '7px', transform: 'rotate(45deg)' }}>
                    <Svg icon="swapArrows" width={13} color="text" />
                  </span>
                }
                valueIcon={
                  <span style={{ marginRight: '5px' }}>
                    <ServiceTokenDisplay token1={farm.rewardToken.symbol} size={12} />
                  </span>
                }
                toolTip={t(
                  'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(8%, 0%)"
                value2Direction="column"
                style={styles.farmInfo}
              />
            </Flex>
            <Flex sx={{ ...styles.onlyDesktop, maxWidth: '180px', width: '100%' }}>
              <ListViewContent
                title={t('Liquidity')}
                value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
                toolTip={t('The total value of the LP tokens currently staked in this farm.')}
                toolTipPlacement={'bottomLeft'}
                toolTipTransform={'translate(23%, 0%)'}
                style={styles.farmInfo}
              />
            </Flex>
            <ListViewContent title={t('Earned')} value={userEarningsUsd} style={styles.earnedInfo} />
          </Flex>
        ),
        expandedContent: (
          <Flex sx={styles.expandedContent}>
            <Flex sx={{ ...styles.onlyMobile, width: '100%' }}>
              <ListViewContent
                title={t('APR')}
                value={`${farm?.lpApr}%`}
                valueIcon={
                  <span style={{ marginRight: '7px', transform: 'rotate(45deg)' }}>
                    <Svg icon="swapArrows" width={13} color="text" />
                  </span>
                }
                value2={`${farm?.apr}%`}
                value2Icon={
                  <span style={{ marginRight: '5px' }}>
                    <Svg icon="banana_token" width={15} color="text" />
                  </span>
                }
                toolTip={t(
                  'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(8%, 0%)"
                style={styles.farmInfo}
              />
              <ListViewContent
                title={t('Liquidity')}
                value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
                toolTip={t('The total value of the LP tokens currently staked in this farm.')}
                toolTipPlacement={'bottomLeft'}
                toolTipTransform={'translate(23%, 0%)'}
                style={styles.farmInfo}
              />
            </Flex>
            <Flex sx={styles.actionContainer}>
              <ListViewContent
                title={t('Available')}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                value2Direction="column"
                style={{ maxWidth: '50%', flexDirection: 'column' }}
              />
              <Flex
                sx={{
                  width: '100%',
                  maxWidth: ['130px', '130px', '140px'],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  // onClick={() =>
                  //   showLiquidity(
                  //     farm.tokenAddresses[chainId],
                  //     farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAdresses[chainId],
                  //     farm,
                  //   )
                  // }
                  sx={styles.styledBtn}
                >
                  <Text sx={{ lineHeight: '18px', mr: '5px' }}>{t('GET LP')}</Text>
                  <span sx={{ ml: '5px' }}>
                    <Svg icon="ZapIcon" color="primaryBright" />
                  </span>
                </Button>
              </Flex>
            </Flex>
            <Flex sx={{ ...styles.onlyDesktop, mx: '10px' }}>
              <Svg icon="caret" direction="right" width="20px" />
            </Flex>
            <CardActions
              allowance={userAllowance?.toString() ?? ''}
              stakedBalance={farm?.userData?.stakedBalance?.toString() ?? ''}
              stakingTokenBalance={farm?.userData?.tokenBalance?.toString() ?? ''}
              stakeLpAddress={farm.lpStakeTokenAddress}
              lpValueUsd={farm.lpValueUsd ?? 0}
              pid={farm.pid}
              farmTypes={farm.farmType}
            />
            <Flex sx={{ ...styles.onlyDesktop, mx: '10px' }}>
              <Svg icon="caret" direction="right" width="20px" />
            </Flex>
            <Harvest
              pid={farm.pid}
              disabled={userEarnings === '0.00'}
              userEarnings={userEarnings}
              userEarningsUsd={userEarningsUsd}
              farmType={farm.farmType}
              contractAddress={farm?.contractAddress}
            />
          </Flex>
        ),
      },
    }
  })

  return <ListView listViews={farmsListView} />
}

export default DisplayFarms
