import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import multicall from 'lib/state/multicall'
import { load, save } from 'redux-localstorage-simple'
// import { isTestEnv } from 'utils/env'
// import application from './application/reducer'
import burn from './burn/v2/reducer'
import burnV3 from './burn/v3/reducer'
// import connection from './connection/reducer'
import { updateVersion } from './global/actions'
import lists from './lists/reducer'
// import logs from './logs/slice'
import mint from './mint/v2/reducer'
import mintV3 from './mint/v3/reducer'
// import { routingApi } from './routing/slice'
// import swap from './swap/reducer'
// import transactions from './transactions/reducer'
import user from './user/reducer'
import wallets from './wallets/reducer'

const PERSISTED_KEYS: string[] = ['user', 'lists'] //, 'transactions',

const store = configureStore({
  reducer: {
    // application,
    user,
    // connection,
    // transactions,
    wallets,
    // swap,
    mint,
    mintV3,
    burn,
    burnV3,
    multicall: multicall.reducer,
    lists,
    // logs,
    // [routingApi.reducerPath]: routingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true })
      // .concat(routingApi.middleware)
      .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true }),
})

// store.dispatch(updateVersion())

setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
