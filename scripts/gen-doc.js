const pkg = require('../package.json')
const path = require('path')
const exec = require('child_process').execSync
const fs = require('fs')

exec(`cp ${path.resolve(__dirname, `../dist/cov-comment-v${pkg.version}.min.js`)} ${path.resolve(__dirname, '../docs/cov-comment.js')}`)
exec(`cp -r ${path.resolve(__dirname, '../public/*')} ${path.resolve(__dirname, '../docs/')}`)

const doc = fs.readFileSync(path.resolve(__dirname, '../README.md'), { encoding: 'utf8' })

const template = `
(function () {
  window.__doc__ = unescape('${escape(doc)}')
})()
`
fs.writeFileSync(path.resolve(__dirname, '../docs/doc.js'), template, { encoding: 'utf8' })
