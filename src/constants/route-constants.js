import AddEquipController from '../page/equip/add-equip-controller';
import NeedEquipController from '../page/equip/need-equip-controller';
import OldEquipController from '../page/equip/old-equip-controller';


export const BCG_ROOT_Name = 'background';

/**
 * 一级页
 */
export const EQUIP = {
  routes: [
    { path: 'equip-list', name: '目前需求装备', component: NeedEquipController }, // 装备需求
    { path: 'equip-add', name: '添加需求装备', component: AddEquipController }, // 增加装备
    { path: 'equip-old', name: '过气装备', component: OldEquipController } // 过气装备
  ]
}
