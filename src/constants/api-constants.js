import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * optequip
 ***************************/
export const EQUIP_QUERY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_EQUIP}/queryEquip` // 查询所有装备
export const EQUIP_SAVE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_EQUIP}/saveEquip` // 保存一个装备
export const EQUIP_DELETE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_EQUIP}/deleteEquip` // 删除一个装备
export const EQUIP_BUY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_EQUIP}/buyEquip` // 购买一个装备

/**
 * optuser
 ***************************/
export const USER_LOGIN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/login`;  // 登录

// 获取上传Token
export const GetUploadToken = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_UPLOAD}/getuploadtoken`;
