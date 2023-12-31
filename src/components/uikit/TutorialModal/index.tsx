import React, { useState } from 'react'
import { Box } from 'theme-ui'
import { CountProps, TModalProps } from './types'
import { styles, dynamicStyles } from './styles'
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints'
import { Button, Flex, Modal, Text } from 'components/uikit'

const Circle: React.FC<CountProps> = ({ index, goToStep, isActive }) => {
  return (
    <Flex
      sx={dynamicStyles.allCircle({ isActive })}
      // eslint-disable-next-line react/no-array-index-key
      key={`circle-${index}`}
      onClick={goToStep}
    />
  )
}
const TutorialModal: React.FC<TModalProps> = ({ type, title, description, children, onDismiss, t, isConnected }) => {
  const [step, setStep] = useState<number>(0)
  const slideNumber = isConnected ? step + 1 : step
  const { isMobile } = useMatchBreakpoints()

  const handleNext = () => {
    setStep(step + 1)
  }

  const renderChildren = () => {
    return children?.map((element, i) => (
      <Flex key={i}>
        {step === i && (
          <Flex sx={{ width: '100%', flexWrap: 'wrap', mt: ['15px', '15px', '15px', '30px'] }}>{element}</Flex>
        )}
      </Flex>
    ))
  }

  const renderDots = () => {
    return [...Array(children?.length)].map((_, index) => (
      <Circle index={index} goToStep={() => setStep(index)} isActive={index === step} key={index} />
    ))
  }

  return (
    <Modal
      zIndex={101}
      onDismiss={onDismiss}
      sx={{
        width: ['280px', '280px', '280px', '873px'],
        minWidth: ['280px', '280px', '280px', '873px'],
        height: ['', '', '', '500px'],
        overflow: 'visible',
      }}
    >
      <Flex className="tutorial-modal" sx={styles.modalCon}>
        <Flex width={22} onClick={onDismiss} sx={{ cursor: 'pointer', position: 'absolute', right: '20px' }}>
          <Text>x</Text>
        </Flex>
        <Flex sx={styles.contentBody}>
          <Box sx={dynamicStyles.showApe({ slideNumber, type })} />
          <Flex sx={styles.rightCon}>
            <Flex sx={styles.right}>
              <Flex sx={styles.modalHeader}>
                <Text sx={styles.title}>{t(`${title}`)}</Text>
                <Text sx={styles.description}>{t(`${description}`)}</Text>
              </Flex>
              {renderChildren()}
            </Flex>
            <Flex sx={styles.modalFooter}>
              <Flex sx={styles.circles}>{renderDots()}</Flex>
              <Button onClick={step >= (children?.length || 0) - 1 ? onDismiss : handleNext} sx={styles.readyBtn}>
                {step >= (children?.length || 0) - 1 ? t("I'm Ready") : t('Next')}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default TutorialModal
