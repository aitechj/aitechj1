# Critical Backend Fix Required

## Database Secrets Missing from Fly.io

The backend at `aitechj-backend-v2.fly.dev` is returning 403 errors because the following environment variables are not deployed:

- `DATABASE_USERNAME` (must not be 'sa', minimum security requirement)
- `DATABASE_FILE_PASSWORD` (minimum 16 characters)
- `DATABASE_USER_PASSWORD` (minimum 16 characters)

## Required Action

Deploy these secrets to Fly.io using:

```bash
flyctl secrets set DATABASE_USERNAME=<secure_username> -a aitechj-backend-v2
flyctl secrets set DATABASE_FILE_PASSWORD=<16+_char_password> -a aitechj-backend-v2  
flyctl secrets set DATABASE_USER_PASSWORD=<16+_char_password> -a aitechj-backend-v2
```

After deployment, restart the machines to pick up the new secrets.

## Verification

Once deployed, verify the backend health:

```bash
curl https://aitechj-backend-v2.fly.dev/actuator/health
# Should return 200 OK

curl https://aitechj-backend-v2.fly.dev/api/auth/login
# Should return 401 Unauthorized (not 403 Forbidden)
```
