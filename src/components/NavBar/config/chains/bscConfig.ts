const TEMP_APESWAP_URL = process.env.NEXT_PUBLIC_LEGACY_APESWAP_URL
import { NavConfig } from 'components/NavBar/types'

const bscConfig: NavConfig[] = [
  {
    label: 'Exchange',
    items: [
      {
        label: 'Swap',
        href: 'https://dex.apeswap.finance/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://dex.apeswap.finance/zap',
      },
      {
        label: 'Pro Trading',
        href: 'https://pro.apeswap.finance',
      },
      {
        label: 'GNANA',
        href: `/gnana`,
      },
    ],
  },
  {
    label: 'Stake',
    items: [
      {
        label: 'Pools',
        href: `/pools`,
        isNew: true,
      },
      {
        label: 'Farms',
        href: `/farms`,
      },
      {
        label: 'Maximizers',
        href: `${TEMP_APESWAP_URL}/maximizers`,
      },
    ],
  },
  {
    label: 'Raise',
    items: [
      {
        label: 'Bonds',
        href: `/bonds`,
      },
      {
        label: 'Liquidity Health',
        href: `/liquidity-health`,
      },
    ],
  },
  {
    label: 'Collect',
    items: [
      {
        label: 'NFA Collection',
        href: `${TEMP_APESWAP_URL}/nft`,
      },
      {
        label: 'NFA Auction',
        href: `${TEMP_APESWAP_URL}/auction`,
      },
      {
        label: 'NFA Liquidity',
        href: 'https://liquidcollectibles.io/collection/0x6afc012783e3a6ef8c5f05f8eee2edef6a052ec4',
      },
      {
        label: 'NFB Collection',
        href: 'https://nftkey.app/collections/nfbs/',
      },
      {
        label: 'NFB Liquidity',
        href: 'https://liquidcollectibles.io/collection/0x9f707a412302a3ad64028a9f73f354725c992081',
      },
    ],
  },
  {
    label: 'Lend',
    href: 'https://lending.apeswap.finance/',
  },
  {
    label: 'Explore',
    items: [
      {
        label: 'ApeStats',
        href: `${TEMP_APESWAP_URL}/apestats`,
      },
      {
        label: 'Dashboard',
        href: `/protocol-dashboard`,
      },
      {
        label: 'Documentation',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
      },
      {
        label: 'Charts',
        href: `${TEMP_APESWAP_URL}/info`,
      },
      {
        label: 'Governance',
        href: 'https://discuss.apeswap.finance',
      },
      // {
      //   label: 'Newsletter',
      //   href: '?modal=newsletter',
      // },
    ],
  },
]

export default bscConfig
