import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Space, 
  Button, 
  Tag, 
  List, 
  Checkbox, 
  Progress,
  Alert,
  Skeleton,
  Row,
  Col,
  Statistic,
  Divider
} from 'antd';
import { 
  DownloadOutlined, 
  ShareAltOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { meetingAPI } from '../services/api';
import { MeetingInsights } from '../types';

const { Title, Text, Paragraph } = Typography;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const InsightsPage: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();
  const [insights, setInsights] = useState<MeetingInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionItems, setActionItems] = useState<any[]>([]);

  useEffect(() => {
    if (meetingId) {
      loadInsights();
    }
  }, [meetingId]);

  const loadInsights = async () => {
    if (!meetingId) return;

    try {
      setLoading(true);
      const data = await meetingAPI.getInsights(meetingId);
      setInsights(data);
      setActionItems(data.actionItems);
    } catch (err: any) {
      setError('Failed to load insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleActionItem = (id: string) => {
    setActionItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleExport = async (format: 'pdf' | 'docx') => {
    if (!meetingId) return;

    try {
      const blob = await meetingAPI.exportInsights(meetingId, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `meeting-insights-${meetingId}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleShare = async () => {
    if (!meetingId) return;

    try {
      const response = await meetingAPI.shareMeeting(meetingId);
      navigator.clipboard.writeText(response.shareUrl);
      // Show success message
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'green';
      case 'negative': return 'red';
      case 'neutral': return 'blue';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (error || !insights) {
    return (
      <div className="max-w-6xl mx-auto">
        <Alert
          message="Error Loading Insights"
          description={error || 'Unable to load meeting insights.'}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate('/dashboard/upload')}>
              Upload New Meeting
            </Button>
          }
        />
      </div>
    );
  }

  const participantData = insights.participants.map(p => ({
    name: p.name,
    value: p.speakingTime,
  }));

  const topicData = insights.topics.map(t => ({
    name: t.name,
    time: t.timeSpent,
    confidence: t.confidence,
  }));

  const completedActions = actionItems.filter(item => item.completed).length;
  const totalActions = actionItems.length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <Title level={2} className="mb-2">
            Meeting Insights
          </Title>
          <Text type="secondary" className="text-lg">
            AI-generated summary and action items
          </Text>
        </div>
        <Space>
          <Button 
            icon={<ShareAltOutlined />}
            onClick={handleShare}
          >
            Share
          </Button>
          <Button 
            icon={<DownloadOutlined />}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
          <Button 
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => handleExport('docx')}
          >
            Export Word
          </Button>
        </Space>
      </div>

      {/* Key Metrics */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Duration"
              value={Math.round(insights.duration / 60)}
              suffix="min"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Participants"
              value={insights.participants.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Action Items"
              value={`${completedActions}/${totalActions}`}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Sentiment"
              value={insights.sentiment}
              prefix={<BulbOutlined />}
              valueStyle={{ color: getSentimentColor(insights.sentiment) === 'green' ? '#3f8600' : getSentimentColor(insights.sentiment) === 'red' ? '#cf1322' : '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Summary */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <FileTextOutlined />
                Meeting Summary
              </Space>
            }
            className="h-full"
          >
            <Paragraph className="text-gray-700 leading-relaxed">
              {insights.summary}
            </Paragraph>
            
            <Divider />
            
            <Title level={5}>Key Topics</Title>
            <Space wrap>
              {insights.keywords.map((keyword, index) => (
                <Tag key={index} color="blue">
                  {keyword}
                </Tag>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Action Items */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <CheckCircleOutlined />
                Action Items
                <Tag color={completedActions === totalActions ? 'green' : 'processing'}>
                  {completedActions}/{totalActions} Completed
                </Tag>
              </Space>
            }
            className="h-full"
          >
            {totalActions > 0 && (
              <Progress 
                percent={Math.round((completedActions / totalActions) * 100)}
                className="mb-4"
              />
            )}
            
            <List
              dataSource={actionItems}
              renderItem={(item) => (
                <List.Item className="border-0 px-0">
                  <div className="w-full">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={item.completed}
                        onChange={() => toggleActionItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Text 
                          className={item.completed ? 'line-through text-gray-400' : ''}
                        >
                          {item.text}
                        </Text>
                        <div className="mt-2 space-x-2">
                          <Tag color={getPriorityColor(item.priority)}>
                            {item.priority.toUpperCase()}
                          </Tag>
                          {item.assignee && (
                            <Tag icon={<UserOutlined />}>
                              {item.assignee}
                            </Tag>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Participant Speaking Time */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <BarChartOutlined />
                Speaking Time Distribution
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={participantData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {participantData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${Math.round(value as number / 60)} min`, 'Speaking Time']} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Topic Analysis */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <BarChartOutlined />
                Topic Analysis
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Math.round(value as number / 60)} min`, 'Time Spent']} />
                <Bar dataKey="time" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InsightsPage;