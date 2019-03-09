import {
  put,
  select,
  call,
  takeEvery,
  fork,
  take,
  delay,
} from 'redux-saga/effects'
import { addTable } from 'containers/ColumnManager/actions'
import * as api from '../Column/sagas'
import * as Actions from './constants'
import * as actions from './actions'
import { Mode } from './reducer'
import * as selectors from './selectors'

interface Action {
  id: Mode
}
export function* addColumn({ id }: Action) {
  const modes: (Mode | null | undefined)[] = yield select(
    selectors.makeSelectModes()
  )

  if (modes.every(v => v !== id)) {
    yield put(actions.addColumnSuccess(id))
  }

  yield put(
    addTable(`ranking-${id}`, {
      columnId: id,
      type: 'RANKING',
    })
  )
}

const getEndpoint = id => `/v1/illust/ranking?mode=${id}`

export function* fetch(action: Action) {
  const { ids, nextUrl } = yield select(selectors.makeSelectColumn(), action)
  const endpoint = nextUrl ? nextUrl : getEndpoint(action.id)
  yield call(api.fetchColumn, endpoint, action.id, actions, ids)
}
export function* fetchNew({ id }: Action) {
  const { ids } = yield select(selectors.makeSelectColumn(), {
    id,
  })
  yield call(
    api.fetchNew,
    {
      endpoint: getEndpoint(id),
      id,
      ids,
      order: 'overwrite',
    },
    actions
  )
} // $FlowFixMe

export function* watchNewIllust() {
  while (true) {
    const { id } = yield take(Actions.START_WATCH)
    const interval = yield select(selectors.getInterval, {
      id,
    })
    yield delay(interval)
    yield call(fetchNew, {
      id,
    })
    yield put(actions.watchNew(id))
  }
}
export default function* root() {
  yield takeEvery(Actions.ADD_COLUMN, addColumn)
  yield takeEvery(Actions.FETCH, fetch)
  yield fork(watchNewIllust)
}