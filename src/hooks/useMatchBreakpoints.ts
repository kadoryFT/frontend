import { MatchBreakpointsContext } from 'contexts/MatchBreakpoints'
import { useContext } from 'react'

const useMatchBreakpoints = () => {
  const matchBreakpointContext = useContext(MatchBreakpointsContext)

  if (matchBreakpointContext === undefined) {
    throw new Error('Match Breakpoint context is undefined')
  }

  return matchBreakpointContext
}

export default useMatchBreakpoints
