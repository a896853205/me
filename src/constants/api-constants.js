import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * optequip
 ***************************/
export const EQUIP_QUERY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_EQUIP}/queryEquip` // 查询所有装备
export const EQUIP_INSERT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_EQUIP}/insertEquip` // 增加一个装备

// 获取上传Token
export const GetUploadToken = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_UPLOAD}/getuploadtoken`;
