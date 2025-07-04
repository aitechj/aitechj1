# Backend Deployment Status

## Current Configuration (Updated July 2025)

The backend now uses PostgreSQL with simplified configuration:

- `DATABASE_URL` - PostgreSQL connection string with embedded credentials
- `JWT_SECRET` - Authentication token signing key

## Legacy H2 Configuration (DEPRECATED)

The following secrets are **no longer used** and should be removed from Fly.io:

- `DATABASE_USERNAME` - Now embedded in DATABASE_URL
- `DATABASE_FILE_PASSWORD` - Old H2 database secret (REMOVE)
- `DATABASE_USER_PASSWORD` - Old H2 database secret (REMOVE)
- `DATABASE_PASSWORD` - Now embedded in DATABASE_URL

## Required Action

Remove deprecated secrets from Fly.io:

```bash
flyctl secrets unset DATABASE_FILE_PASSWORD -a aitechj-backend-v2
flyctl secrets unset DATABASE_USER_PASSWORD -a aitechj-backend-v2
flyctl secrets unset DATABASE_USERNAME -a aitechj-backend-v2
flyctl secrets unset DATABASE_PASSWORD -a aitechj-backend-v2
```

Ensure only these secrets are set:

```bash
flyctl secrets set DATABASE_URL="<postgresql-connection-string>" -a aitechj-backend-v2
flyctl secrets set JWT_SECRET="<jwt-secret>" -a aitechj-backend-v2
```

## Verification

After removing deprecated secrets, verify the backend health:

```bash
curl https://aitechj-backend-v2.fly.dev/actuator/health
# Should return 200 OK with PostgreSQL connection

curl https://aitechj-backend-v2.fly.dev/api/auth/login
# Should return 401 Unauthorized (not 403 Forbidden)
```
