import { LitElement, html, property, css, unsafeCSS } from 'lit-element';
import styles from './index.less'
import mdStyles from 'github-markdown-css/github-markdown.css'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import '../cov-text'
import { convertComment, formatDate, trimUa } from '../../lib/utils';
import { Comment, gavatar } from '../../lib/api';
import { repeat } from 'lit-html/directives/repeat'

class CovRow extends LitElement {

  static get styles() {
    return [unsafeCSS(styles), unsafeCSS(mdStyles)]
  }

  reply = false

  @property({ type: Object }) comment = {}

  constructor() {
    super()
  }

  clickReply() {
    this.reply = !this.reply
    this.requestUpdate()
  }

  handleSubmitReply(e) {
    const target = e.target
    const comment = convertComment(new Comment(e.detail))
    comment.save().then(data => {
      target.reset()
      this.reply = false
      if (!this.comment.children) {
        this.comment.children = []
      }
      this.comment.children.push(data.toFullJSON())
      this.requestUpdate()
    })
  }

  render() {
    return html`
      <div class="cov-row">
        <div class="left">
          <img class="avatar" src="${gavatar(this.comment.email)}" />
        </div>
        <div class="right">
          <div class="header">
            <span class="nick">${this.comment.nick}</span>
            <span class="ua">${trimUa(this.comment.ua)}</span>
            <span class="time">${formatDate(this.comment.createdAt)}</span>
          </div>
          <p class="content markdown-body">
            ${unsafeHTML(this.comment.comment)}
          </p>

          <cov-text
            class="reply-text ${this.reply ? 'show' : ''}"
            placeholder="@${this.comment.nick}"
            pid="${this.comment.objectId}"
            rid="${this.comment.rid || this.comment.objectId}"
            replyto="${this.comment.nick}"
            @submit="${this.handleSubmitReply}"
          ></cov-text>

          <div class="children comment-list">
            ${repeat(this.comment.children || [], child => child.objectId, (child, index) => {
              return html`
                <div id="${child.objectId}" class="comment-row">
                  <cov-row comment="${JSON.stringify(child)}"></cov-comment>
                </div>
              `
            })}
          </div>
        </div>

        <div class="reply-btn" @click="${this.clickReply}">${this.reply ? '取消' : '回复'}</div>
      </div>
    `
  }
}

customElements.define('cov-row', CovRow)
