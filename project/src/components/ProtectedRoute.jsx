import { useAuth } from '../context/AuthContext';
import { Modal, Button, Typography } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const { Title, Paragraph } = Typography;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      setShowModal(true);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setShowModal(false);
    navigate('/login');
  };

  const handleRegister = () => {
    setShowModal(false);
    navigate('/register');
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate('/');
  };

  if (!isAuthenticated()) {
    return (
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <LoginOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={3} style={{ margin: 0 }}>Authentication Required</Title>
          </div>
        }
        open={showModal}
        onCancel={handleCancel}
        footer={null}
        width={480}
        centered
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
            You need to be logged in to access the AI Meeting Insights Generator. 
            Please sign in to your account or create a new one to continue.
          </Paragraph>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button 
              type="primary" 
              size="large"
              icon={<LoginOutlined />}
              onClick={handleLogin}
              style={{ minWidth: '120px' }}
            >
              Sign In
            </Button>
            <Button 
              size="large"
              icon={<UserAddOutlined />}
              onClick={handleRegister}
              style={{ minWidth: '120px' }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return children;
};

export default ProtectedRoute;