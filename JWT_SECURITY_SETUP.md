# JWT Security Configuration

## Overview
This document outlines the JWT security improvements implemented to address critical security vulnerabilities.

## Changes Made

### 1. Removed Hardcoded Secrets
- **Before**: JWT secret was hardcoded in `fly.toml` and had weak fallback in `application.yml`
- **After**: JWT secret must be provided via `JWT_SECRET` environment variable

### 2. Enhanced Security
- **Secret Length**: Minimum 32 characters required (recommended 64+ characters)
- **Token Expiration**: Reduced from 24 hours to 1 hour (3600000ms)
- **Runtime Validation**: Application validates JWT secret on startup

### 3. Environment Variable Requirements

#### Required Environment Variables
```bash
JWT_SECRET=<strong-base64-encoded-secret-minimum-32-chars>
JWT_EXPIRATION=3600000  # Optional, defaults to 1 hour
```

#### Generating a Strong JWT Secret
```bash
# Generate a 512-bit (64-byte) base64-encoded secret
openssl rand -base64 64
```

**Example Generated Secret:**
```
3FkFH8up4ETfcb1O6qdOIZwHBiMpcKo6dSWmo6cDkalHZWEdwCg2aTTBxK03u4P5Qfj89/Fy0MHnzIffH11q1w==
```

## Deployment Configuration

### Fly.io Backend Deployment
1. Set the JWT_SECRET environment variable in Fly.io:
```bash
flyctl secrets set JWT_SECRET="your-generated-secret-here"
```

2. Optionally set custom expiration:
```bash
flyctl secrets set JWT_EXPIRATION=3600000
```

### Local Development
Create a `.env` file in the backend directory:
```bash
JWT_SECRET=your-local-development-secret-here
JWT_EXPIRATION=3600000
```

Or set environment variables directly:
```bash
export JWT_SECRET="your-local-development-secret-here"
export JWT_EXPIRATION=3600000
```

## Security Benefits

1. **No Secrets in Version Control**: JWT secrets are no longer committed to the repository
2. **Strong Cryptographic Secrets**: Minimum 32-character requirement with validation
3. **Reduced Attack Window**: 1-hour token expiration limits exposure if tokens are compromised
4. **Environment-Specific Secrets**: Different secrets can be used for different environments
5. **Fail-Fast Validation**: Application won't start with weak or missing secrets

## Migration Impact

### User Experience
- Users will need to re-authenticate more frequently (every hour instead of 24 hours)
- Existing tokens will become invalid after deployment

### Deployment Requirements
- **CRITICAL**: JWT_SECRET environment variable must be set before deployment
- Application will fail to start if JWT_SECRET is not provided or is too weak

## Testing Checklist

- [ ] Application starts successfully with valid JWT_SECRET
- [ ] Application fails to start with missing JWT_SECRET
- [ ] Application fails to start with weak JWT_SECRET (< 32 chars)
- [ ] JWT tokens are generated successfully
- [ ] JWT tokens expire after 1 hour
- [ ] Authentication endpoints work correctly
- [ ] Token validation works correctly

## Rollback Plan

If issues arise, the previous configuration can be restored by:
1. Checking out the `working-registration-model` git tag
2. Redeploying with the previous configuration

```bash
git checkout working-registration-model
git checkout -b rollback-jwt-security
# Deploy rollback branch
```

## Files Modified

1. **backend/src/main/resources/application.yml**
   - Removed weak fallback secret
   - Reduced default expiration to 1 hour

2. **backend/fly.toml**
   - Removed hardcoded JWT_SECRET from environment variables

3. **backend/src/main/java/com/aiportal/learning/security/JwtUtil.java**
   - Added @PostConstruct validation for JWT_SECRET
   - Updated default expiration to 1 hour

## Error Messages

If JWT_SECRET is not configured properly, you will see one of these error messages:

```
java.lang.IllegalStateException: JWT_SECRET environment variable must be provided
```

```
java.lang.IllegalStateException: JWT_SECRET must be at least 32 characters long for security
```

These errors indicate that the JWT_SECRET environment variable needs to be set with a strong secret before the application can start.
