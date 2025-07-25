import React from 'react';
import { Typography, Form, Input, Button, Card, message, Row, Col } from 'antd';
import { ContactsOutlined, SendOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Contact form submitted:', values);
    
    // Simulate form submission
    message.success('Thank you for your message! We\'ll get back to you soon.');
    form.resetFields();
  };

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <ContactsOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={1}>Contact Us</Title>
        <Paragraph style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Have questions about AI Meeting Insights? We'd love to hear from you. 
          Send us a message and we'll respond as soon as possible.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} lg={12}>
          <Card>
            <Title level={3}>Get In Touch</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                label="Your Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your name!'
                  },
                  {
                    min: 2,
                    message: 'Name should be at least 2 characters long!'
                  }
                ]}
              >
                <Input 
                  prefix={<UserOutlined />}
                  placeholder="Enter your full name" 
                />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email!'
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address!'
                  }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />}
                  placeholder="Enter your email address" 
                />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your message!'
                  },
                  {
                    min: 10,
                    message: 'Message should be at least 10 characters long!'
                  }
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Tell us about your question, feedback, or how we can help you..."
                />
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  size="large"
                  style={{ minWidth: '200px' }}
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card>
            <Title level={3}>Other Ways to Reach Us</Title>
            
            <div style={{ marginBottom: '24px' }}>
              <Title level={4}>Email Support</Title>
              <Paragraph>
                For technical support or general inquiries:
                <br />
                <a href="mailto:support@aimeetinginsights.com">support@aimeetinginsights.com</a>
              </Paragraph>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Title level={4}>Business Inquiries</Title>
              <Paragraph>
                For partnerships or business-related questions:
                <br />
                <a href="mailto:business@aimeetinginsights.com">business@aimeetinginsights.com</a>
              </Paragraph>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Title level={4}>Response Time</Title>
              <Paragraph>
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent technical issues, please mark your subject line with "URGENT".
              </Paragraph>
            </div>

            <div>
              <Title level={4}>Feedback</Title>
              <Paragraph>
                We value your feedback! Let us know how we can improve AI Meeting Insights 
                or if you have ideas for new features that would be helpful.
              </Paragraph>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;