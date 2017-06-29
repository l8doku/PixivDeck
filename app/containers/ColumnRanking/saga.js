// @flow
import union from 'lodash/union'
import { addColumn } from 'containers/ColumnManager/actions'
import { getRequest } from '../../api/client'
import * as Actions from './constants'
import * as actions from './actions'
import type { Mode } from './reducer'
import { makeSelectColumn, makeSelectModes } from './selectors'
import { put, select, call, takeEvery } from 'redux-saga/effects'

function* addRakingColumn({ mode }: { mode: Mode }) {
  const id = mode
  // TODO i18n
  const title = `${mode}`

  const modes: Array<?Mode> = yield select(makeSelectModes())
  if (modes.every(v => v !== mode)) {
    yield put(actions.addRankingColumnSuccess(id, title))
  }

  yield put(addColumn(`ranking-${id}`, { columnId: id, type: 'RANKING' }))
}

function* fetchRanking(props: { id: Mode }) {
  const { id } = props
  const { illustIds } = yield select(makeSelectColumn(), props)

  try {
    const response = yield call(getRequest, `/v1/illust/ranking?mode=${id}`)
    const { result } = response

    yield put(actions.setNextUrl(id, result.nextUrl))

    const nextIds = union(result.illusts, illustIds)
    yield put(actions.fetchRankingSuccess(id, response, nextIds))
  } catch (err) {
    yield put(actions.fetchRankingFailre(id))
  }
}

export default function* root(): Generator<*, void, void> {
  yield takeEvery(Actions.ADD_RANKING_COLUMN, addRakingColumn)
  yield takeEvery(Actions.FETCH_RANKING, fetchRanking)
}