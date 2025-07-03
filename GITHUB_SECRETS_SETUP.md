# GitHub Repository Secrets Setup for PostgreSQL

## Required GitHub Repository Secrets

The following secrets must be configured in the GitHub repository settings for the deployment workflow to succeed:

### PostgreSQL Database Secrets
```
DATABASE_USERNAME=aitechj-db-pswd
DATABASE_PASSWORD=Techjadmin@1234!@#$
DATABASE_URL=jdbc:postgresql://your-postgres-host:5432/learning_portal
```

### JWT Authentication Secret
```
JWT_SECRET=<your-jwt-secret-minimum-32-characters>
```

**Important**: JWT_SECRET must be at least 32 characters long for security. The application will fail to start if this requirement is not met.

### Existing Secrets (Keep These)
```
FLY_API_TOKEN=<your-fly-api-token>
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-vercel-org-id>
VERCEL_PROJECT_ID=<your-vercel-project-id>
```

## How to Add Secrets to GitHub Repository

1. Go to your GitHub repository: https://github.com/aitechj/aitechj1
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** for each secret
5. Add the secret name and value

## Secrets to Remove (Old H2 Database)

If these exist, they should be removed as they are no longer needed:
- `DATABASE_FILE_PASSWORD`
- `DATABASE_USER_PASSWORD`

## Verification

After adding the secrets, the GitHub Actions deployment workflow should succeed. You can verify by:
1. Pushing a commit to the main branch
2. Checking the "Deploy to Fly.io" workflow status
3. Confirming the backend deploys successfully to https://aitechj-backend-v2.fly.dev

## Current Status

- ✅ Fly.io app secrets configured correctly
- ❌ GitHub repository secrets need to be added
- ❌ Deployment workflow failing due to missing GitHub secrets

The PostgreSQL migration code is complete and merged. Only the GitHub secrets configuration is needed to complete the deployment.
