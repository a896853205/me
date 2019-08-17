import SaveEquipController from '../page/equip/save-equip-controller';
import NeedEquipController from '../page/equip/need-equip-controller';
import OldEquipController from '../page/equip/old-equip-controller';

export const BCG_ROOT_NAME = 'background';

/**
 * 一级页
 */
export const EQUIP = {
  routes: {
    LIST: { path: 'equip-list', name: '目前需求装备', component: NeedEquipController }, // 装备需求
    SAVE: { path: 'equip-save', name: '保存需求装备', component: SaveEquipController }, // 增加装备
    OLD_LIST: { path: 'equip-old', name: '过气装备', component: OldEquipController } // 过气装备
  }
}
