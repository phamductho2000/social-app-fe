import type {RequestOptions} from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';
import {message, notification} from 'antd';
import {refreshToken} from "@/services/auth/authController";
import { history } from '@umijs/max';

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

const handleRefreshToken = () => {
  const token = localStorage.getItem('refresh_token');

  if (token) {
    refreshToken({refreshToken: token}).then(res => {
      if (res.code === 'SUCCESS') {
        localStorage.setItem('access_token', res?.data?.accessToken as string);
        localStorage.setItem('refresh_token', res?.data?.refreshToken as string);
        history.replace(history.location.pathname);
      } else {
        history.push('/login');
        message.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
      }
    })
  }
}

export const requestConfig: RequestConfig = {
  errorConfig: {
    errorThrower: (res) => {
      const {success, data, errorCode, errorMessage, showType} =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = {errorCode, errorMessage, showType, data};
        throw error; // 抛出自制的错误
      }
    },
    errorHandler: (error: any, opts: any) => {
      console.log('error', error);
      console.log('opts', opts);
      if (opts?.skipErrorHandler) throw error;
      if (error.response) {
        if (error.response.status === 401) {
          handleRefreshToken();
        }
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        message.error('None response! Please retry.');
      } else {
        message.error('Request error, please retry.');
      }
    },
  },

  requestInterceptors: [
    (config: RequestOptions) => {
      config.headers = {Authorization: `Bearer ${localStorage.getItem('access_token')}`}
      return {...config};
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const {data} = response as unknown as ResponseStructure;
      if (data?.success === false) {
        message.error('请求失败！');
      }
      return response;
    },
  ],
};
