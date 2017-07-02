// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist'
import localForage from 'localforage'
import reducer from 'reducers'
import type { Store } from 'types'
import mySaga from './sagas'

export default function configureStore(initialState: ?Object): Store {
  const middleware = []

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  const enhancer = compose(
    applyMiddleware(...middleware),
    autoRehydrate(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  const store = createStore(reducer, initialState, enhancer)

  persistStore(store, {
    storage: localForage,
    // TODO 移動
    whitelist: [
      'Table',
      'ColumnManager',
      'ColumnRanking',
      'ColumnRankingR18',
      'ColumnBookmark',
      'ColumnFollow',
      'ColumnUserIllust',
      'ColumnSearch',
      'Language',
      'LoginModal',
      'ModalManeger',
      'SettingModal',
    ],
  })

  sagaMiddleware.run(mySaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}