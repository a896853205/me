import React from 'react';
// 自定义组件
import EquipTable from './components/equip-table-controller';

class OldEquipController extends React.Component {
  render() {
    return (
      <div>
        过气装备订单
        <EquipTable bImportance={false} />
      </div>
    );
  }
}

export default OldEquipController;