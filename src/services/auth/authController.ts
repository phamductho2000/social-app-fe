// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/auth/login */
export async function login(body: API.UserLoginRequestDto, options?: { [key: string]: any }) {
  return request<API.ApiResponseUserLoginResponseDto>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/auth/refreshToken */
export async function refreshToken(
  body: API.RefreshTokenRequestDto,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseRefreshTokenResponseDto>('/api/auth/refreshToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/auth/register */
export async function register(body: API.UserRegisterReqDTO, options?: { [key: string]: any }) {
  return request<API.ApiResponseUserResponseDTO>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
