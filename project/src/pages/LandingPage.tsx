import React from 'react';
import { Button, Typography, Row, Col, Card, Space, Avatar } from 'antd';
import { 
  UploadOutlined, 
  BulbOutlined, 
  ShareAltOutlined, 
  CheckCircleOutlined,
  RightOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <UploadOutlined className="text-2xl text-blue-500" />,
      title: 'Easy Upload',
      description: 'Simply drag and drop your audio or video meeting files to get started instantly.',
    },
    {
      icon: <BulbOutlined className="text-2xl text-blue-500" />,
      title: 'AI Insights',
      description: 'Get comprehensive summaries, action items, and key insights powered by advanced AI.',
    },
    {
      icon: <ShareAltOutlined className="text-2xl text-blue-500" />,
      title: 'Share & Export',
      description: 'Easily share insights with your team or export them as PDF documents.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      avatar: 'https://images.pexels.com/photos/3783725/pexels-photo-3783725.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      text: 'This tool has revolutionized how we handle meeting follow-ups. The AI insights are incredibly accurate.',
    },
    {
      name: 'Michael Chen',
      role: 'Team Lead',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      text: 'No more missing action items! The automatic summaries save us hours every week.',
    },
    {
      name: 'Emma Davis',
      role: 'Operations Director',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      text: 'The participant insights help us understand team dynamics and improve collaboration.',
    },
  ];

  const steps = [
    {
      icon: <UploadOutlined />,
      title: 'Upload',
      description: 'Upload your meeting recording',
    },
    {
      icon: <BulbOutlined />,
      title: 'Analyze',
      description: 'AI processes and analyzes content',
    },
    {
      icon: <ShareAltOutlined />,
      title: 'Share',
      description: 'Get insights and share with team',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Space>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <BulbOutlined className="text-white text-xl" />
              </div>
              <Text strong className="text-xl">Meeting Insights AI</Text>
            </Space>
            <Space>
              <Button type="text" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button type="primary" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </Space>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <Title level={1} className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transform Your Meetings Into
            <br />
            Actionable Insights
          </Title>
          <Paragraph className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your meeting recordings and let our AI extract summaries, action items, 
            and key insights automatically. Never miss important details again.
          </Paragraph>
          <Space size="large">
            <Button 
              type="primary" 
              size="large" 
              icon={<RightOutlined />}
              onClick={() => navigate('/register')}
              className="h-12 px-8 text-lg"
            >
              Start Free Today
            </Button>
            <Button 
              size="large" 
              icon={<PlayCircleOutlined />}
              className="h-12 px-8 text-lg"
            >
              Watch Demo
            </Button>
          </Space>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="text-4xl font-bold mb-4">
              Powerful Features for Better Meetings
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to turn your meeting recordings into actionable insights
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  bodyStyle={{ padding: '2rem' }}
                >
                  <div className="text-center">
                    <div className="mb-4">{feature.icon}</div>
                    <Title level={4} className="mb-3">
                      {feature.title}
                    </Title>
                    <Paragraph className="text-gray-600">
                      {feature.description}
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="text-4xl font-bold mb-4">
              How It Works
            </Title>
            <Paragraph className="text-lg text-gray-600">
              Get insights in three simple steps
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]} align="middle">
            {steps.map((step, index) => (
              <Col xs={24} md={8} key={index}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    {React.cloneElement(step.icon, { className: 'text-white text-2xl' })}
                  </div>
                  <Title level={4} className="mb-2">
                    {step.title}
                  </Title>
                  <Paragraph className="text-gray-600">
                    {step.description}
                  </Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="text-4xl font-bold mb-4">
              Trusted by Teams Worldwide
            </Title>
            <Paragraph className="text-lg text-gray-600">
              See what our users are saying
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="h-full border-0 shadow-lg">
                  <div className="text-center">
                    <Avatar 
                      src={testimonial.avatar} 
                      size={64} 
                      className="mb-4"
                    />
                    <Paragraph className="text-gray-600 mb-4 italic">
                      "{testimonial.text}"
                    </Paragraph>
                    <Text strong>{testimonial.name}</Text>
                    <br />
                    <Text type="secondary">{testimonial.role}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Title level={2} className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Meetings?
          </Title>
          <Paragraph className="text-xl text-blue-100 mb-8">
            Join thousands of teams already using AI to make their meetings more productive
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            icon={<CheckCircleOutlined />}
            onClick={() => navigate('/register')}
            className="h-12 px-8 text-lg bg-white text-blue-600 border-white hover:bg-gray-100"
          >
            Get Started Free
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Space>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BulbOutlined className="text-white" />
              </div>
              <Text className="text-gray-300">Meeting Insights AI</Text>
            </Space>
            <Text className="text-gray-400">
              © 2025 Meeting Insights AI. All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;