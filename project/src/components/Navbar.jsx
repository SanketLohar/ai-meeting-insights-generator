import { useState } from 'react';
import { Layout, Menu, Button, Drawer, Avatar, Dropdown } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined, BulbOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
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
    <Header style={{ 
      background: '#fff', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BulbOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '8px' }} />
          <Link to="/" style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#1890ff',
            textDecoration: 'none'
          }}>
            AI Meeting Insights
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ 
            border: 'none',
            background: 'transparent',
            display: 'none'
          }}
          className="desktop-menu"
        />
        
        {/* Auth Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthenticated() ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'background-color 0.2s'
              }}>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />} 
                  style={{ marginRight: '8px' }}
                />
                <span style={{ 
                  fontSize: '14px',
                  color: '#333',
                  display: 'none'
                }} className="desktop-username">
                  {user?.name || 'User'}
                </span>
              </div>
            </Dropdown>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }} className="desktop-auth-buttons">
              <Link to="/login">
                <Button type="primary" size="small">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="small">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="mobile-menu-button"
          style={{ display: 'none' }}
        />
        
        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={onClose}
          open={drawerVisible}
          width={250}
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ border: 'none', marginBottom: '24px' }}
            onClick={onClose}
          />
          
          {/* Mobile Auth Section */}
          <div style={{ padding: '0 24px' }}>
            {isAuthenticated() ? (
              <div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '16px',
                  padding: '12px',
                  background: '#f5f5f5',
                  borderRadius: '8px'
                }}>
                  <Avatar 
                    icon={<UserOutlined />} 
                    style={{ marginRight: '12px' }}
                  />
                  <span style={{ fontWeight: '500' }}>
                    {user?.name || 'User'}
                  </span>
                </div>
                <Button 
                  block 
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/login" onClick={onClose}>
                  <Button type="primary" block>
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={onClose}>
                  <Button block>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Drawer>
      </div>
      
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex !important;
          }
          .desktop-username {
            display: inline !important;
          }
          .desktop-auth-buttons {
            display: flex !important;
          }
        }
        
        @media (max-width: 767px) {
          .mobile-menu-button {
            display: block !important;
          }
          .desktop-username {
            display: none !important;
          }
          .desktop-auth-buttons {
            display: none !important;
          }
        }
      `}</style>
    </Header>
  );
};

export default Navbar;