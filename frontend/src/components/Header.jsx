"use client"

import { useState } from "react"
import { Layout, Menu, Drawer, Button } from "antd"
import { Link, useLocation } from "react-router-dom"
import { HomeOutlined, BulbOutlined, MenuOutlined } from "@ant-design/icons"

const { Header: AntHeader } = Layout

const Header = () => {
  const location = useLocation()
  const [drawerVisible, setDrawerVisible] = useState(false)

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/insights",
      icon: <BulbOutlined />,
      label: <Link to="/insights">Insights</Link>,
    },
  ]

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }

  return (
    <AntHeader
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          color: "#1890ff",
          fontSize: "20px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <BulbOutlined />
        AI Meeting Insights
      </div>

      {/* Desktop Menu */}
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          border: "none",
          background: "transparent",
          display: "none",
        }}
        className="desktop-menu"
      />

      {/* Mobile Menu Button */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        style={{ display: "none" }}
        className="mobile-menu-button"
      />

      {/* Mobile Drawer */}
      <Drawer title="Navigation" placement="right" onClose={onClose} open={drawerVisible} width={250}>
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={onClose}
          style={{ border: "none" }}
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
    </AntHeader>
  )
}

export default Header
