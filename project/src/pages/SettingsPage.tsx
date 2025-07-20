import React, { useState } from 'react';
import { Card, Typography, Switch, Button, Space, Divider, Modal, Alert } from 'antd';
import { 
  BellOutlined, 
  MoonOutlined, 
  GlobalOutlined, 
  SecurityScanOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

const SettingsPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoDownload, setAutoDownload] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const showDeleteConfirm = () => {
    confirm({
      title: 'Delete Account',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <Paragraph>
            This action cannot be undone. All your meeting data, insights, and account 
            information will be permanently deleted.
          </Paragraph>
          <Alert
            message="This action is irreversible"
            type="warning"
            showIcon
            className="mt-4"
          />
        </div>
      ),
      okText: 'Delete Account',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        // Handle account deletion
        console.log('Account deletion confirmed');
      },
    });
  };

  const handleLogoutAllDevices = () => {
    confirm({
      title: 'Logout from all devices?',
      content: 'You will be logged out from all devices and need to sign in again.',
      onOk() {
        logout();
        navigate('/');
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Title level={2} className="mb-4">
          Settings
        </Title>
        <Text type="secondary" className="text-lg">
          Customize your experience and manage your preferences
        </Text>
      </div>

      {/* Notifications */}
      <Card title={
        <Space>
          <BellOutlined />
          Notifications
        </Space>
      } className="mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Text strong>Email Notifications</Text>
              <br />
              <Text type="secondary">
                Receive updates about your meetings and insights via email
              </Text>
            </div>
            <Switch
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
          </div>
          
          <Divider />
          
          <div className="flex justify-between items-center">
            <div>
              <Text strong>Push Notifications</Text>
              <br />
              <Text type="secondary">
                Get instant notifications when processing is complete
              </Text>
            </div>
            <Switch
              checked={pushNotifications}
              onChange={setPushNotifications}
            />
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card title={
        <Space>
          <MoonOutlined />
          Appearance
        </Space>
      } className="mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Text strong>Dark Mode</Text>
              <br />
              <Text type="secondary">
                Switch to dark theme for better viewing in low light
              </Text>
            </div>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
            />
          </div>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card title={
        <Space>
          <SecurityScanOutlined />
          Data & Privacy
        </Space>
      } className="mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Text strong>Auto-download Insights</Text>
              <br />
              <Text type="secondary">
                Automatically download insights as PDF after processing
              </Text>
            </div>
            <Switch
              checked={autoDownload}
              onChange={setAutoDownload}
            />
          </div>
          
          <Divider />
          
          <div>
            <Text strong className="block mb-2">Data Export</Text>
            <Text type="secondary" className="block mb-4">
              Download all your meeting data and insights in a portable format
            </Text>
            <Button icon={<GlobalOutlined />}>
              Export All Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Account Actions */}
      <Card title="Account Actions" className="mb-6">
        <div className="space-y-6">
          <div>
            <Text strong className="block mb-2">Session Management</Text>
            <Text type="secondary" className="block mb-4">
              Sign out from all devices for security
            </Text>
            <Button onClick={handleLogoutAllDevices}>
              Logout All Devices
            </Button>
          </div>
          
          <Divider />
          
          <div>
            <Text strong className="block mb-2">Delete Account</Text>
            <Text type="secondary" className="block mb-4">
              Permanently delete your account and all associated data
            </Text>
            <Button 
              danger 
              icon={<DeleteOutlined />}
              onClick={showDeleteConfirm}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <Card>
        <div className="flex justify-end">
          <Button type="primary" size="large">
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;