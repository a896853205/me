import React from 'react';
// 请求文件
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';
// UI
import {
  Table,
  Divider,
  Modal,
  message
} from 'antd';
import '../../style/need-equip.css';

const { confirm } = Modal;
class NeedEquipController extends React.Component {
  state = {
    equipeList: []
  }
  render() {
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        width: '60%',
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '40%',
        render: (text, record) => (
          <span>
            <span className='span-link span-blue'>修改</span>
            <Divider type="vertical" />
            <span className='span-link span-red' onClick={ () => { this.deleteConfirm(record)} }>删除</span>
            <Divider type='vertical'  />
            <span className='span-link span-yellow'>拔草</span>
          </span>
        )
      }
      // {
      //   title: '金币数',
      //   dataIndex: 'money',
      // },
      // {
      //   title: '备注',
      //   dataIndex: 'des',
      // },
      // {
      //   title: '省略图',
      //   dataIndex: 'picUrl'
      // },
    ];
    return (
      <div className="equip">
        需求装备订单
        <Table
          columns={ columns }
          dataSource={ this.state.equipeList } 
          size="small"
          rowKey={ record => record.id } />
      </div>
    );
  }
  componentDidMount () {
    this.selectAllEquip();
  }
  selectAllEquip () {
    // 查询所有装备
    launchRequest(APIS.EQUIP_QUERY)
    .then(data => {
      this.setState({equipeList: data});
    });
  }
  deleteConfirm (equip) {
    // 适配onOk函数
    let _this = this;
    
    confirm({
      title: '你确定要删除哈?',
      content: '你可想好了,一步错步步错!',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        return new Promise((resolve, reject) => {
          launchRequest(APIS.EQUIP_DELETE, {uuid: equip.uuid})
          .then(() => {
            _this.selectAllEquip();
            message.success('删除成功了!');
            resolve();
          })
          .catch(() => {
            message.error('删除失败了!')
            reject();
          })
        })
      },
      onCancel () {},
    });
  }
}
export default NeedEquipController;