import UserInterface from '@/apis/interface/user';

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

export const base_getTest = (data: UserInterface) => {
  return request_post('/', data);
}