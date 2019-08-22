import React from 'react';
// 自定义组件
import EquipTable from './components/equip-table-controller';

class NeedEquipController extends React.Component {
  render() {
    return (
      <div className="equip">
        需求装备订单
        <EquipTable bImportance={true} />
      </div>
    );
  }
}

export default NeedEquipController;