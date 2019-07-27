import React from 'react';
// 请求文件
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';
// UI组件
import { Table } from 'antd';
// util文件
import { moneyHelper } from '../../util/money-helper';
class NeedEquipController extends React.Component {
  state = {
    equipeList: []
  }
  render() {
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '金币数',
        dataIndex: 'money',
        render: text => moneyHelper.parseMoney(text)
      },
      {
        title: '备注',
        dataIndex: 'desc',
      },
      // {
      //   title: '省略图',
      //   dataIndex: 'picUrl'
      // },
    ];
    return (
      <div className="equip">
        需求装备订单
        <Table columns={columns} dataSource={this.state.equipeList} size="small" rowKey={record => record.id } />
      </div>
    );
  }
  componentDidMount() {
    // 在这里调用api查询
    launchRequest(APIS.EQUIP_QUERY)
      .then(data => {
        this.setState({equipeList: data});
      });
  }
}
export default NeedEquipController;