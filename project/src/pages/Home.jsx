import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { 
  BulbOutlined, 
  RocketOutlined, 
  SafetyOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
  const features = [
    {
      icon: <BulbOutlined />,
      title: 'AI-Powered Insights',
      description: 'Transform your meeting notes into actionable insights using advanced AI technology.'
    },
    {
      icon: <RocketOutlined />,
      title: 'Fast Processing',
      description: 'Get comprehensive meeting analysis in seconds, not minutes.'
    },
    {
      icon: <SafetyOutlined />,
      title: 'Secure & Private',
      description: 'Your meeting data is processed securely and never stored permanently.'
    }
  ];

  return (
    <div>
      <div className="hero-section">
        <div className="page-container">
          <Title level={1}>
            AI Meeting Insights Generator
          </Title>
          <Paragraph style={{ fontSize: '1.2rem', marginBottom: '32px' }}>
            Transform your meeting summaries into actionable insights with the power of AI
          </Paragraph>
          <Link to="/generate">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              Start Generating Insights
            </Button>
          </Link>
        </div>
      </div>

      <div className="page-container">
        <Row gutter={[32, 32]} justify="center">
          {features.map((feature, index) => (
            <Col key={index} xs={24} md={8}>
              <Card className="feature-card" hoverable>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    color: '#1890ff', 
                    marginBottom: '16px' 
                  }}>
                    {feature.icon}
                  </div>
                  <Title level={3}>{feature.title}</Title>
                  <Paragraph>{feature.description}</Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Title level={2}>How It Works</Title>
          <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: '#1890ff', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '24px', 
                  margin: '0 auto 16px' 
                }}>
                  1
                </div>
                <Title level={4}>Input Meeting Summary</Title>
                <Paragraph>Paste your meeting notes or summary into our form</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: '#1890ff', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '24px', 
                  margin: '0 auto 16px' 
                }}>
                  2
                </div>
                <Title level={4}>AI Processing</Title>
                <Paragraph>Our AI analyzes the content and extracts key insights</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: '#1890ff', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '24px', 
                  margin: '0 auto 16px' 
                }}>
                  3
                </div>
                <Title level={4}>Get Insights</Title>
                <Paragraph>Receive structured insights and action items</Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;