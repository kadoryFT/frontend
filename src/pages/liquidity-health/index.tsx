import PageContainer from 'components/PageContainer'
import LHD from 'views/LHD'

import { getIndustryStats } from 'hooks/queries/useGetIndustryStats'
import { getHistoricalIndustryStats } from 'hooks/queries/useGetHistoricalIndustryStats'

const LHDPage = () => {
  return (
    <PageContainer variant="lhd">
      <LHD />
    </PageContainer>
  )
}

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from 'config/constants/queryKeys'

export default LHDPage

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([QUERY_KEYS.INDUSTRY_STATS], getIndustryStats)
  await queryClient.prefetchQuery([QUERY_KEYS.HISTORICAL_INDUSTRY_STATS], getHistoricalIndustryStats)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
