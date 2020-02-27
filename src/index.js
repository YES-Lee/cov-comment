import { LitElement, html, property, unsafeCSS } from 'lit-element';
import styles from './index.less'
import { loadDeps, convertComment } from './lib/utils'
import './components/cov-text'
import './components/cov-row'
import { repeat } from 'lit-html/directives/repeat'
import { initAV, Comment, fetchComments, countComments } from './lib/api';

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
                    html`<svg class="loading-more-image" t="1582828134857" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3066" width="16" height="16"><path d="M512 0c-7.5 0-14.8 3-20.1 8.3-5.3 5.3-8.3 12.6-8.3 20.1V256c0 15.7 12.7 28.4 28.4 28.4s28.4-12.7 28.4-28.4V28.4c0-7.5-3-14.8-8.3-20.1C526.8 3 519.5 0 512 0z m0 739.6c-7.5 0-14.8 3-20.1 8.3-5.3 5.3-8.3 12.6-8.3 20.1v227.6c0 15.7 12.7 28.4 28.4 28.4s28.4-12.7 28.4-28.4V768c0-7.5-3-14.8-8.3-20.1-5.3-5.4-12.6-8.4-20.1-8.3zM190.2 150c-11.1-11.1-29.1-11.1-40.2 0-11.1 11.1-11.1 29.1 0 40.2l160.9 160.9c7.2 7.2 17.7 10 27.5 7.4 9.8-2.6 17.5-10.3 20.1-20.1 2.6-9.8-0.2-20.3-7.4-27.5L190.2 150z m522.9 522.9c-11.1-11.1-29.1-11.1-40.2 0-11.1 11.1-11.1 29.1 0 40.2L833.8 874c11.1 11.1 29.1 11.1 40.2 0 11.1-11.1 11.1-29.1 0-40.2L713.1 672.9zM284.4 512c0-7.6-3-14.8-8.3-20.1-5.3-5.3-12.6-8.3-20.1-8.3H28.4C12.7 483.6 0 496.3 0 512s12.7 28.4 28.4 28.4H256c7.5 0 14.8-3 20.1-8.3 5.4-5.3 8.4-12.6 8.3-20.1z m711.2-28.4H768c-15.7 0-28.4 12.7-28.4 28.4s12.7 28.4 28.4 28.4h227.6c15.7 0 28.4-12.7 28.4-28.4s-12.7-28.4-28.4-28.4zM310.9 672.9L150 833.8c-7.2 7.2-10 17.7-7.4 27.5 2.6 9.8 10.3 17.5 20.1 20.1 9.8 2.6 20.3-0.2 27.5-7.4l160.9-160.9c11.1-11.1 11.1-29.1 0-40.2-11.1-11.1-29.1-11.1-40.2 0zM693 359.4c7.5 0 14.8-3 20.1-8.3L874 190.2c7.2-7.2 10-17.7 7.4-27.5a28.36 28.36 0 0 0-20.1-20.1c-9.8-2.6-20.3 0.2-27.5 7.4L672.9 310.9c-8.1 8.1-10.6 20.4-6.2 31 4.5 10.6 14.8 17.5 26.3 17.5z m0 0" p-id="3067"></path></svg>` :
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
