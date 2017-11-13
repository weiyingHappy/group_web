import React from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import cookie from 'js-cookie'
import config from '../../../utils/config'

class MultiUpFile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originImgs: props.imgs,
      imgs: props.imgs,
      fileList: null,
      previewVisible: false,
      previewImage: null,
    }
  }

  componentWillMount() {
    this.state.fileList = (this.state.imgs || []).map((img, i) => {
      return {
        uid: i, name: `${i}`, status: 'done', url: img,
      }
    })
    this.props.dispatch({
      type: 'app/qiuniuToken',
    })
  }

  render() {
    const handleImgChanged = (flag, data) => {
      const nowImgs = this.state.imgs
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

      this.setState({ imgs: nowImgs, fileList: newfileList })

      if (this.props.onChange instanceof Function) {
        this.props.onChange(nowImgs)
      }
    }

    const handleImgUping = (fileList) => {
      this.setState({ fileList })
    }

    const handlePreview = (file) => {
      this.setState({ previewVisible: true, previewImage: file.url || file.thumbUrl })
    }

    const handlePreviewCancel = () => {
      this.setState({ previewVisible: false })
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
          const qiniuUrl = config.qiniuPrefix + info.file.response.hash
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


    return (
      <span>
        <Upload {...imgUploadShow}>
          {
            this.state.fileList.length < this.props.length ?
              <div style={{ height: 96 }}>
                <Icon type="plus" />
                <div>上传</div>
              </div> :
              ''
          }
        </Upload>
        <Modal visible={this.state.previewVisible} onCancel={handlePreviewCancel} footer={null}>
          <img
            alt="example"
            style={{ width: '100%' }}
            src={this.state.previewImage}
          />
        </Modal>
      </span>
    )
  }
}

MultiUpFile.defaultProps = {
  length: 5,
}

export default MultiUpFile
