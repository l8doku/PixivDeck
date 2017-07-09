// @flow
import type { Action } from './actionTypes.js'
import {
  ADD_COLUMN,
  ADD_COLUMN_SUCCESS,
  FETCH_RANKING,
  FETCH_RANKING_FAILRE,
  FETCH_NEXT_RANKING,
  FETCH_NEXT_RANKING_FAILRE,
  SET_NEXT_URL,
  FETCH_RANKING_SUCCESS,
  FETCH_NEXT_RANKING_SUCCESS,
} from './constants'
import type { Response } from 'services/api'
import type { ColumnId } from './reducer'

export function addColumn(id: ColumnId): Action {
  return {
    type: ADD_COLUMN,
    id,
  }
}

export function addColumnSuccess(id: ColumnId): Action {
  return {
    type: ADD_COLUMN_SUCCESS,
    id,
  }
}

export function fetchRanking(id: ColumnId): Action {
  return {
    type: FETCH_RANKING,
    id,
  }
}

export function fetchRankingFailre(id: ColumnId): Action {
  return {
    type: FETCH_RANKING_FAILRE,
    id,
  }
}

export function fetchNextRanking(id: ColumnId): Action {
  return {
    type: FETCH_NEXT_RANKING,
    id,
  }
}

export function fetchNextRankingFailre(id: ColumnId): Action {
  return {
    type: FETCH_NEXT_RANKING_FAILRE,
    id,
  }
}

export function setNextUrl(id: ColumnId, nextUrl: string): Action {
  return {
    type: SET_NEXT_URL,
    id,
    nextUrl,
  }
}

export function fetchRankingSuccess(
  id: ColumnId,
  response: Response,
  ids: Array<number>
): Action {
  return {
    type: FETCH_RANKING_SUCCESS,
    id,
    response,
    ids,
  }
}

export function fetchNextRankingSuccess(
  id: ColumnId,
  response: Response,
  ids: Array<number>
): Action {
  return {
    type: FETCH_NEXT_RANKING_SUCCESS,
    id,
    response,
    ids,
  }
}
