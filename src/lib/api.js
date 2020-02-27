import md5 from 'md5'

export function initAV({ appId, appKey }) {
  if (window.AV) {
    // v4.0.0开始需要配置serverUrls
    AV.init({
      appId,
      appKey
    })
  } else {
    throw new Error('AV is undefined')
  }
}

export function countComments(url) {
  const rootQuery = new AV.Query('CovComment')
  rootQuery.equalTo('url', window.location.pathname)
  return new Promise(resolve => {
    rootQuery.count().then(count => {
      resolve(count)
    })
  })
}

export async function fetchComments({ page, pageSize }) {
  const rootQuery = new AV.Query('CovComment')
  const childrenQuery = new AV.Query('CovComment')
  rootQuery.equalTo('url', window.location.pathname)
  rootQuery.descending('createdAt');
  rootQuery.doesNotExist('rid')
  rootQuery.limit(10)
  rootQuery.skip((page - 1) * pageSize)
  const rootData = await rootQuery.find()
  const rootComments = rootData.map(item => item.toFullJSON())
  childrenQuery.containedIn('rid', rootComments.map(item => item.objectId))
  childrenQuery.descending('createdAt');
  const childrenComments = await childrenQuery.find()
  const rootMap = new Map()
  for (const parent of rootComments) {
    rootMap.set(parent.objectId, parent)
  }
  for (const c of childrenComments) {
    const child = c.toFullJSON()
    const parent = rootMap.get(child.rid)
    parent.children = parent.children || []
    parent.children.push(child)
  }
  return Promise.resolve([...rootMap.values()])
}

export function gavatar(email = '') {
  const hash = md5(email.trim()).toLowerCase()
  return `//www.gravatar.com/avatar/${hash}`
}

export class Comment {
  pid = null
  rid = null
  nick = ''
  email = ''
  link = ''
  url = ''
  ip = ''
  ua = ''
  comment = ''

  constructor(props = {
    pid,
    rid,
    nick,
    email,
    link,
    url,
    ip,
    ua,
    comment
  }) {
    this.pid = props.pid
    this.rid = props.rid
    this.nick = props.nick || 'Anonymous'
    this.email = props.email
    this.link = props.link
    this.url = props.url || window.location.pathname
    this.ip = props.ip
    this.ua = props.ua || window.navigator.userAgent
    this.comment = props.comment
  }
}
