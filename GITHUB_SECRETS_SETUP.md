# GitHub Repository Secrets Setup

## Required GitHub Repository Secrets

The following secrets must be configured in the GitHub repository settings for the deployment workflow to succeed:

### Backend Deployment (Fly.io)

#### PostgreSQL Database Connection
```
DATABASE_URL=jdbc:postgresql://direct.nlkxjo585d4oy93v.flympg.net:5432/pgdb-nlkxjo585d4oy93v?sslmode=require
```

**Note**: DATABASE_URL contains embedded credentials. Separate DATABASE_USERNAME and DATABASE_PASSWORD are no longer used.

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

### GitHub Repository Secrets to Remove:
- `DATABASE_USERNAME` - Now embedded in DATABASE_URL
- `DATABASE_PASSWORD` - Now embedded in DATABASE_URL

### Fly.io App Secrets to Remove:
- `DATABASE_USERNAME` - Now embedded in DATABASE_URL
- `DATABASE_PASSWORD` - Now embedded in DATABASE_URL

**Commands to remove Fly.io secrets:**
```bash
flyctl secrets unset DATABASE_USERNAME -a aitechj-backend-v2
flyctl secrets unset DATABASE_PASSWORD -a aitechj-backend-v2
```

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
- DATABASE_URL (backend database connection with embedded credentials)
- JWT_SECRET (authentication token signing)
- FLY_API_TOKEN (backend deployment to Fly.io)
- VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID (frontend deployment to Vercel)

**No Longer Used:**
- DATABASE_USERNAME (embedded in DATABASE_URL)
- DATABASE_PASSWORD (embedded in DATABASE_URL)
