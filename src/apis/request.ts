const defaultParams = {
}

function request(params: RequestOptions):Promise<any> {
  return new Promise((resolve, reject) => {
    params.success = (res) => {
      resolve(res);
    }
    params.fail = (err) => {
      reject(err);
    }
    uni.request(params);
  });
  
}
function request_post(url: string, data: object, params?: RequestOptions):Promise<any> {
  const p = {
    url,
    data,
    method: 'POST'
  };
  return request(Object.assign(defaultParams, p, params));
}
function request_get(url: string, data: object, params?: RequestOptions):Promise<any> {
  const p = {
    url,
    data,
    method: 'GET'
  };
  return request(Object.assign(defaultParams, p, params));
}
function request_put(url: string, data: object, params?: RequestOptions):Promise<any> {
  const p = {
    url,
    data,
    method: 'PUT'
  };
  return request(Object.assign(defaultParams, p, params));
}
function request_delete(url: string, data: object, params?: RequestOptions):Promise<any> {
  const p = {
    url,
    data,
    method: 'DELETE'
  };
  return request(Object.assign(defaultParams, p, params));
}
