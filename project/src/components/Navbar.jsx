import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Drawer, Button, Dropdown } from 'antd';
import {
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/generate',
      label: <Link to="/generate">Generate</Link>,
    },
    {
      key: '/about',
      label: <Link to="/about">About</Link>,
    },
    {
      key: '/contact',
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <Header style={headerStyle}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        height: '100%',
      }}>
        <div className="logo" style={{ marginRight: 32 }}>
          <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
            Meeting Insights
          </Link>
        </div>

        <div className="desktop-menu" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ background: 'transparent', borderBottom: 'none' }}
          />

          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }}>
              <Button icon={<UserOutlined />} style={{ marginLeft: '1.5rem' }}>
                {user?.name || 'Account'}
              </Button>
            </Dropdown>
          ) : (
            <>
              <Link to="/login">
                <Button icon={<LoginOutlined />} type="primary" style={{ marginLeft: '1.5rem' }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button style={{ marginLeft: 8 }}>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          style={{ color: 'white', display: 'none' }}
        />
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onClose}
        />
        <div style={{ marginTop: 16 }}>
          {isAuthenticated ? (
            <Button icon={<LogoutOutlined />} danger onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button type="primary" icon={<LoginOutlined />} block style={{ marginBottom: 8 }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button block>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </Header>
  );
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  background: '#001529',
};

export default Navbar;
