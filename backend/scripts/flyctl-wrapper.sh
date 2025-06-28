#!/bin/bash

set -e

echo "🛡️ Flyctl wrapper: Validating deployment command..."

if [[ "$1" == "deploy" && "$*" == *"--image"* ]]; then
    echo "❌ ERROR: --image flag detected in flyctl deploy command"
    echo "This causes volume mount configuration errors!"
    echo ""
    echo "🚀 Use the deployment script instead:"
    echo "   cd backend && chmod +x scripts/deploy.sh && ./scripts/deploy.sh"
    echo ""
    echo "📖 See DEPLOYMENT.md for more details"
    exit 1
fi

exec /usr/local/bin/flyctl "$@"
