import {PageLoading, Settings as LayoutSettings} from '@ant-design/pro-components';
import defaultSettings from '../config/defaultSettings';
import {requestConfig} from './requestConfig';
import React from "react";
import {AvatarDropdown, AvatarName, Question, SelectLang} from "@/components";
import {RunTimeLayoutConfig} from "@@/plugin-layout/types";
import {RequestConfig} from "@@/plugin-request/request";
import {Notification} from "@/components/RightContent";
import WebSocketProvider from "@/websocket/WebSocketProvider";
import {getCurrentUserLogin} from "@/services/user/userController";
import {history} from '@umijs/max';

const paths = ['/login', '/register'];

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserResponseDTO;
  loading?: boolean;
}> {
  if (paths.includes(history.location.pathname)) {
    return {
      settings: defaultSettings as Partial<LayoutSettings>,
      loading: false
    };
  }
  const currentUser = await getCurrentUserLogin();
  return {
    currentUser: currentUser?.data,
    settings: defaultSettings as Partial<LayoutSettings>,
    loading: false
  };
}

export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    actionsRender: () => [<Notification key="noti"/>, <Question key="doc"/>, <SelectLang key="SelectLang"/>],
    avatarProps: {
      src: '',
      title: <AvatarName/>,
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu={true}>{avatarChildren}</AvatarDropdown>;
      },
    },
    menuHeaderRender: undefined,
    collapsed: true,
    childrenRender: (children) => {
      if (initialState?.loading) return <PageLoading/>;
      return (
        <>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
          {/*{isDev && (*/}
          {/*  <SettingDrawer*/}
          {/*    disableUrlParams*/}
          {/*    enableDarkTheme*/}
          {/*    settings={initialState?.settings}*/}
          {/*    onSettingChange={(settings) => {*/}
          {/*      setInitialState((preInitialState) => ({*/}
          {/*        ...preInitialState,*/}
          {/*        settings,*/}
          {/*      }));*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
        </>
      );
    },
    ...initialState?.settings,
  };
};


export const request: RequestConfig = {
  ...requestConfig,
};
