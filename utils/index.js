import { BOTTOM_TAB_COLORS } from '../constants'

export const getRandomColor = () =>
  BOTTOM_TAB_COLORS[
    Math.floor(Math.random() * (BOTTOM_TAB_COLORS.length - 0) + 0)
  ]

export const limit = (text, max) =>
  text?.length >= max ? text?.slice(0, max - 3) + '...' : text

export const getAvatarText = text =>
  text?.includes(' ')
    ? text?.split(' ')[0][0] + text.split(' ')[1][0]
    : text
    ? text[0]?.toUpperCase()
    : ''
export const Unique = (arr, attr) => {
  let uniques = []
  let itemsFound = {}
  for (let val of arr) {
    if (itemsFound[val[attr]]) {
      continue
    }
    uniques.push(val)
    itemsFound[val[attr]] = true
  }
  return uniques
}

// Push Notification utils

const PUSH_NOTIFCATION_URL = 'https://exp.host/--/api/v2/push/send'

const getHeaders = () =>
  JSON.stringify({
    Accept: 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
  })

const getMethod = () => 'POST'

const getBody = (token, title, body, data = {}) =>
  JSON.stringify({
    to: token,
    title,
    body,
    data,
  })

export const sendNotifcation = (token, title, description, data = {}) => {
  if (token) {
    fetch(PUSH_NOTIFCATION_URL, {
      method: getMethod(),
      headers: getHeaders(),
      body: getBody(token, title, description, data),
    }).catch(err => console.log('Unable to send push notification ', err))
  }
}
