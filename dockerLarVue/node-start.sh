#!/bin/sh
set -e

cd /var/www/node

# Если package.json отсутствует, создаём новый проект Vue
if [ ! -f "package.json" ]; then
  echo "⚙️  Vue project not found, creating a new one..."
  npm create vite@latest . -- --template vue --yes
  npm install
else
  echo "✅ Existing Vue project found, installing dependencies..."
  npm install
fi

echo "🚀 Starting Vite dev server..."
npm run dev -- --host 0.0.0.0
