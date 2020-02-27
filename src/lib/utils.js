export async function loadScript({ url, defer = false, async = false }) {
  const script = window.document.createElement('script')
  script.src = url
  script.defer = defer
  script.async = async
  return new Promise((resolve, reject) => {
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject(new Error(`script load faild. [${url}]`))
    }
    window.document.head.appendChild(script)
  })
}

export async function loadDeps() {
  const p = []
  if (!window.AV) {
    p.push(loadScript({
      url: '//cdn.jsdelivr.net/npm/leancloud-storage@3.15.0/dist/av-min.js',
      async: true
    }))
  }
  if (!window.axios) {
    p.push(loadScript({
      url: 'https://unpkg.com/axios/dist/axios.min.js',
      async: true
    }))
  }
  try {
    await Promise.all(p)
    return Promise.resolve()
  } catch(e) {
    return Promise.reject(e)
  }
}

export function convertComment(comment = {}) {
  const CovComment = new AV.Object.extend('CovComment')
  const covComment = new CovComment()
  for (const k in comment) {
    covComment.set(k, comment[k])
  }
  return covComment
}

export function formatDate(date) {
  const dt = new Date(date)
  const month = dt.getMonth() + 1 >= 10 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)
  const day = dt.getDate() >= 10 ? dt.getDate() : '0' + dt.getDate()
  const hours = dt.getHours() >= 10 ? dt.getHours() : '0' + dt.getHours()
  const minutes = dt.getMinutes() >= 10 ? dt.getMinutes() : '0' + dt.getMinutes()
  const seconds = dt.getSeconds() >= 10 ? dt.getSeconds() : '0' + dt.getSeconds()
  return `${dt.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function trimUa(ua = '') {
  const reg = /\(\S*;/gi
  const match = ua.match(reg)
  if (match[0]) {
    return match[0].replace(/\(|;/g, '')
  }
  return ''
}
