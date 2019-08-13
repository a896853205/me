import * as DominConfigs from '../constants/domin-constants';
import * as APIs from '../constants/api-constants';
import moment from 'moment';
import { message } from 'antd';

// 请求包装
export async function launchRequest(
  url,
  params = {},
  requestType = DominConfigs.REQUEST_TYPE.POST,
  ignoreParam = false
) {
  // headers
  const t = moment().format('Unix Timestamp');
  const os = 'opt';

  let headers = new Headers({
    Accept: '*/*',
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
    t,
    os,
  })

  const fetchParams = {
    method: requestType,
    headers
  };

  // 根据不同的请求类型 拼装请求参数
  if (requestType === DominConfigs.REQUEST_TYPE.POST) {
    fetchParams.body = JSON.stringify(params);
  } else if (requestType === DominConfigs.REQUEST_TYPE.GET) {
    if (!ignoreParam) {
      const allKey = Object.keys(params);
      if (allKey && allKey.length > 0) {
        if (url.indexOf('?') === -1) {
          url = `${url}?`;
        } else {
          if (url.indexOf('=') !== -1) {
            url = url + '&';
          }
        }

        let query = '';
        for (let i = 0; i < allKey.length; i += 1) {
          query = `${query + allKey[i]}=${params[allKey[i]]}`;
          if (i !== allKey.length - 1) {
            query = `${query}&`;
          }
        }

        url = url + query;
      }
    }
  } else if (requestType === DominConfigs.REQUEST_TYPE.PUT) {
    fetchParams.body = JSON.stringify(params);
  }

  // 进行请求
  return await _fetch(url, params, requestType, fetchParams);
}

/**
 * 上传项目作品照片到七牛
 *
 * result: {
 *      url: 照片展示url
 *      key: 上传用key
 * }
 *
 * @param imagePath 照片路径
 * @param success
 * @param failed
 * @returns {function(*)}
 */
export function uploadProjectImageToQiniu(
  image,
) {
  return new Promise(async (resolve, reject) => {
    const formdata = new FormData();
    let fetchParams = {},
        responseData = {}
  
    // 获取上传token
    let tokenResponse = await launchRequest(
      APIs.GetUploadToken
    );
  
    // formdata.append('key', tokenResponse.result.key);
    formdata.append('token', tokenResponse);
    formdata.append('file', image);
  
    fetchParams = {
      method: DominConfigs.REQUEST_TYPE.POST,
      body: formdata,
    };
  
    responseData = await _fetch(
      APIs.UPLOAD_TO_QiNiu,
      {},
      DominConfigs.REQUEST_TYPE.POST,
      fetchParams
    );
  
    if (responseData) {
      resolve(responseData);
    } else {
      reject();
    }
  })
}

async function _fetch (
  url,
  params = {},
  requestType,
  fetchParams = {},
) {
  console.log(
    `-----------------\n发起${requestType}请求\n` +
    `* url: ${url}\n` +
    `* params:`
  );
  console.dir(params);

  const response = await fetch(url, fetchParams);
  const responseData = await response.json();

  console.log('请求返回: status:' + responseData.succ + '\n');
  console.dir(responseData);
  console.log('-----------------');

  if (
    responseData.succ ===
    DominConfigs.RESPONSE_CODE.success
  ) {
    // 请求成功 succ: 200 && status: 1
    if (responseData.status &&
      responseData.status === DominConfigs.SERVICE_CODE.Successed) 
      
      return responseData.data;

    else {
      message.error(responseData.msg);

      return null;
    }
  }
}