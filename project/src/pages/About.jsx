import React from 'react';
import { Typography, Card, Row, Col, Divider } from 'antd';
import { 
  InfoCircleOutlined, 
  ApiOutlined, 
  SafetyOutlined, 
  BulbOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <InfoCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={1}>About AI Meeting Insights</Title>
        <Paragraph style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Learn how our tool transforms meeting summaries into actionable insights 
          using cutting-edge AI technology.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <BulbOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            </div>
            <Title level={3}>What We Do</Title>
            <Paragraph>
              AI Meeting Insights Generator is a powerful tool that analyzes your meeting 
              summaries and extracts valuable insights, action items, and key takeaways. 
              Our AI processes natural language text and provides structured, actionable 
              output that helps teams stay organized and productive.
            </Paragraph>
            <Paragraph>
              Whether you're dealing with project meetings, team standups, client calls, 
              or strategic planning sessions, our tool helps you identify what matters most 
              and what needs to be done next.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <ApiOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
            </div>
            <Title level={3}>AI Technology</Title>
            <Paragraph>
              Our backend leverages advanced language models including:
            </Paragraph>
            <ul>
              <li><strong>Google Gemini API</strong> - For natural language understanding and generation</li>
              <li><strong>OpenAI GPT</strong> - Alternative processing engine for comprehensive analysis</li>
              <li><strong>Custom Processing Pipeline</strong> - Optimized for meeting content analysis</li>
            </ul>
            <Paragraph>
              These APIs work together to understand context, identify key points, 
              extract action items, and generate structured insights that are immediately useful.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <SafetyOutlined style={{ fontSize: '48px', color: '#fa8c16' }} />
            </div>
            <Title level={3}>Privacy & Security</Title>
            <Paragraph>
              We take your data privacy seriously:
            </Paragraph>
            <ul>
              <li>Meeting data is processed in real-time and not stored permanently</li>
              <li>All API communications are encrypted using HTTPS</li>
              <li>No personal information is retained after processing</li>
              <li>Your meeting content is only used for generating insights</li>
            </ul>
            <Paragraph>
              The AI processing happens through secure API calls to trusted providers, 
              ensuring your sensitive meeting information remains protected.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card>
            <Title level={3}>How It Works</Title>
            <Paragraph>
              <strong>Step 1:</strong> You provide a meeting summary or notes through our form.
            </Paragraph>
            <Paragraph>
              <strong>Step 2:</strong> The text is sent to our backend API endpoint at 
              <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '3px' }}>
                POST /api/gemini/generate
              </code>
            </Paragraph>
            <Paragraph>
              <strong>Step 3:</strong> Our AI analyzes the content for:
            </Paragraph>
            <ul>
              <li>Key discussion points and decisions</li>
              <li>Action items and task assignments</li>
              <li>Important dates and deadlines</li>
              <li>Follow-up requirements</li>
              <li>Strategic insights and recommendations</li>
            </ul>
            <Paragraph>
              <strong>Step 4:</strong> You receive structured, actionable insights 
              that help you and your team stay organized and focused.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;