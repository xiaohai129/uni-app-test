import {request_post} from './request';

export function getRecordList(data: any) {
  return request_post('/record/list12', data);
}