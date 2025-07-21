// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/storage/upload */
export async function uploadBinaryFile(body: {}, options?: { [key: string]: any }) {
  return request<Record>('/api/storage/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
