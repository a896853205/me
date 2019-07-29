import React from 'react';
// 请求文件
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';
// UI组件
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
} from 'antd';

class AddEquipController extends React.Component {
  state = {
    imgLoading: false,
  };
  render() {
    const { getFieldDecorator } = this.props.form;
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
            {getFieldDecorator('pic')(
              <Upload
                name="avatar"
                listType="picture"
                className="avatar-uploader"
                showUploadList={true}
                // beforeUpload={this.beforeUpload}
                // onChange={this.handleUploadChange}
              >
                <Button>
                  <Icon type="upload" /> 传一些图片
                </Button>
              </Upload>
            )}
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
}
export default Form.create({ name: 'AddEquipController' })(AddEquipController);