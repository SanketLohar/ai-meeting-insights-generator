import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Alert, Divider } from 'antd';
import { UserOutlined, LockOutlined, BulbOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(values.email, values.password);
      login(response.token, response.user);
      navigate('/dashboard/upload');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <div className="text-center mb-8">
            <Space direction="vertical" size="small">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <BulbOutlined className="text-white text-2xl" />
              </div>
              <Title level={2} className="mb-2">
                Welcome Back
              </Title>
              <Text type="secondary">
                Sign in to access your meeting insights
              </Text>
            </Space>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              closable
              onClose={() => setError(null)}
              className="mb-6"
            />
          )}

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Email address"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 rounded-lg text-base font-medium"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700">
              Forgot your password?
            </Link>
          </div>

          <Divider className="my-6">
            <Text type="secondary">Don't have an account?</Text>
          </Divider>

          <Button
            block
            size="large"
            className="h-12 rounded-lg border-gray-300"
            onClick={() => navigate('/register')}
          >
            Create Account
          </Button>
        </Card>

        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-gray-800 flex items-center justify-center space-x-2"
          >
            <BulbOutlined />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;