import React from 'react';
// 路由
import { BCG_ROOT_NAME } from '../constants/route-constants';
// 请求文件
import { launchRequest } from '../util/request';
import * as APIS from '../constants/api-constants';
// UI组件
import { 
  Button,
  Input,
  Radio,
  Form
} from 'antd';
class LoginController extends React.Component {
  state = {
    loading: false,
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Radio.Group>
            <Radio value={1}>Eric</Radio>
            <Radio value={2}>姜的英文名</Radio>
          </Radio.Group>
          <Input />这里弄个六位密码
          <Button 
            type="primary" 
            loading={this.state.loading} 
            htmlType="submit">
          登录</Button>
        </Form>
      </div>
    );
  }

  /**
   * 登录提交按钮
   */
  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      loading: true
    });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 登录
        launchRequest(APIS.USER_LOGIN, values)
        .then(() => {
          // 这里将返回回来的token放在全局变量里----

          this.setState({
            loading: false
            },
            () => {this.props.history.push(`/${BCG_ROOT_NAME}`)}
          );
        });
      }
    });
  }
}
export default LoginController;