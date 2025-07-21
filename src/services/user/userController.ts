// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/user/create */
export async function save(body: API.UserRequestDTO, options?: { [key: string]: any }) {
  return request<API.ApiResponseUserResponseDTO>('/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/user/get-current-user-login */
export async function getCurrentUserLogin(options?: { [key: string]: any }) {
  return request<API.ApiResponseUserResponseDTO>('/api/user/get-current-user-login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/user/get-user-by-id/${param0} */
export async function getUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResponseUserResponseDTO>(`/api/user/get-user-by-id/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/user/get-user-by-username/${param0} */
export async function getUserByUsername(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByUsernameParams,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<API.ApiResponseUserResponseDTO>(`/api/user/get-user-by-username/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/user/get-users-by-ids */
export async function getUsersByIds(body: string[], options?: { [key: string]: any }) {
  return request<API.ApiResponseListUserResponseDTO>('/api/user/get-users-by-ids', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/user/search-users */
export async function getUsers(body: API.SearchUserRequestDto, options?: { [key: string]: any }) {
  return request<API.ApiResponseCustomPageScrollUserResponseDTO>('/api/user/search-users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/user/update */
export async function update(body: API.UserRequestDTO, options?: { [key: string]: any }) {
  return request<API.ApiResponseUserResponseDTO>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
