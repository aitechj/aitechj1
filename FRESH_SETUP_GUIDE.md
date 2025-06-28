# Fresh Fly.io Setup Guide - AI Learning Portal Backend

## Why Start Fresh?
Starting with a new Fly.io app will eliminate:
- Volume mount configuration conflicts
- Cached deployment states
- Any automatic deployment integrations causing issues
- Pre-built image dependencies

## Step-by-Step Fresh Setup

### 1. Delete Current Fly.io App
```bash
# Delete the current app (this will remove all data!)
flyctl apps destroy aitechj-backend
```

### 2. Create New Fly.io App
```bash
cd backend

# Create a new app with a different name
flyctl apps create aitechj-backend-v2

# Or let Fly.io generate a unique name
flyctl apps create
```

### 3. Initialize Fresh Configuration
```bash
# Remove old fly.toml to start fresh
rm fly.toml

# Initialize new fly.toml with proper configuration
flyctl launch --no-deploy --copy-config --name aitechj-backend-v2
```

### 4. Configure fly.toml Properly
Replace the generated `fly.toml` with this tested configuration:

```toml
app = "aitechj-backend-v2"
primary_region = "iad"

[build]

[env]
  SPRING_PROFILES_ACTIVE = "production"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "suspend"
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

[[mounts]]
  source = "aitechj_data_v2"
  destination = "/data"
  initial_size = "1gb"

[[vm]]
  memory = "2gb"
  cpu_kind = "shared"
  cpus = 1

[checks]
  [checks.health]
    grace_period = "30s"
    interval = "15s"
    method = "GET"
    path = "/actuator/health"
    port = 8080
    timeout = "10s"
    type = "http"
```

### 5. Create New Volume
```bash
# Create a new volume for the new app
flyctl volumes create aitechj_data_v2 --region iad --size 1
```

### 6. Build and Deploy
```bash
# Build the JAR file first (CRITICAL!)
mvn clean package -DskipTests

# Deploy the new app
flyctl deploy --wait-timeout 10m0s
```

### 7. Update GitHub Repository Configuration

#### Update GitHub Secrets
1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Update `FLY_API_TOKEN` if needed
3. Add new secret `FLY_APP_NAME` with value `aitechj-backend-v2`

#### Update GitHub Actions Workflow
Update `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to Fly.io
  run: |
    chmod +x scripts/deploy.sh
    export FLY_API_TOKEN="${{ secrets.FLY_API_TOKEN }}"
    export FLY_APP_NAME="${{ secrets.FLY_APP_NAME }}"
    ./scripts/deploy.sh
  env:
    FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
  working-directory: ./backend
```

#### Update deployment script
Update `backend/scripts/deploy.sh`:

```bash
#!/bin/bash
set -e

APP_NAME=${FLY_APP_NAME:-"aitechj-backend-v2"}

echo "🚀 Deploying to Fly.io app: $APP_NAME"

# Build JAR file
echo "📦 Building JAR file..."
mvn clean package -DskipTests

# Deploy with proper timeout
echo "🛫 Deploying to Fly.io..."
flyctl deploy -a "$APP_NAME" --wait-timeout 10m0s

echo "✅ Deployment complete!"
echo "🌐 App URL: https://$APP_NAME.fly.dev/"
```

### 8. Update Frontend Configuration
Update `vercel.json` to point to the new backend:

```json
{
  "env": {
    "NEXT_PUBLIC_API_URL": "https://aitechj-backend-v2.fly.dev"
  }
}
```

### 9. Verify New Deployment
```bash
# Check app status
flyctl status -a aitechj-backend-v2

# Check health endpoint
curl https://aitechj-backend-v2.fly.dev/actuator/health

# Check logs
flyctl logs -a aitechj-backend-v2
```

## Key Advantages of Fresh Setup

### ✅ Eliminates All Previous Issues
- No volume mount configuration conflicts
- No cached deployment states
- No automatic deployment integrations
- Clean slate with proper configuration

### ✅ Proper Configuration from Start
- Correct volume mount configuration
- Proper health check settings
- Optimized memory and CPU allocation
- Clean deployment pipeline

### ✅ Simplified Troubleshooting
- Clear deployment logs
- No legacy configuration conflicts
- Predictable behavior

## Important Notes

### ⚠️ Data Loss Warning
- Deleting the old app will remove all existing data
- The H2 database will be reset (this might be okay for development)
- Make sure to backup any important data first

### 🔧 Configuration Best Practices
- Always build JAR file before deployment (`mvn clean package -DskipTests`)
- Use proper wait timeout (10 minutes for Spring Boot)
- Never use `--image` flag in deployment commands
- Always deploy from source code, not pre-built images

### 🚀 Deployment Workflow
1. Build JAR locally: `mvn clean package -DskipTests`
2. Deploy with timeout: `flyctl deploy --wait-timeout 10m0s`
3. Verify health: `curl https://your-app.fly.dev/actuator/health`
4. Check logs if issues: `flyctl logs -a your-app`

## Troubleshooting New Setup

### If Deployment Fails
```bash
# Check logs immediately
flyctl logs -a aitechj-backend-v2

# Check machine status
flyctl status -a aitechj-backend-v2

# Restart if needed
flyctl machine restart -a aitechj-backend-v2
```

### If Health Checks Fail
- Wait 30-60 seconds for Spring Boot to fully start
- Check that port 8080 is correctly configured
- Verify JAR file was built successfully

### If Volume Issues Persist
```bash
# List volumes
flyctl volumes list -a aitechj-backend-v2

# Check volume mount in fly.toml matches created volume name
```

This fresh setup approach will give you a clean, properly configured Fly.io deployment without any of the legacy issues we've been fighting!
