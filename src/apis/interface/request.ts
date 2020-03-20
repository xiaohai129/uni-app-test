interface RequestParams<T>{
  url?: string;
  data?: T;
  header?: any;
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  dataType?: string;
  responseType?: string;
  success?: (result: RequestSuccessCallbackResult) => void;
  fail?: (result: GeneralCallbackResult) => void;
  complete?: (result: GeneralCallbackResult) => void;
}
export default RequestParams;
