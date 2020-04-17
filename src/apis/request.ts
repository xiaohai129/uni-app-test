const baseUrl = 'http://127.0.0.1:7001'
const defaultParams = {
  timeout: 5000
}

function request(params: RequestOptions):Promise<any> {
  return new Promise((resolve, reject) => {
    params.success = (res) => {
      if (res.statusCode != 200) {
        reject(res.data);
      } else {
        resolve(res.data);
      }
    }
    params.fail = (err: any) => {
      console.log(err);
      let data = {
        message: err.errMsg,
        status: err.statusCode,
        data: null
      }
      reject(data);
    }
    params.url = baseUrl + params.url;
    return uni.request(params);
  });
  
}
export function request_post(url: string, data: object, params?: RequestOptions):Promise<any> {
  const p = {
    url,
    data,
    method: 'POST'
  };
  return request(Object.assign(defaultParams, p, params));
}
export function request_get(url: string, data: object, params?: RequestOptions):Promise<any> {
  const p = {
    url,
    data,
    method: 'GET'
  };
  return request(Object.assign(defaultParams, p, params));
}
export function request_put(url: string, data: object, params?: RequestOptions):Promise<any> {
  const p = {
    url,
    data,
    method: 'PUT'
  };
  return request(Object.assign(defaultParams, p, params));
}
export function request_delete(url: string, data: object, params?: RequestOptions):Promise<any> {
  const p = {
    url,
    data,
    method: 'DELETE'
  };
  return request(Object.assign(defaultParams, p, params));
}

