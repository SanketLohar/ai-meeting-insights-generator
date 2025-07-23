import { Routes, Route } from "react-router-dom"
import { Layout, ConfigProvider } from "antd"
import Header from "./components/Header"
import Home from "./pages/Home"
import Insights from "./pages/Insights"

const { Content, Footer } = Layout

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Content style={{ padding: "0 24px", marginTop: 64 }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              minHeight: "calc(100vh - 128px)",
              borderRadius: 8,
              margin: "24px 0",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center", background: "#f0f2f5" }}>
          AI Meeting Insights Generator ©2024 Created with React & Ant Design
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
