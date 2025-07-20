import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Avatar, Alert, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, EditOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

interface ProfileForm {
  name: string;
  email: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFinishProfile = async (values: ProfileForm) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // API call to update profile
      // await api.put('/user/profile', values);
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishPassword = async (values: PasswordForm) => {
    setPasswordLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // API call to change password
      // await api.put('/user/password', values);
      setSuccess('Password changed successfully');
    } catch (err: any) {
      setError('Failed to change password. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Title level={2} className="mb-4">
          Profile Settings
        </Title>
        <Text type="secondary" className="text-lg">
          Manage your account information and preferences
        </Text>
      </div>

      {success && (
        <Alert
          message={success}
          type="success"
          closable
          onClose={() => setSuccess(null)}
          className="mb-6"
        />
      )}

      {error && (
        <Alert
          message={error}
          type="error"
          closable
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <Avatar
              size={120}
              src={user?.avatar}
              icon={<UserOutlined />}
              className="mb-4"
            />
            <Title level={4} className="mb-2">
              {user?.name}
            </Title>
            <Text type="secondary">{user?.email}</Text>
            <Divider />
            <Button icon={<EditOutlined />} block>
              Change Photo
            </Button>
          </div>
        </Card>

        {/* Profile Information */}
        <Card title="Profile Information" className="lg:col-span-2">
          <Form
            layout="vertical"
            initialValues={{
              name: user?.name,
              email: user?.email,
            }}
            onFinish={onFinishProfile}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: 'Please enter your full name' },
                { min: 2, message: 'Name must be at least 2 characters' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your full name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email address"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Change Password */}
        <Card title="Change Password" className="lg:col-span-3">
          <Form
            layout="vertical"
            onFinish={onFinishPassword}
            className="max-w-md"
          >
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true, message: 'Please enter your current password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter current password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: 'Please enter a new password' },
                { min: 8, message: 'Password must be at least 8 characters' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter new password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm new password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={passwordLoading}
                size="large"
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Account Statistics */}
        <Card title="Account Statistics" className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">Total Meetings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-gray-600">Hours Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-gray-600">Action Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-gray-600">Insights Generated</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;