import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ 
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #e9ecef',
      padding: '24px 50px'
    }}>
      <Text type="secondary">
        © 2025 AI Meeting Insights Generator. All rights reserved.
      </Text>
    </AntFooter>
  );
};

export default Footer;