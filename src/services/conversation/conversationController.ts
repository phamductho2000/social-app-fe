// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/conversation/create */
export async function createConversation(
  body: API.ConversationReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseConversationResDTO>('/api/conversation/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/conversation/get-conversations */
export async function getConversation(body: API.FilterRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponsePageConversationResDTO>('/api/conversation/get-conversations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/conversation/get-detail-conversation/${param0} */
export async function getDetailConversation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailConversationParams,
  options?: { [key: string]: any },
) {
  const { conversationId: param0, ...queryParams } = params;
  return request<API.ApiResponseConversationResDTO>(
    `/api/conversation/get-detail-conversation/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/conversation/save */
export async function saveConversation(
  body: API.ConversationReqDTO,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseConversationResDTO>('/api/conversation/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/conversation/search-user-conversation */
export async function searchUserConversation(
  body: API.SearchConversationRequestDto,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseCustomPageScrollUserConversationResDTO>(
    '/api/conversation/search-user-conversation',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
