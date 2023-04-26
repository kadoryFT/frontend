import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'mainContainer'
  | 'cardContainer'
  | 'titleContainer'
  | 'titleText'
  | 'healthRowsContainer'
  | 'ownershipContainer'
  | 'chart'
  | 'chartDetails'
  | 'whiteContainer'
  | 'ownerRowsContainer'
  | 'rowContainer',
  ThemeUIStyleObject> = {
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  cardContainer: {
    width: '100%',
    background: 'white2',
    borderRadius: '10px',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: 'fit-content',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    mt: ['20px'],
  },
  titleText: {
    fontWeight: 600,
    fontSize: ['16px'],
    lineHeight: ['20px'],
  },
  healthRowsContainer: {
    width: '100%',
    mt: ['10px'],
    p: ['20px'],
    flexDirection: 'column',
  },
  ownershipContainer: {
    width: '100%',
    my: '20px',
    maxWidth: '380px',
  },
  chart: {
    width: '40%',
    pl: '30px',
    minHeight: '110px',
  },
  chartDetails: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
    px: '30px',
  },
  whiteContainer: {
    width: '100%',
    p: '20px',
    maxHeight: '226px',
  },
  ownerRowsContainer: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    flexDirection: 'column',
    px: '10px',
  },
  rowContainer: {
    width: '100%',
    justifyContent: 'space-between',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
  }
}