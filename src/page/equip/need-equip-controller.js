import React from 'react';
// 请求文件
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';
// UI组件
import { message } from 'antd';
class NeedEquipController extends React.Component {
  render() {
    return (<div>需求装备订单</div>);
  }
  componentDidMount() {
    // 在这里调用api查询
    launchRequest(APIS.EQUIP_QUERY)
      .then(res => {
        if (res.msg) message.error(res.msg);
        else console.log(res);
      });
  }
}
export default NeedEquipController;