"use client"
import { Typography, Button, Card, Row, Col, Space } from "antd"
import { useNavigate } from "react-router-dom"
import { BulbOutlined, RocketOutlined, CheckCircleOutlined, ArrowRightOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <BulbOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
      title: "AI-Powered Analysis",
      description: "Advanced AI technology analyzes your meeting transcripts to extract key insights and summaries.",
    },
    {
      icon: <RocketOutlined style={{ fontSize: "24px", color: "#52c41a" }} />,
      title: "Fast Processing",
      description: "Get comprehensive meeting summaries in seconds, not hours of manual review.",
    },
    {
      icon: <CheckCircleOutlined style={{ fontSize: "24px", color: "#faad14" }} />,
      title: "Actionable Insights",
      description: "Identify key decisions, action items, and important discussion points automatically.",
    },
  ]

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <Title
          level={1}
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "24px",
            background: "linear-gradient(135deg, #1890ff, #722ed1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Transform Your Meeting Transcripts
        </Title>

        <Paragraph
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto 32px",
            lineHeight: "1.6",
          }}
        >
          Leverage the power of AI to automatically generate comprehensive insights, summaries, and action items from
          your meeting transcripts.
        </Paragraph>

        <Space size="large" wrap>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate("/insights")}
            style={{
              height: "48px",
              padding: "0 32px",
              fontSize: "16px",
              borderRadius: "24px",
            }}
          >
            Generate Insights
          </Button>

          <Button
            size="large"
            onClick={() => navigate("/insights")}
            style={{
              height: "48px",
              padding: "0 32px",
              fontSize: "16px",
              borderRadius: "24px",
            }}
          >
            Learn More
          </Button>
        </Space>
      </div>

      {/* Features Section */}
      <Row gutter={[32, 32]} style={{ marginBottom: "64px" }}>
        {features.map((feature, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              hoverable
              style={{
                height: "100%",
                textAlign: "center",
                borderRadius: "12px",
                border: "1px solid #f0f0f0",
              }}
              bodyStyle={{ padding: "32px 24px" }}
            >
              <div style={{ marginBottom: "16px" }}>{feature.icon}</div>
              <Title level={4} style={{ marginBottom: "12px" }}>
                {feature.title}
              </Title>
              <Paragraph style={{ color: "#666", margin: 0 }}>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CTA Section */}
      <Card
        style={{
          background: "linear-gradient(135deg, #f6f9fc, #e8f4fd)",
          border: "1px solid #e6f7ff",
          borderRadius: "16px",
          textAlign: "center",
        }}
        bodyStyle={{ padding: "48px 24px" }}
      >
        <Title level={2} style={{ marginBottom: "16px" }}>
          Ready to Get Started?
        </Title>
        <Paragraph
          style={{
            fontSize: "16px",
            color: "#666",
            marginBottom: "32px",
            maxWidth: "500px",
            margin: "0 auto 32px",
          }}
        >
          Upload your meeting transcript and let our AI generate comprehensive insights in seconds.
        </Paragraph>

        <Button
          type="primary"
          size="large"
          icon={<BulbOutlined />}
          onClick={() => navigate("/insights")}
          style={{
            height: "48px",
            padding: "0 32px",
            fontSize: "16px",
            borderRadius: "24px",
          }}
        >
          Start Analyzing
        </Button>
      </Card>
    </div>
  )
}

export default Home
