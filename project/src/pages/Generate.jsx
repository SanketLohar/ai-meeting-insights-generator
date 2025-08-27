import { useState } from 'react';
import { Form, Button, Card, Typography, Alert, Spin, Divider, Upload, Progress, message } from 'antd';
import { SendOutlined, CloudUploadOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const { Dragger } = Upload;
const { Title, Paragraph, Text } = Typography;

const Generate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const { token } = useAuth();

  const handleSubmit = async () => {
    if (!audioFile) {
      message.error('Please upload an audio file first');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');
    setUploadProgress(0);

    try {
      const formData = new FormData();
      // ⭐ CORRECTED: Use the correct key 'file' to match the backend @RequestParam ⭐
      formData.append('file', audioFile);

      const result = await axios.post(
        // ⭐ CORRECTED: Use the correct backend endpoint URL for GeminiController ⭐
        'http://localhost:8080/api/gemini/upload-audio',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        }
      );
      
      // ⭐ UPDATED: Check for data before setting response to avoid errors ⭐
      if (result.data) {
        setResponse(result.data);
      } else {
        setError('The server returned a successful response but with no data.');
      }

    } catch (err) {
      console.error('API Error:', err);
      setError(
        err.response?.data?.message || 
        'Failed to process audio file and generate insights. Please check if the backend server is running on http://localhost:8080'
      );
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const uploadProps = {
    name: 'audio',
    multiple: false,
    accept: '.mp3,.wav,.m4a,.aac,.ogg,.flac',
    beforeUpload: (file) => {
      const isAudio = file.type.startsWith('audio/');
      if (!isAudio) {
        message.error('You can only upload audio files!');
        return false;
      }
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        message.error('Audio file must be smaller than 50MB!');
        return false;
      }
      setAudioFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setAudioFile(null);
    },
  };

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <CloudUploadOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={2}>Generate AI Meeting Insights</Title>
        <Paragraph style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Upload your meeting audio file and our AI will transcribe it and generate comprehensive insights, 
          action items, and key takeaways for you.
        </Paragraph>
      </div>

      <Card className="generate-form" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="audioFile"
            label={<Text strong>Meeting Audio File</Text>}
            rules={[
              {
                required: true,
                message: 'Please upload an audio file!',
              },
            ]}
          >
            <Dragger {...uploadProps} style={{ padding: '20px' }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              </p>
              <p className="ant-upload-text" style={{ fontSize: '16px', fontWeight: '500' }}>
                Click or drag audio file to this area to upload
              </p>
              <p className="ant-upload-hint" style={{ fontSize: '14px', color: '#666' }}>
                Supports MP3, WAV, M4A, AAC, OGG, FLAC formats. Maximum file size: 50MB
              </p>
              {audioFile && (
                <div style={{ marginTop: '12px', padding: '8px', background: '#f0f2f5', borderRadius: '4px' }}>
                  <Text strong style={{ color: '#52c41a' }}>
                    ✓ {audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Text>
                </div>
              )}
            </Dragger>
          </Form.Item>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Uploading and Processing...</Text>
              <Progress percent={uploadProgress} status="active" />
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!audioFile}
              icon={<SendOutlined />}
              size="large"
              style={{ 
                width: '100%',
                height: '48px',
                fontSize: '16px',
                borderRadius: '8px'
              }}
            >
              {loading ? 'Processing Audio & Generating Insights...' : 'Generate AI Insights'}
            </Button>
          </Form.Item>
        </Form>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginTop: '16px' }}
            closable
            onClose={() => setError('')}
          />
        )}

        {(loading || response) && (
          <>
            <Divider />
            <div>
              <Text strong style={{ fontSize: '16px', marginBottom: '16px', display: 'block' }}>
                AI Generated Insights from Audio:
              </Text>
              
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {response}
              </div>
          </div>
          </>
        )}
      </Card>

      {/* Tips Section */}
      <Card 
        style={{ 
          marginTop: '32px', 
          background: '#f8f9fa',
          border: '1px solid #e9ecef'
        }}
      >
        <Title level={4} style={{ color: '#1890ff', marginBottom: '16px' }}>
          💡 Tips for Better Results
        </Title>
        <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>
            Ensure clear audio quality with minimal background noise
          </li>
          <li style={{ marginBottom: '8px' }}>
            Upload files in supported formats (MP3, WAV, M4A, AAC, OGG, FLAC)
          </li>
          <li style={{ marginBottom: '8px' }}>
            Keep file size under 50MB for optimal processing speed
          </li>
          <li style={{ marginBottom: '8px' }}>
            Longer recordings may take more time to process and analyze
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Generate;
