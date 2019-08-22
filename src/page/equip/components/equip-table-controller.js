import React from 'react';
// 路由
import { BCG_ROOT_NAME, EQUIP } from '../../../constants/route-constants';
import { Link } from 'react-router-dom';
// UI
import {
  Table,
  Divider,
  Modal,
  message
} from 'antd';
import '../../../style/equip-table.css';
// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
// redux
import { connect } from 'react-redux';
import { actions as equipActions } from '../../../redux/equip-model';

const { confirm } = Modal;

class EquipTableController extends React.Component {
  render() {
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        width: '60%',
        render: (text, record) => {
          let divColor = `div-importance-${record.importance}`;
          return (<div className={`${divColor} div-importance`} >{text}</div>)
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '40%',
        render: (text, record) => {
          if (this.props.bImportance) {
            return (
              <span>
                <Link 
                  to={{
                    pathname: `/${BCG_ROOT_NAME}/${EQUIP.routes.SAVE.path}`,
                    state: record
                  }}
                  className='span-link span-blue'
                >修改</Link>
                <Divider type="vertical" />
                <span 
                  className='span-link span-red'
                  onClick={ () => { this.deleteConfirm(record)} }>删除</span>
                <Divider type='vertical'  />
                <span
                  className='span-link span-yellow'
                  onClick={ () => { this.changeImportanceConfirm(record, 0)} }>拔草</span>
              </span>
            )
          } else {
            return (
              <span>
                <span className='span-link span-red' onClick={ () => { this.deleteConfirm(record)} }>删除</span>
                <Divider type='vertical'  />
                <span 
                  className='span-link span-yellow'
                  onClick={ () => { this.changeImportanceConfirm(record, 1)} }>插回去!</span>
              </span>
            )
          }
        }
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
        <Table
          columns={ columns }
          dataSource={ this.props.equipList } 
          size="small"
          rowKey={ record => record.id } />
      </div>
    );
  }

  componentDidMount () {
    this.selectAllEquip();
  }

  selectAllEquip () {
    // 查询所有需求装备
    launchRequest(
      APIS.EQUIP_QUERY,
      { bImportance: this.props.bImportance }
    )
    .then(data => {
      this.props.recordEquipList(data);
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

  changeImportanceConfirm (equip, importance) {
    // 适配onOk函数
    let _this = this;
    
    confirm({
      title: '你确定吗?',
      content: '认真一点呦!',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        return new Promise((resolve, reject) => {
          launchRequest(APIS.EQUIP_BUY, { uuid: equip.uuid, importance })
          .then(() => {
            _this.selectAllEquip();
            message.success('操作成功了!');
            resolve();
          })
          .catch(() => {
            message.error('操作失败了!')
            reject();
          })
        })
      },
      onCancel () {},
    });
  }
}

const mapStateToProps = store => {
  const equipStore = store['equipStore'],
        { equipList } = equipStore;

  return {
    equipList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    recordEquipList: params => {
      dispatch(equipActions.recordEquipList(params));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipTableController);