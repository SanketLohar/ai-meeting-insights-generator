"use client"

import { useState } from "react"
import { Typography, Form, Input, Button, Card, Alert, Spin, Space, Divider, Row, Col } from "antd"
import { SendOutlined, FileTextOutlined, BulbOutlined, LoadingOutlined } from "@ant-design/icons"
import axios from "axios"

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

const Insights = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (values) => {
    setLoading(true)
    setError("")
    setInsights("")

    try {
      const response = await axios.post("http://localhost:8080/api/gemini/generate", values.transcript, {
        headers: {
          "Content-Type": "text/plain",
        },
      })

      setInsights(response.data)
    } catch (err) {
      console.error("Error generating insights:", err)
      setError(
        err.response?.data?.message ||
          "Failed to generate insights. Please check if the backend server is running on http://localhost:8080",
      )
    } finally {
      setLoading(false)
    }
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 16px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <Title
          level={1}
          style={{
            marginBottom: "16px",
            color: "#1890ff",
          }}
        >
          <BulbOutlined style={{ marginRight: "12px" }} />
          Meeting Insights Generator
        </Title>
        <Paragraph
          style={{
            fontSize: "16px",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Paste your meeting transcript below and our AI will generate comprehensive insights, summaries, and action
          items for you.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {/* Input Form */}
        <Col xs={24} lg={insights ? 12 : 24}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>Meeting Transcript</span>
              </Space>
            }
            style={{ height: "fit-content" }}
            headStyle={{
              background: "#fafafa",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginBottom: 0 }}>
              <Form.Item
                name="transcript"
                rules={[
                  {
                    required: true,
                    message: "Please enter the meeting transcript",
                  },
                  {
                    min: 50,
                    message: "Transcript should be at least 50 characters long",
                  },
                ]}
              >
                <TextArea
                  placeholder="Paste your meeting transcript here...

Example:
John: Good morning everyone, let's start with the quarterly review.
Sarah: The sales numbers look promising this quarter...
Mike: I think we should focus on the new product launch..."
                  rows={12}
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={loading ? antIcon : <SendOutlined />}
                  size="large"
                  block
                  style={{
                    height: "48px",
                    fontSize: "16px",
                  }}
                >
                  {loading ? "Generating Insights..." : "Generate Insights"}
                </Button>
              </Form.Item>
            </Form>

            {/* Tips */}
            <Divider />
            <div>
              <Text strong style={{ color: "#1890ff" }}>
                💡 Tips for better results:
              </Text>
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>Include speaker names and dialogue</li>
                <li>Provide complete sentences and context</li>
                <li>Longer transcripts yield more detailed insights</li>
              </ul>
            </div>
          </Card>
        </Col>

        {/* Results */}
        {(insights || error || loading) && (
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <BulbOutlined />
                  <span>AI-Generated Insights</span>
                </Space>
              }
              style={{ height: "fit-content" }}
              headStyle={{
                background: "#fafafa",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {loading && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 0",
                    color: "#666",
                  }}
                >
                  <Spin indicator={antIcon} />
                  <div style={{ marginTop: "16px" }}>
                    <Text>Analyzing your meeting transcript...</Text>
                  </div>
                </div>
              )}

              {error && (
                <Alert message="Error" description={error} type="error" showIcon style={{ marginBottom: "16px" }} />
              )}

              {insights && !loading && (
                <div>
                  <Alert
                    message="Insights Generated Successfully!"
                    type="success"
                    showIcon
                    style={{ marginBottom: "24px" }}
                  />

                  <Card
                    size="small"
                    style={{
                      background: "#fafafa",
                      border: "1px solid #e8e8e8",
                    }}
                  >
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        fontFamily: "inherit",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        margin: 0,
                        color: "#333",
                      }}
                    >
                      {insights}
                    </pre>
                  </Card>

                  <div style={{ marginTop: "16px", textAlign: "center" }}>
                    <Button
                      onClick={() => {
                        form.resetFields()
                        setInsights("")
                        setError("")
                      }}
                    >
                      Analyze Another Transcript
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Insights
