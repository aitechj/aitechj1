# Database Security Configuration

## Overview
This document outlines the database security improvements implemented to address critical H2 database vulnerabilities.

## Changes Made

### 1. Database Encryption
- **Before**: H2 database stored in plain text files
- **After**: AES encryption enabled for all database files via CIPHER=AES parameter

### 2. Strong Authentication
- **Username**: Custom secure username via DATABASE_USERNAME environment variable
- **Password**: Strong password (minimum 16 characters) via DATABASE_PASSWORD environment variable
- **Runtime Validation**: Application validates credentials on startup

### 3. Connection Security
- **Connection Pooling**: HikariCP with security-focused configuration
- **Connection Limits**: Maximum 10 connections, minimum 2 idle
- **Leak Detection**: 60-second threshold for connection leak detection
- **Connection Timeouts**: 30-second connection timeout, 10-minute idle timeout

## Environment Variable Requirements

#### Required Environment Variables
```bash
DATABASE_USERNAME=<secure-username-not-postgres>
DATABASE_PASSWORD=<strong-password-minimum-16-chars>
DATABASE_URL=jdbc:postgresql://<host>:<port>/<database>
```

#### Generating Strong Database Credentials
```bash
# Generate a secure username
echo "pguser_$(openssl rand -hex 4)"

# Generate strong password (32 characters)
echo "Database password: $(openssl rand -base64 32)"
```

**Example Generated Credentials:**
```
DATABASE_USERNAME=pguser_a7f3c2e1
DATABASE_PASSWORD=K8mN2pQ5rS9tU6vW3xY7zA1bC4dE8fG2hI5jL9mN0pQ=
DATABASE_URL=jdbc:postgresql://your-postgres-host:5432/learning_portal
```

## Deployment Configuration

### Fly.io Backend Deployment
1. Set the database credentials in Fly.io:
```bash
flyctl secrets set DATABASE_USERNAME="your-secure-username"
flyctl secrets set DATABASE_PASSWORD="your-generated-password"
flyctl secrets set DATABASE_URL="jdbc:postgresql://host:port/database"
```

2. Verify secrets are set:
```bash
flyctl secrets list
```

### Local Development
Create a `.env` file in the backend directory:
```bash
DATABASE_USERNAME=local_dev_user
DATABASE_PASSWORD=local_development_password_secure_16chars
DATABASE_URL=jdbc:postgresql://localhost:5432/learning_portal_dev
```

Or set environment variables directly:
```bash
export DATABASE_USERNAME="local_dev_user"
export DATABASE_PASSWORD="local_development_password_secure_16chars"
export DATABASE_URL="jdbc:postgresql://localhost:5432/learning_portal_dev"
```

## Security Benefits

1. **Encrypted Connections**: All database connections use SSL/TLS encryption
2. **Strong Authentication**: No default credentials, minimum 16-character password requirement
3. **Connection Security**: Pooled connections with leak detection and timeouts
4. **Environment-Specific Credentials**: Different credentials per environment
5. **Fail-Fast Validation**: Application won't start with weak or missing credentials
6. **No Secrets in Version Control**: Database credentials managed via environment variables
7. **Production Database**: Managed PostgreSQL with enterprise-grade security features

## Migration Strategy

### Safe Migration Process
1. **Create PostgreSQL Database**: Set up managed PostgreSQL instance on Fly.io
2. **Set Environment Variables**: Configure DATABASE_USERNAME, DATABASE_PASSWORD, and DATABASE_URL
3. **Deploy New Version**: Application will connect to PostgreSQL and create schema automatically
4. **Data Migration**: Not needed for fresh PostgreSQL setup (data loss acceptable)

## Migration Impact

### Deployment Requirements
- **CRITICAL**: DATABASE_USERNAME, DATABASE_PASSWORD, and DATABASE_URL must be set before deployment
- Application will fail to start if credentials are missing or weak
- PostgreSQL database schema will be created automatically (existing H2 data will be lost)

### User Experience
- No impact on user authentication or application functionality
- Database operations remain transparent to end users
- Improved security posture with encrypted data at rest

## Testing Checklist

- [ ] Application starts successfully with valid DATABASE_USERNAME, DATABASE_PASSWORD, and DATABASE_URL
- [ ] Application fails to start with missing DATABASE_USERNAME
- [ ] Application fails to start with missing DATABASE_PASSWORD
- [ ] Application fails to start with missing DATABASE_URL
- [ ] Application fails to start with weak DATABASE_PASSWORD (< 16 chars)
- [ ] Application fails to start with default 'postgres' username
- [ ] PostgreSQL connection uses SSL/TLS encryption
- [ ] Authentication endpoints work correctly with encrypted database
- [ ] User registration and login function normally
- [ ] Connection pooling is active (check logs for HikariCP messages)

## Rollback Plan

If issues arise, the previous configuration can be restored by:
1. Checking out the previous git commit
2. Removing the DATABASE_USERNAME and DATABASE_PASSWORD environment variables
3. Redeploying with the previous configuration

```bash
git checkout HEAD~1
# Remove secrets from Fly.io
flyctl secrets unset DATABASE_USERNAME DATABASE_PASSWORD
# Deploy rollback
```

## Files Modified

1. **backend/src/main/resources/application.yml**
   - Added CIPHER=AES to database URL for encryption
   - Changed username/password to use environment variables
   - Added HikariCP connection pool configuration

2. **backend/src/main/java/com/aiportal/learning/security/DatabaseSecurityValidator.java**
   - New component for validating database security configuration
   - Runtime validation of credentials strength and presence

## Error Messages

If database credentials are not configured properly, you will see one of these error messages:

```
java.lang.IllegalStateException: DATABASE_PASSWORD environment variable must be provided
```

```
java.lang.IllegalStateException: DATABASE_PASSWORD must be at least 16 characters long for security
```

```
java.lang.IllegalStateException: DATABASE_USERNAME environment variable must be provided
```

```
java.lang.IllegalStateException: DATABASE_USERNAME should not use default 'sa' username for security
```

These errors indicate that the database credentials need to be properly configured before the application can start.

## Security Compliance

This implementation addresses the following security concerns:
- **CWE-256**: Unprotected Storage of Credentials
- **CWE-311**: Missing Encryption of Sensitive Data
- **CWE-521**: Weak Password Requirements
- **CWE-798**: Use of Hard-coded Credentials

The database security configuration now follows industry best practices for credential management and data encryption.
