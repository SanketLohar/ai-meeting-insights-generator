import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  BulbOutlined, 
  InfoCircleOutlined, 
  ContactsOutlined,
  MenuOutlined
} from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/generate',
      icon: <BulbOutlined />,
      label: <Link to="/generate">Generate</Link>,
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
    {
      key: '/contact',
      icon: <ContactsOutlined />,
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '0 24px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        flex: 1 
      }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none' 
        }}>
          <BulbOutlined style={{ 
            fontSize: '24px', 
            color: '#1890ff', 
            marginRight: '8px' 
          }} />
          <span style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#1890ff' 
          }}>
            AI Meeting Insights
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ 
          border: 'none',
          backgroundColor: 'transparent',
          display: 'none'
        }}
        className="desktop-menu"
      />

      {/* Mobile Menu Button */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        style={{ display: 'none' }}
        className="mobile-menu-button"
      />

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={visible}
        width={250}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onClose}
          style={{ border: 'none' }}
        />
      </Drawer>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex !important;
          }
        }
        
        @media (max-width: 767px) {
          .mobile-menu-button {
            display: block !important;
          }
        }
      `}</style>
    </Header>
  );
};

export default Navbar;