#!/bin/bash
set -e

APP_NAME=${FLY_APP_NAME:-"aitechj-backend-v2"}

echo "🚀 Starting Fly.io deployment validation for app: $APP_NAME"

if [[ "$*" == *"--image"* ]]; then
    echo "❌ ERROR: --image flag detected in deployment command"
    echo "This causes volume mount configuration errors because Fly.io reads config from the image instead of local fly.toml"
    echo ""
    echo "✅ Use this instead: flyctl deploy -a $APP_NAME --wait-timeout 10m0s"
    echo "📖 See DEPLOYMENT.md for more details"
    exit 1
fi

if [ ! -f target/*.jar ]; then
    echo "📦 Building JAR file..."
    mvn clean package -DskipTests
fi

echo "🚀 Deploying to Fly.io app: $APP_NAME"
flyctl deploy -a "$APP_NAME" --config fly.toml --wait-timeout 10m0s

echo "✅ Deployment complete!"
echo "🌐 App URL: https://$APP_NAME.fly.dev/"
