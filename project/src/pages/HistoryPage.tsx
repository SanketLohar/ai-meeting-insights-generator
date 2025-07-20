import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Card, Tag, Input, DatePicker, Alert } from 'antd';
import { 
  EyeOutlined, 
  DownloadOutlined, 
  SearchOutlined,
  CalendarOutlined,
  AudioOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { meetingAPI } from '../services/api';
import { Meeting } from '../types';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const HistoryPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMeetings();
  }, []);

  useEffect(() => {
    filterMeetings();
  }, [meetings, searchText, dateRange]);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const data = await meetingAPI.getHistory();
      setMeetings(data);
    } catch (err: any) {
      setError('Failed to load meeting history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterMeetings = () => {
    let filtered = meetings;

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(meeting =>
        meeting.title.toLowerCase().includes(searchText.toLowerCase()) ||
        meeting.fileName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange && dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(meeting => {
        const meetingDate = dayjs(meeting.uploadDate);
        return meetingDate.isAfter(dateRange[0]) && meetingDate.isBefore(dateRange[1]);
      });
    }

    setFilteredMeetings(filtered);
  };

  const handleDownload = async (meetingId: string, fileName: string) => {
    try {
      const blob = await meetingAPI.downloadMeeting(meetingId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'processing': return 'blue';
      case 'failed': return 'red';
      default: return 'default';
    }
  };

  const columns: ColumnsType<Meeting> = [
    {
      title: 'Meeting',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <div>
          <div className="font-semibold text-gray-800">{title}</div>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <AudioOutlined className="mr-1" />
            {record.fileName}
          </div>
        </div>
      ),
    },
    {
      title: 'Upload Date',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
      render: (date) => (
        <div className="flex items-center">
          <CalendarOutlined className="mr-2 text-gray-400" />
          <div>
            <div>{dayjs(date).format('MMM DD, YYYY')}</div>
            <div className="text-sm text-gray-500">
              {dayjs(date).format('h:mm A')}
            </div>
          </div>
        </div>
      ),
      sorter: (a, b) => dayjs(a.uploadDate).unix() - dayjs(b.uploadDate).unix(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => (
        <div className="flex items-center">
          <ClockCircleOutlined className="mr-2 text-gray-400" />
          {formatDuration(duration)}
        </div>
      ),
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: 'Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (size) => formatFileSize(size),
      sorter: (a, b) => a.fileSize - b.fileSize,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Processing', value: 'processing' },
        { text: 'Failed', value: 'failed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'completed' && (
            <Button
              type="primary"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/dashboard/insights/${record.id}`)}
            >
              View Insights
            </Button>
          )}
          <Button
            size="small"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record.id, record.fileName)}
          >
            Download
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Title level={2} className="mb-4">
          Meeting History
        </Title>
        
        <Card className="mb-6">
          <Space direction="vertical" size="middle" className="w-full">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search meetings..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1"
                allowClear
              />
              <RangePicker
                value={dateRange}
                onChange={(dates) => {
                  if (dates && dates[0] && dates[1]) {
                    setDateRange([dates[0], dates[1]]);
                  } else {
                    setDateRange(null);
                  }
                }}
                placeholder={['Start Date', 'End Date']}
                className="w-full sm:w-auto"
              />
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                {filteredMeetings.length} of {meetings.length} meetings
              </span>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setSearchText('');
                  setDateRange(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Space>
        </Card>
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

      <Card>
        <Table
          columns={columns}
          dataSource={filteredMeetings}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} meetings`,
          }}
          scroll={{ x: 800 }}
          className="meeting-history-table"
        />
      </Card>

      {filteredMeetings.length === 0 && !loading && (
        <Card className="text-center py-12">
          <Space direction="vertical" size="large">
            <AudioOutlined className="text-6xl text-gray-300" />
            <div>
              <Title level={4} type="secondary">
                No meetings found
              </Title>
              <p className="text-gray-500">
                {searchText || dateRange
                  ? 'Try adjusting your search filters'
                  : 'Upload your first meeting to get started'}
              </p>
            </div>
            <Button
              type="primary"
              onClick={() => navigate('/dashboard/upload')}
            >
              Upload Meeting
            </Button>
          </Space>
        </Card>
      )}
    </div>
  );
};

export default HistoryPage;