import React, { useState } from 'react';
import { Typography, Form, Input, Button, Card, Alert, Spin } from 'antd';
import { BulbOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Generate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await axios.post(
        'http://localhost:8080/api/gemini/generate',
        values.meetingSummary,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );

      setResponse(result.data);
    } catch (err) {
      console.error('API Error:', err);
      
      if (err.response) {
        setError(`Server Error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        setError('Network Error: Unable to connect to the server. Please check if the backend is running on localhost:8080');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResponse('');
    setError('');
    form.resetFields();
  };

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <BulbOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={1}>Generate AI Insights</Title>
        <Paragraph style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Paste your meeting summary below and let our AI extract valuable insights, 
          action items, and key takeaways for you.
        </Paragraph>
      </div>

      <Card className="generate-form">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            label="Meeting Summary"
            name="meetingSummary"
            rules={[
              {
                required: true,
                message: 'Please enter your meeting summary!'
              },
              {
                min: 50,
                message: 'Meeting summary should be at least 50 characters long!'
              }
            ]}
          >
            <TextArea
              rows={8}
              placeholder="Paste your meeting notes or summary here... 

Example:
Team discussed Q1 goals and budget allocation. Sarah presented the marketing strategy focusing on digital channels. John raised concerns about resource allocation. We decided to schedule follow-up meetings with each department head. Action items: Sarah to finalize budget by Friday, John to prepare resource analysis, schedule department meetings by next week."
              disabled={loading}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SendOutlined />}
              size="large"
              style={{ minWidth: '200px', marginRight: '16px' }}
            >
              {loading ? 'Generating Insights...' : 'Generate Insights'}
            </Button>
            
            {(response || error) && (
              <Button 
                onClick={clearResults}
                size="large"
                style={{ minWidth: '120px' }}
              >
                Clear Results
              </Button>
            )}
          </Form.Item>
        </Form>

        {loading && (
          <div className="loading-container">
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>
              <Paragraph>
                Processing your meeting summary with AI...
              </Paragraph>
            </div>
          </div>
        )}

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginTop: '24px' }}
          />
        )}

        {response && (
          <Card 
            title="AI Generated Insights"
            className="response-container"
            style={{ marginTop: '24px' }}
          >
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              fontFamily: 'inherit',
              lineHeight: '1.6',
              fontSize: '14px'
            }}>
              {response}
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default Generate;