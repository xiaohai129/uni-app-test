const baseUrl = 'http://118.25.42.61:7001';
// const baseUrl = 'http://192.168.0.169:7001';
const defaultParams = {
  timeout: 5000
}

function request(params: RequestOptions): Promise<any> {
  const token = uni.getStorageSync('storage_token');
  if (params.header) {
    params.header.token = token
  } else {
    params.header = {
      token
    }
  }
  return new Promise((resolve, reject) => {
    params.success = (res) => {
      if (res.statusCode != 200) {
        reject(res.data);
      } else {
        resolve(res.data);
      }
    }
    params.fail = (err: any) => {
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
export function post(url: string, data: object, params?: RequestOptions): Promise<any> {
  const p = {
    url,
    data,
    method: 'POST'
  };
  return request(Object.assign(defaultParams, p, params));
}
export function get(url: string, data: object, params?: RequestOptions): Promise<any> {
  const p = {
    url,
    data,
    method: 'GET'
  };
  return request(Object.assign(defaultParams, p, params));
}
export function put(url: string, data: object, params?: RequestOptions): Promise<any> {
  const p = {
    url,
    data,
    method: 'PUT'
  };
  return request(Object.assign(defaultParams, p, params));
}
export function del(url: string, data: object, params?: RequestOptions): Promise<any> {
  const p = {
    url,
    data,
    method: 'DELETE'
  };
  return request(Object.assign(defaultParams, p, params));
}

