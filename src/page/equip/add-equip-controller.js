import React from 'react';
// 请求文件
import { launchRequest, uploadProjectImageToQiniu } from '../../util/request';
import * as APIS from '../../constants/api-constants';
// UI组件
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
  message
} from 'antd';

class AddEquipController extends React.Component {
  state = {
    imgLoading: false,
    fileList: [],
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList } = this.state;
    // 表单布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    // 表单其中的组件布局
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    return (
      <div>增加装备订单
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '你至少告诉我它叫啥呀!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="金币数">
            {getFieldDecorator('money', {
              rules: [{ 
                required: true, 
                message: '这东西不是免费的吧!' 
              }, {
                type: 'number',
                message: '你确定输入的是金币数?',
                transform: value => parseFloat(value)
              }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('des')(<Input />)}
          </Form.Item>
          <Form.Item label="图片">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList = { true }
              beforeUpload = { this.beforeUpload }
              customRequest = { this.handleUploadcustomRequest }
              fileList = { fileList }
              onChange={this.handleImageChange}
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              种草!
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 在这里调用表单
        launchRequest(APIS.EQUIP_INSERT, values)
        .then(data => {
          console.log(data);
        });
        console.log('Received values of form: ', values);
      }
    });
  };

  // Antd的Upload组件上传前操作的钩子, 如返回false则不进行上传, 返回true进行上传
  beforeUpload (file) {
    // 判断条件
    const permitionImgType = file.type === 'image/jpeg' || file.type === 'image/png';
    const passSizeLimit = file.size / 1024 / 1024 < 2;

    if (!permitionImgType) {
      message.error('请上传格式为png或jpg的图片文件');
    }
    
    if (!passSizeLimit) {
      message.error('图片大小需小于2Mb');
    }

    return permitionImgType && passSizeLimit;
  }

  handleUploadcustomRequest = info => {
    let { fileList } = this.state;

    uploadProjectImageToQiniu(info.file)
    .then(
      res => {
        message.success('上传成功');
        console.log(res);
        // 设置上传完的图片显示
        info.file.status = 'done';
        // 这里获取图片的连接!
        info.file.url = 'http://www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super';
        fileList.push(info.file)
        this.setState({
          fileList
        })
      }
    )
    .catch(
      err => {
        message.error('上传失败');
        message.error(err);
      }
    )
  }

  handleImageChange = info => {

    // 删除图片时,图片列表进行更新
    if (info.file.status === 'removed') {
      this.setState({
        fileList: info.fileList
      })
    }
  }
}
export default Form.create({ name: 'AddEquipController' })(AddEquipController);