// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/conversation/user-conversation/search */
export async function search(
  body: API.SearchConversationRequestDto,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseCustomPageScrollUserConversationResDTO>(
    '/api/conversation/user-conversation/search',
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
