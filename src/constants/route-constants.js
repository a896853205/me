import SaveEquipController from '../page/equip/save-equip-controller';
import SaveResultController from '../page/equip/save-result-controller';
import NeedEquipController from '../page/equip/need-equip-controller';
import OldEquipController from '../page/equip/old-equip-controller';

export const BCG_ROOT_NAME = 'background';

export const EQUIP = {
  routes: {
    LIST: { path: 'equip-list', name: '目前需求装备', component: NeedEquipController, menu: true }, // 装备需求
    SAVE: { path: 'equip-save', name: '保存需求装备', component: SaveEquipController, menu: true }, // 保存装备
    OLD_LIST: { path: 'equip-old', name: '过气装备', component: OldEquipController, menu: true }, // 过气装备
    SAVE_RESULT: { path: 'equip-save-result', name: '保存结果', component: SaveResultController, menu: false } // 保存装备结果
  }
}