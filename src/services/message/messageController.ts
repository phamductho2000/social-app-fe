// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/message/mark-read-messages */
export async function markReadMessages(body: string[], options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>('/api/message/mark-read-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/message/save */
export async function saveMessage(body: API.MessageReqDTO, options?: { [key: string]: any }) {
  return request<API.ApiResponseMessageResDTO>('/api/message/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/message/search-message */
export async function searchMessage(
  body: API.SearchMessageRequestDto,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseCustomPageScrollMessageResDTO>('/api/message/search-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
