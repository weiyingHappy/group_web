import React from 'react'
import { Icon, Spin, Upload, Modal, message } from 'antd'
import { connect } from 'dva'
import cookie from 'js-cookie'
import { qiniuPrefix } from 'config'
import styles from './Editables.less'

class EditableImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      showEdit: false,

      initValue: props.value,
      nowValue: props.value,
      fileList: null,
      previewVisible: false,
      previewImage: null,
    }
  }

  componentWillMount() {
    this.setFileList()
    this.props.dispatch({
      type: 'app/qiuniuToken',
    })
  }

  setFileList(init) {
    let toList = this.state.nowValue
    if (init === true) {
      toList = this.state.initValue
    }
    this.state.fileList = (toList || []).map((img, i) => {
      return {
        uid: i, name: `${i}`, status: 'done', url: img,
      }
    })
  }

  render() {
    const { dispatch, router, loading, title, bindName, noedit, nocolon } = this.props

    const handleImgUping = (fileList) => {
      this.setState({ fileList })
    }

    const handlePreview = (file) => {
      this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl })
    }

    const handlePreviewCancel = () => {
      this.setState({ previewVisible: false })
    }

    const handleImgChanged = (flag, data) => {
      const nowImgs = (this.state.nowValue || []).slice(0)
      if (this.state.edit !== true) {
        message.warn('非编辑状态下不能删除')
        return
      }
      if (flag == 'del') {
        if (confirm('确认删除？')) {
          nowImgs.splice(data, 1)
        }
      } else if (flag == 'add') {
        nowImgs.push(data)
      }

      const newfileList = (nowImgs || []).map((img, i) => {
        return {
          uid: i, name: `${i}`, status: 'done', url: img,
        }
      })

      this.setState({ nowValue: nowImgs, fileList: newfileList })

      if (this.props.onChange instanceof Function) {
        this.props.onChange(nowImgs)
      }
    }

    const imgUploadShow = {
      name: 'file',
      action: 'https://up.qbox.me/',
      listType: 'picture-card',
      data: { token: cookie.get('qiniutoken') },
      fileList: this.state.fileList,
      onPreview(file) {
        handlePreview(file)
      },
      onChange(info) {
        if (info.file.status === 'uploading') {
          handleImgUping(info.fileList)
        } else if (info.file.status === 'done') {
          const qiniuUrl = qiniuPrefix + info.file.response.hash
          handleImgChanged('add', qiniuUrl)
        } else if (info.file.status === 'error') {
          message.error('上传错误，可能请求已过期，请刷新页面重试')
        }
      },
      onRemove(info) {
        const index = info.uid
        handleImgChanged('del', index)
      },

    }

    const getPreviewModal = () => {
      return (
        <Modal
          visible={this.state.previewVisible}
          onCancel={handlePreviewCancel}
          footer={null}
        >
          <img
            alt="example"
            style={{ width: '100%' }}
            src={this.state.previewImage}
          />
        </Modal>)
    }

    if (this.state.edit) {
      return (
        <div className={styles.signleTopRow}>
          <p>{title}{nocolon || '：'}</p>
          <Spin spinning={loading.effects[`${router.model}/edit`] === true}>
            <Upload {...imgUploadShow}>
              <div style={{ height: 96 }}>
                <Icon type="plus" />
                <div>上传</div>
              </div>
            </Upload>
            {getPreviewModal()}
            <p>
              <Icon
                type="check"
                onClick={() => {
                  const payload = {}
                  payload[bindName] = this.state.nowValue
                  dispatch({
                    type: `${router.model}/edit`,
                    payload: { ...payload },
                    action: 'edit',
                    didAction: {
                      type: 0,
                      cb: () => {
                        this.setState({ edit: false, initValue: this.state.nowValue })
                        this.setFileList()
                      },
                    },
                  })
                }}
              />
            </p>
            <p>
              <Icon
                type="close"
                onClick={() => {
                  this.setState({ edit: false, nowValue: this.state.initValue })
                  this.setFileList(true)
                }}
              />
            </p>
          </Spin>
        </div>
      )
    }
    return (
      <div
        className={styles.signleTopRow}
        onMouseOver={() => { this.setState({ showEdit: true }) }}
        onMouseLeave={() => { this.setState({ showEdit: false }) }}
      >
        <p>{title}{nocolon || '：'}</p>
        <Upload {...imgUploadShow} />
        {getPreviewModal()}
        {
          this.state.showEdit && noedit !== true ?
            <p>
              <Icon
                type="edit"
                onClick={() => { this.setState({ edit: true }) }}
              />
            </p>
            : ''
        }
      </div>
    )
  }
}

function mapStateToProps({ app, loading }) {
  return { router: app.router, loading }
}

export default connect(mapStateToProps)(EditableImage)
