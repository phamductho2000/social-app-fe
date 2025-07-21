import React, {ReactNode} from 'react';
import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        {/* Thêm logo và menu ở đây */}
        <div className="logo">My App</div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/* Nội dung HeaderInfo, ví dụ tên ứng dụng hoặc profile */}
        </Header>
        <Content style={{ margin: '16px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};


export default BasicLayout;
