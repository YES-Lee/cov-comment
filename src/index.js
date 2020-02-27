import { LitElement, html, property, unsafeCSS } from 'lit-element';
import styles from './index.less'
import { loadDeps, convertComment } from './lib/utils'
import './components/cov-text'
import './components/cov-row'
import { repeat } from 'lit-html/directives/repeat'
import { initAV, Comment, fetchComments, countComments } from './lib/api';
import loading16 from './assets/icons/loading_x16.png'

class CovComment extends LitElement {

  static get styles() {
    return unsafeCSS(styles)
  }

  @property() appid = ''
  @property() appkey = ''
  @property({ type: Number }) pageSize = 10
  @property() placeholder = '评论一下～'

  comments = []
  count = 0
  page = 1
  initializing = true
  nomore = false
  loadingMore = false

  constructor() {
    super()
  }

  async firstUpdated() {
    if (!this.appid) {
      throw new Error('请填写正确的appId')
    }
    if (!this.appkey) {
      throw new Error('请填写正确的appKey')
    }
    try {
      await loadDeps()
    } catch(e) {
      console.error(e)
      throw new Error('依赖加载失败')
    }

    initAV({ appId: this.appid, appKey: this.appkey })

    countComments(window.location.pathname).then(count => {
      this.count = count
      this.requestUpdate()
    })
    fetchComments({ page: this.page, pageSize: this.pageSize }).then(comments => {
      this.comments.push(...comments)
      this.initializing = false
      this.requestUpdate()
    })
  }

  handleSubmitComment(e) {
    const target = e.target
    const comment = convertComment(new Comment(e.detail))
    comment.save().then(data => {
      target.reset()
      this.comments = [data.toFullJSON()].concat(this.comments)
      this.requestUpdate()
    })
  }

  handleLoadMore() {
    if (this.loadingMore) {
      return
    }
    this.loadingMore = true
    this.requestUpdate()
    this.page = this.page + 1
    fetchComments({ page: this.page, pageSize: this.pageSize }).then(comments => {
      this.comments.push(...comments)
      if (!comments.length) {
        this.nomore = true
      }
      this.loadingMore = false
      this.requestUpdate()
    })
  }

  render() {
    return html`
      <div class="cov-comment">
        ${
          this.initializing ?
          html`<div class="initializing">CovComment正在加载中...</div>` :
          html`
            <cov-text
              @submit="${this.handleSubmitComment}"
              placeholder="${this.placeholder}"
            ></cov-text>
            <div class="comment-count">
              <div class="line"></div>
              <div class="count-text">${this.count} comments</div>
              <div class="line"></div>
            </div>
            <div class="comment-list">
              ${
                repeat(this.comments, item => item.objectId, (item, index) => {
                  return html`
                    <div id="${item.objectId}" class="comment-row">
                      <cov-row
                        comment="${JSON.stringify(item)}"
                      ></cov-row>
                    </div>
                  `
                })
              }
              ${
                !this.nomore ?
                html`<div class="load-more ${this.loadingMore ? 'loading' : ''}" @click="${this.handleLoadMore}">
                  ${
                    this.loadingMore ?
                    html`<img class="loading-more-image" src="${loading16}">` :
                    ''
                  }
                  加载更多评论
                </div>` :
                ''
              }
            </div>
          `
        }
      </div>
    `
  }
}

customElements.define('cov-comment', CovComment)
