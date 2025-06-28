#!/bin/bash
set -e

echo "🚀 Starting Fly.io deployment validation..."

if [[ "$*" == *"--image"* ]]; then
    echo "❌ ERROR: --image flag detected in deployment command"
    echo "This causes volume mount configuration errors because Fly.io reads config from the image instead of local fly.toml"
    echo ""
    echo "✅ Use this instead: flyctl deploy -a aitechj-backend --wait-timeout 10m0s"
    echo "📖 See DEPLOYMENT.md for more details"
    exit 1
fi

if [ ! -f target/*.jar ]; then
    echo "📦 Building JAR file..."
    mvn clean package -DskipTests
fi

echo "🚀 Deploying to Fly.io..."
flyctl deploy -a aitechj-backend --wait-timeout 10m0s
