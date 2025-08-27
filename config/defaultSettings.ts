import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Social',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  menu: {
    collapsedShowTitle: false
  },
  collapsedButtonRender: false,
  token: {
    bgLayout: '#E9EBEE',
    pageContainer: {
      paddingBlockPageContainerContent: 0,
      paddingInlinePageContainerContent: 0,
      colorBgPageContainerFixed: '#E9EBEE',
      colorBgPageContainer: '#E9EBEE',
    },
  },
};

export default Settings;
