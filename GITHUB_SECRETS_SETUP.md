# GitHub Repository Secrets Setup

## Required GitHub Repository Secrets

The following secrets must be configured in the GitHub repository settings for the deployment workflow to succeed:

### Backend Deployment (Fly.io)

#### PostgreSQL Database Connection
```
JDBC_URL=jdbc:postgresql://hostname:port/database?sslmode=require
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
```

**Note**: Uses separate JDBC_URL, DATABASE_USERNAME, and DATABASE_PASSWORD variables as required by DatabaseSecurityValidator.

#### JWT Authentication Secret
```
JWT_SECRET=<your-jwt-secret-minimum-32-characters>
```

**Important**: JWT_SECRET must be at least 32 characters long for security. The application will fail to start if this requirement is not met.

#### Fly.io Deployment Token
```
FLY_API_TOKEN=<your-fly-api-token>
```

### Frontend Deployment (Vercel)
```
VERCEL_TOKEN=<your-vercel-deployment-token>
VERCEL_ORG_ID=<your-vercel-organization-id>
VERCEL_PROJECT_ID=<your-vercel-project-id>
```

## How to Add Secrets to GitHub Repository

1. Go to your GitHub repository: https://github.com/aitechj/aitechj1
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** for each secret
5. Add the secret name and value

## Secrets to Remove (Deprecated)

**CRITICAL:** Remove these deprecated secrets from both GitHub repository settings and Fly.io app secrets:

### GitHub Repository Secrets Required:
- `JDBC_URL` - PostgreSQL JDBC URL without embedded credentials
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password

### Fly.io App Secrets Required:
- `JDBC_URL` - PostgreSQL JDBC URL without embedded credentials  
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password

**Note**: These secrets must match between GitHub and Fly.io for deployment to work correctly.

## Verification

After adding the secrets, the GitHub Actions deployment workflow should succeed. You can verify by:
1. Pushing a commit to the main branch
2. Checking the "Deploy to Fly.io" workflow status
3. Confirming the backend deploys successfully to https://aitechj-backend-v2.fly.dev

## Current Status (Updated July 2025)

- ✅ Spring Boot PostgreSQL configuration updated to use DATABASE_URL only
- ✅ DatabaseSecurityValidator updated for embedded credentials
- ✅ Fly.io configuration uses 'fly' profile instead of 'production'
- ✅ GitHub Actions workflow updated to use simplified secret approach
- ✅ PR #103 merged with all configuration changes

## Secret Usage Summary

**Currently Used:**
- JDBC_URL (PostgreSQL JDBC URL without embedded credentials)
- DATABASE_USERNAME (database username)
- DATABASE_PASSWORD (database password)
- JWT_SECRET (authentication token signing)
- FLY_API_TOKEN (backend deployment to Fly.io)
- VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID (frontend deployment to Vercel)
