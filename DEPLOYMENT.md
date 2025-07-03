# AI Learning Portal - Deployment Guide

## Backend Deployment (Fly.io)

### Prerequisites
- Fly.io CLI installed and authenticated
- Maven 3.6.3 or higher
- Java 17 or higher

### Deployment Steps

1. **Build the JAR file** (REQUIRED before every deployment):
   ```bash
   cd backend
   mvn clean package -DskipTests
   ```
   
   ⚠️ **Important**: This step is mandatory. The Fly.io deployment will fail if the JAR file is not built locally first.

2. **Deploy to Fly.io**:
   ```bash
   # Use the validation script (recommended)
   chmod +x scripts/deploy.sh && ./scripts/deploy.sh
   
   # Or deploy directly (manual)
   flyctl deploy -a aitechj-backend-v2 --wait-timeout 10m0s
   ```

3. **Verify deployment**:
   ```bash
   # Check health endpoint
   curl https://aitechj-backend-v2.fly.dev/actuator/health
   
   # Check logs
   flyctl logs -a aitechj-backend-v2
   ```

### Backend Configuration

- **URL**: https://aitechj-backend-v2.fly.dev/
- **Database**: PostgreSQL managed database instance
- **Health Check**: Port 8080, endpoint `/actuator/health`
- **Environment**: Production with JWT authentication

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/me` - Get current user info

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account connected to GitHub repository
- Node.js 18+ and pnpm

### Automatic Deployment
The frontend automatically deploys to Vercel on every push to the main branch via GitHub integration.

### Manual Deployment
```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Deploy to Vercel
vercel --prod
```

### Environment Configuration
The frontend is configured to use the Fly.io backend URL via `vercel.json`:
```json
{
  "env": {
    "NEXT_PUBLIC_API_URL": "https://aitechj-backend-v2.fly.dev"
  }
}
```

## Troubleshooting

### Backend Issues

**Health Check Failures**:
- Health checks may temporarily fail during deployment
- Wait 30-60 seconds for the application to fully start
- Check logs: `flyctl logs -a aitechj-backend-v2`

**JAR File Missing Error**:
- Ensure you run `mvn clean package -DskipTests` before deployment
- Check that `target/*.jar` file exists in the backend directory

**Database Issues**:
- PostgreSQL database connection configured via DATABASE_URL environment variable
- Database schema will be created automatically on first run via Hibernate DDL

**Deployment Timeout Failures**:
- Spring Boot applications take 12+ seconds to start, which can cause deployment timeouts
- Use increased wait timeout: `flyctl deploy -a aitechj-backend-v2 --wait-timeout 10m0s`
- Monitor logs during deployment: `flyctl logs -a aitechj-backend-v2`
- Proxy connection errors during startup are normal and will resolve once the app is ready

**"Unsuccessful Command" Errors**:
- Usually caused by insufficient deployment wait timeout
- Increase timeout to 10 minutes to accommodate Spring Boot startup time
- Verify machine status after deployment: `flyctl status -a aitechj-backend-v2`

**Volume Mount Configuration Errors**:
- Error: "machine has a volume mounted but app config does not specify a volume"
- **Root Cause**: Using `--image` flag with pre-built image hash that contains outdated fly.toml
- **Solution**: Always deploy from source without `--image` flag
- **Wrong**: `flyctl deploy --image registry.fly.io/aitechj-backend-v2:deployment-{hash}`
- **Correct**: `flyctl deploy -a aitechj-backend-v2 --wait-timeout 10m0s`
- When using `--image`, Fly.io reads config from the image, not your local fly.toml

**IMPORTANT**: The deployment validation script at `backend/scripts/deploy.sh` automatically prevents --image flag usage and ensures correct deployment. Always use this script for deployments.

### Frontend Issues

**Build Failures**:
- Check for TypeScript errors: `pnpm build`
- Verify ESLint passes: `pnpm lint`
- Ensure all dependencies are installed: `pnpm install`

**API Connection Issues**:
- Verify backend is running: `curl https://aitechj-backend-v2.fly.dev/actuator/health`
- Check browser network tab for CORS errors
- Verify `NEXT_PUBLIC_API_URL` environment variable

## CI/CD Pipeline

### GitHub Actions
The repository includes automated workflows for:
- Frontend deployment to Vercel
- Backend deployment to Fly.io (when backend files change)
- TypeScript type checking and ESLint validation

### Known Issues
- The "test" CI check fails due to missing test script in `package.json`
- This is a configuration issue, not related to application functionality
- All other checks (build, lint, deploy) pass successfully

## Security Notes

- JWT tokens are used for authentication
- Passwords are hashed using BCrypt
- CORS is configured to allow frontend domain
- PostgreSQL database provides production-grade data persistence and performance
- All endpoints require proper authentication except registration and login
