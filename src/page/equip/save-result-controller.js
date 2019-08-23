import React from 'react';
// UI
import { Result, Button } from 'antd';
// 路由
import { BCG_ROOT_NAME, EQUIP } from '../../constants/route-constants';
import { Link } from 'react-router-dom';
class SaveResultController extends React.Component {
  render() {
    return (
      <Result
        status="success"
        title="装备保存成功了!"
        subTitle="努力赚钱呦才能把这些草拔干净!"
        extra={[
          <Link
            to={{
              pathname: `/${BCG_ROOT_NAME}/${EQUIP.routes.LIST.path}`,
            }}
            key="need">
            <Button type="primary">
              看看现在有啥草
            </Button>
          </Link>  
          ,
          <Link
            to={{
              pathname: `/${BCG_ROOT_NAME}/${EQUIP.routes.SAVE.path}`,
            }}
            key="more">
            <Button>再种一发</Button> 
          </Link>
          ,
        ]}
      />
    );
  }
}
export default SaveResultController;