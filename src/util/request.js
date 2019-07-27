import * as DominConfigs from '../constants/domin-constants';
import moment from 'moment';
import { message } from 'antd';
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