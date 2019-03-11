import { shell } from 'electron'
import { select, takeEvery } from 'redux-saga/effects'
import { Illust } from 'types/illust'
import { User } from 'types/user'
import { getSelectIllust } from '../IllustById/selectors'
import { getSelectUser } from '../UserById/selectors'
import * as Actions from './constants'

interface Notify {
  title: string
  icon: string
  body: string
  url?: string
}

export function notify({ title, url, body, icon }: Notify) {
  const notify = new Notification(title, {
    icon,
    body,
  })
  notify.addEventListener('click', () => {
    if (url) {
      shell.openExternal(url)
    }
  })
}

interface NotifyWithIllust {
  title: string
  id: number
}

const baseUrl = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id='

export function* notifyWithIllust({ title, id }: NotifyWithIllust) {
  const illust: Illust = yield select(getSelectIllust, {
    id,
  })

  if (!illust) {
    return
  }

  const user: User = yield select(getSelectUser, {
    id: illust.user,
  })

  if (!user) {
    return
  }

  const icon = illust.imageUrls.squareMedium
  notify({
    title,
    icon,
    body: `${user.name} / ${illust.title}`,
    url: `${baseUrl}${illust.id}`,
  })
}

function* root() {
  yield takeEvery(Actions.ADD_NOTIFY_WITH_ILLUST, notifyWithIllust)
}

export default root
