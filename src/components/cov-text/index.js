import { LitElement, html, property, unsafeCSS } from 'lit-element';
import styles from './index.less'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'

class CovText extends LitElement {

  static get styles() {
    return unsafeCSS(styles)
  }

  @property() placeholder = ''
  @property() pid = null
  @property() rid = null
  @property() replyto = null

  commentEl = ''
  nickEl = ''
  emailEl = ''
  linkEl = ''
  markdown = ''
  statusText = ''
  preview = false

  firstUpdated() {
    this.commentEl = this.shadowRoot.getElementById('comment')
    this.nickEl = this.shadowRoot.getElementById('nick')
    this.emailEl = this.shadowRoot.getElementById('email')
    this.linkEl = this.shadowRoot.getElementById('link')
  }

  submit() {
    let comment = this.commentEl.value
    const nick = this.nickEl.value
    const email = this.emailEl.value
    const link = this.linkEl.value

    if (!comment.replace(/\s/g, '')) {
      return
    }

    if (this.pid && this.replyto) {
      comment = `[@${this.replyto}](#${this.pid}), ${comment}`
    }

    this.convertMarkdown(comment).then(({ data }) => {
      const detail = {
        comment: data,
        nick,
        email,
        link,
      }
      this.pid && (detail.pid = this.pid)
      this.rid && (detail.rid = this.rid)
      const submitEvent = new CustomEvent('submit', {
        detail
      })
      this.setStatusText('正在提交回复...')
      this.dispatchEvent(submitEvent)
    })
  }

  reset() {
    this.commentEl.value = ''
    this.nickEl.value = ''
    this.emailEl.value = ''
    this.linkEl.value = ''
    this.setStatusText('')
  }

  setStatusText(text) {
    this.statusText = text
    this.requestUpdate()
  }

  clickPreview() {
    if (this.preview) {
      this.preview = false
      this.requestUpdate()
      return
    }
    this.convertMarkdown(this.commentEl.value).then(({ data }) => {
      this.markdown = data
      this.preview = true
      this.requestUpdate()
    })
  }

  convertMarkdown(comment) {
    this.setStatusText('正在转换markdown...')
    const axiosGithub = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Accept': 'application/json'
      }
    })
    return axiosGithub.post('/markdown',
      {
        text: comment
      },
    ).then(data => {
      this.setStatusText('')
      this.requestUpdate()
      return data
    })
  }

  render() {
    return html`
      <div class="cov-text">
        ${
          this.preview ?
          html`<div class="preview-content">${unsafeHTML(this.markdown)}</div>` :
          html`<textarea id="comment" placeholder=${this.placeholder} class="cov-text-area" rows="5"></textarea>`
        }
        <div class="cov-text-status-bar">
          <span class="status-text">${this.statusText}</span>
          <span class="preview-btn" title="预览" @click="${this.clickPreview}">
            <svg t="1582821749577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2409" width="16" height="16"><path d="M512 251.853c192.768 0 358.707 113.1 436.378 276.275H1024c-82.022-202.394-280.218-345.293-512-345.293S82.022 325.735 0 528.128h75.674C153.344 364.954 319.284 251.853 512 251.853z m0 552.55c-192.717 0-358.656-113.05-436.326-276.275H0c82.022 202.445 280.166 345.344 512 345.344s430.029-142.9 512-345.344h-75.674C870.707 691.354 704.768 804.403 512 804.403zM327.834 528.128a184.115 184.115 0 1 0 368.281 0.051 184.115 184.115 0 0 0-368.281-0.051z m299.315 0a115.2 115.2 0 1 1-230.298 0 115.2 115.2 0 0 1 230.298 0z m0 0" p-id="2410"></path></svg>
          </span>
          <a class="markdown-helper" title="学习markdown" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
            <svg class="octicon octicon-markdown v-align-bottom" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg>
          </a>
        </div>
        <div class="cov-text-control">
          <div class="cov-text-control-wrapper">
            <input id="nick" class="cov-text-control-input" placeholder="昵称">
          </div>
          <div class="cov-text-control-wrapper">
            <input id="email" class="cov-text-control-input" placeholder="邮箱">
          </div>
          <div class="cov-text-control-wrapper">
            <input id="link" class="cov-text-control-input" placeholder="网站">
          </div>
          <div class="cov-text-control-wrapper">
            <div class="cov-text-control-btn" @click=${this.submit}>
              回复
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('cov-text', CovText)
