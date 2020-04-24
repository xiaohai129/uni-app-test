import * as http from './request';

export function getRecordList(data: any) {
  return http.post('/record/list', data);
}
export function addRecord(data: any) {
  return http.post('/record', data);
}
export function getRecordStatis(data: any) {
  return http.post('/record/statis', data);
}