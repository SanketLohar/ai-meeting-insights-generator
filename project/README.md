# Meeting Insights Generator Backend

A production-ready Spring Boot backend service that generates AI-powered meeting insights using Google's Gemini API.

## Features

- **AI-Powered Analysis**: Integrates with Google Gemini API for intelligent meeting analysis
- **Multiple Input Types**: Supports both text transcripts and audio files
- **Structured Insights**: Returns summary, action items, sentiment analysis, tasks, and key decisions
- **JWT Authentication**: Secure user authentication and authorization
- **File Upload Support**: Handle audio file uploads with multipart support
- **CORS Enabled**: Ready for frontend integration
- **Production Ready**: Comprehensive error handling, logging, and validation

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/health` - Auth service health check

### Insights Generation
- `POST /api/insights` - Generate insights from JSON payload
- `POST /api/insights/upload` - Generate insights from file upload
- `GET /api/insights/health` - Insights service health check

## Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Google Gemini API key

### Setup

1. **Clone and navigate to the project**
   ```bash
   cd meeting-insights-backend
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key
   export GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

3. **Build and run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

The server will start on `http://localhost:8080`

### API Usage Examples

#### 1. User Registration
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### 2. User Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### 3. Generate Insights (Text)
```bash
curl -X POST http://localhost:8080/api/insights \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "inputType": "text",
    "content": "Meeting discussion about Q4 planning. John mentioned we need to increase marketing budget by 20%. Sarah agreed to prepare the budget proposal by Friday. The team decided to focus on digital marketing channels."
  }'
```

#### 4. Generate Insights (File Upload)
```bash
curl -X POST http://localhost:8080/api/insights/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@meeting-transcript.txt"
```

### Expected Response Format

```json
{
  "summary": "Meeting focused on Q4 planning with emphasis on marketing budget increase",
  "actionItems": [
    "Sarah to prepare budget proposal by Friday",
    "Review digital marketing channel options"
  ],
  "sentiment": "positive",
  "tasks": [
    "Increase marketing budget by 20%",
    "Focus on digital marketing channels"
  ],
  "keyPoints": [
    "Q4 planning discussion",
    "Marketing budget increase needed",
    "Digital marketing focus"
  ],
  "decisions": [
    "Approved 20% marketing budget increase",
    "Focus on digital marketing channels"
  ]
}
```

## Configuration

### Environment Variables
- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `JWT_SECRET`: Secret key for JWT token generation (optional)
- `JWT_EXPIRATION`: JWT token expiration time in milliseconds (optional)
- `SERVER_PORT`: Server port (optional, defaults to 8080)

### Application Properties
Key configurations in `application.properties`:
- Server port and context path
- Logging levels
- File upload limits
- CORS settings
- JWT configuration

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses without sensitive information

## Development

### Project Structure
```
src/main/java/com/backend/insights/
├── config/           # Configuration classes
├── controller/       # REST controllers
├── dto/             # Data transfer objects
├── security/        # Security components
└── service/         # Business logic services
```

### Building for Production
```bash
mvn clean package
java -jar target/meeting-insights-0.0.1-SNAPSHOT.jar
```

## Troubleshooting

### Common Issues

1. **Gemini API Key Not Found**
   - Ensure `GEMINI_API_KEY` environment variable is set
   - Check that the API key is valid and has proper permissions

2. **CORS Issues**
   - Verify CORS configuration in `SecurityConfig.java`
   - Check that frontend origin is allowed

3. **JWT Token Issues**
   - Ensure JWT secret is properly configured
   - Check token expiration settings

### Logs
Check application logs for detailed error information:
```bash
tail -f logs/application.log
```

## License

This project is licensed under the MIT License.