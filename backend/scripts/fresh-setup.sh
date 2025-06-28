#!/bin/bash
set -e

APP_NAME=${1:-"aitechj-backend-v2"}
VOLUME_NAME="${APP_NAME//-/_}_data"

echo "🚀 Setting up fresh Fly.io app: $APP_NAME"
echo "📦 Volume name: $VOLUME_NAME"

read -p "⚠️  This will delete the current app 'aitechj-backend'. Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled"
    exit 1
fi

echo "🗑️  Deleting old app..."
flyctl apps destroy aitechj-backend --yes || echo "Old app not found or already deleted"

echo "🆕 Creating new app..."
flyctl apps create "$APP_NAME"

echo "💾 Creating volume..."
flyctl volumes create "$VOLUME_NAME" --region iad --size 1

echo "📝 Generating fly.toml..."
sed "s/{{APP_NAME}}/$APP_NAME/g; s/{{VOLUME_NAME}}/$VOLUME_NAME/g" fly.toml.template > fly.toml

echo "📦 Building JAR file..."
mvn clean package -DskipTests

echo "🚀 Deploying to new app..."
flyctl deploy -a "$APP_NAME" --wait-timeout 10m0s

echo "✅ Fresh setup complete!"
echo "🌐 New app URL: https://$APP_NAME.fly.dev/"
echo ""
echo "📋 Next steps:"
echo "1. Update GitHub secret FLY_APP_NAME to: $APP_NAME"
echo "2. Update vercel.json NEXT_PUBLIC_API_URL to: https://$APP_NAME.fly.dev"
echo "3. Test the new deployment"
