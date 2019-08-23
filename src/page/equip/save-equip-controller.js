import React from 'react';
// 路由
import { BCG_ROOT_NAME, EQUIP } from '../../constants/route-constants';
// 请求文件
import { launchRequest, uploadProjectImageToQiniu } from '../../util/request';
import * as APIS from '../../constants/api-constants';
// 工具函数
import { objectHelper } from '../../util/object-helper';
// UI组件
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
  message,
  Radio
} from 'antd';
import '../../style/save-equip.css';

class SaveEquipController extends React.Component {
  state = {
    loading: false,
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
          <Form.Item label="重要程度">
            {getFieldDecorator('importance', {
              rules: [{
                required: true, 
                message: '需要选择重要程度呦!' 
              }]
            })(
              <Radio.Group buttonStyle='solid'>
                <Radio.Button className='button-importance-0' value={0}>报废</Radio.Button>
                <Radio.Button className='button-importance-1' value={1}>普通</Radio.Button>
                <Radio.Button className='button-importance-2' value={2}>需要</Radio.Button>
                <Radio.Button className='button-importance-3' value={3}>急需</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator(
              'des',
              {initialValue: ''}
              )(<Input />)}
          </Form.Item>
          <Form.Item label="图片">
            {getFieldDecorator('picUrl', {
              valuePropName: 'fileList',
              getValueFromEvent: this.handleImageChange,
            })(<Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList = { true }
                beforeUpload = { this.beforeUpload }
                customRequest = { this.handleUploadcustomRequest }
              >
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              种草!
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.location.state) {
      // 装备修改
      let equip = objectHelper.deepCopy(this.props.location.state),
          uploadImageArr = equip.picUrl;

      delete equip.id;
      delete equip.uuid;
      delete equip.picUrl;

      // 修改图片显示
      for (let i = 0; i < uploadImageArr.length; i++) {
        uploadImageArr[i] = {
          uid: uploadImageArr[i],
          url: uploadImageArr[i],
          status: 'done'
        }
      }
      equip.picUrl = uploadImageArr;
      
      this.props.form.setFieldsValue({
        ...equip
      });
    } else {
      // 装备增加
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    
    this.setState({
      loading: true
    });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let valuesCopy = objectHelper.deepCopy(values), // 深度复制参数, 直接操作values会影响显示
            uploadImageArr = valuesCopy.picUrl || [];

        // 对图片的url替换掉整个文件
        for (let i = 0; i < uploadImageArr.length; i++) {
          // 判断是否是修改
          if (uploadImageArr[i].originFileObj) {
            // 增加时抽取图片原来的url
            uploadImageArr[i] = uploadImageArr[i].originFileObj.url;
          } else {
            // 修改时使用原来的url
            uploadImageArr[i] = uploadImageArr[i].url;
          }
        }

        if (this.props.location.state && this.props.location.state.id) {
          valuesCopy.id = this.props.location.state.id;
          valuesCopy.uuid = this.props.location.state.uuid;
        }
        
        // 提交表单
        launchRequest(APIS.EQUIP_SAVE, valuesCopy)
        .then(() => {
          this.setState({
            loading: false
            },
            () => {this.props.history.push(`/${BCG_ROOT_NAME}/${EQUIP.routes.SAVE_RESULT.path}`)}
          );
        });
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

    uploadProjectImageToQiniu(info.file)
    .then(
      res => {
        info.file.url = `${res.imageDomin}/${res.key}`; // 设置图片的连接
        message.success('上传成功');  // 显示提示UI
        info.onSuccess();
      }
    )
    .catch(
      err => {
        message.error('上传失败');
        info.onError();
      }
    )

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  }

  handleImageChange = info => {
    return info.fileList;
  }
}
export default Form.create({ name: 'AddEquipController' })(SaveEquipController);