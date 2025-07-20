import React, { useState } from 'react';
import { Upload, Button, Typography, Progress, Card, Space, Alert, List } from 'antd';
import { InboxOutlined, CloudUploadOutlined, AudioOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { meetingAPI } from '../services/api';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

interface UploadedFile {
  file: UploadFile;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  meetingId?: string;
}

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpload = async (file: File) => {
    const uploadId = Date.now().toString();
    const newUpload: UploadedFile = {
      file: {
        uid: uploadId,
        name: file.name,
        status: 'uploading',
        size: file.size,
      },
      progress: 0,
      status: 'uploading',
    };

    setUploadedFiles(prev => [...prev, newUpload]);
    setError(null);

    try {
      const response = await meetingAPI.upload(file, (progress) => {
        setUploadedFiles(prev =>
          prev.map(item =>
            item.file.uid === uploadId
              ? { ...item, progress }
              : item
          )
        );
      });

      setUploadedFiles(prev =>
        prev.map(item =>
          item.file.uid === uploadId
            ? { ...item, status: 'success', meetingId: response.meetingId }
            : item
        )
      );
    } catch (err: any) {
      setUploadedFiles(prev =>
        prev.map(item =>
          item.file.uid === uploadId
            ? { ...item, status: 'error' }
            : item
        )
      );
      setError('Upload failed. Please try again.');
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    beforeUpload: (file: File) => {
      const isValidType = file.type.includes('audio') || file.type.includes('video');
      if (!isValidType) {
        setError('Please upload only audio or video files.');
        return false;
      }

      const isValidSize = file.size / 1024 / 1024 < 500; // 500MB
      if (!isValidSize) {
        setError('File size must be less than 500MB.');
        return false;
      }

      handleUpload(file);
      return false; // Prevent default upload
    },
  };

  const removeFile = (uid: string) => {
    setUploadedFiles(prev => prev.filter(item => item.file.uid !== uid));
  };

  const viewInsights = (meetingId: string) => {
    navigate(`/dashboard/insights/${meetingId}`);
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Title level={2} className="mb-4">
          Upload Meeting Recording
        </Title>
        <Paragraph className="text-gray-600 text-lg">
          Upload your audio or video meeting files to generate AI-powered insights. 
          Supported formats: MP3, MP4, WAV, AVI, MOV (max 500MB)
        </Paragraph>
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

      <Card className="mb-8">
        <Dragger {...uploadProps} className="p-8">
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-5xl text-blue-500" />
          </p>
          <p className="ant-upload-text text-xl font-semibold">
            Click or drag files to upload
          </p>
          <p className="ant-upload-hint text-gray-500">
            Support for audio and video files up to 500MB. 
            You can upload multiple files at once.
          </p>
        </Dragger>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card title="Upload Progress" className="mb-8">
          <List
            dataSource={uploadedFiles}
            renderItem={(item) => (
              <List.Item
                actions={[
                  item.status === 'success' && item.meetingId ? (
                    <Button
                      type="primary"
                      onClick={() => viewInsights(item.meetingId!)}
                    >
                      View Insights
                    </Button>
                  ) : null,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeFile(item.file.uid)}
                  >
                    Remove
                  </Button>,
                ].filter(Boolean)}
              >
                <List.Item.Meta
                  avatar={<AudioOutlined className="text-2xl text-blue-500" />}
                  title={
                    <Space direction="vertical" size="small" className="w-full">
                      <div className="flex justify-between items-center">
                        <Text strong>{item.file.name}</Text>
                        <Text type="secondary">
                          {formatFileSize(item.file.size || 0)}
                        </Text>
                      </div>
                      {item.status === 'uploading' && (
                        <Progress 
                          percent={item.progress} 
                          size="small"
                          status="active"
                        />
                      )}
                      {item.status === 'success' && (
                        <Text type="success">Upload completed successfully</Text>
                      )}
                      {item.status === 'error' && (
                        <Text type="danger">Upload failed</Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <Space direction="vertical" size="middle">
          <div className="flex items-center space-x-3">
            <CloudUploadOutlined className="text-2xl text-blue-500" />
            <Title level={4} className="mb-0">
              Tips for Better Results
            </Title>
          </div>
          <ul className="text-gray-600 space-y-2">
            <li>• Use clear audio with minimal background noise</li>
            <li>• Ensure all participants speak clearly</li>
            <li>• Include speaker introductions for better participant tracking</li>
            <li>• Files are processed automatically after upload</li>
          </ul>
        </Space>
      </Card>
    </div>
  );
};

export default UploadPage;