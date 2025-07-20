import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Typography, Button, MenuProps } from 'antd';
import { 
  UploadOutlined, 
  HistoryOutlined, 
  UserOutlined, 
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      key: '/dashboard/upload',
      icon: <UploadOutlined />,
      label: 'Upload Meeting',
    },
    {
      key: '/dashboard/history',
      icon: <HistoryOutlined />,
      label: 'Meeting History',
    },
    {
      key: '/dashboard/profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/dashboard/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/dashboard/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-white shadow-sm"
        width={240}
      >
        <div className="flex items-center justify-center py-6 px-4 border-b border-gray-100">
          <Space>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BulbOutlined className="text-white text-lg" />
            </div>
            {!collapsed && (
              <Text strong className="text-lg text-gray-800">
                Insights AI
              </Text>
            )}
          </Space>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none mt-4"
        />
      </Sider>

      <Layout className="bg-gray-50">
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600"
          />
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <Avatar src={user?.avatar} icon={<UserOutlined />} />
              <div className="hidden sm:block">
                <Text strong className="block text-sm">
                  {user?.name}
                </Text>
                <Text type="secondary" className="text-xs">
                  {user?.email}
                </Text>
              </div>
            </Space>
          </Dropdown>
        </Header>

        <Content className="p-6">
          <div className="bg-white rounded-lg shadow-sm min-h-full p-6">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;