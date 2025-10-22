#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Install server dependencies
echo "Installing server dependencies..."
cd server && npm install

echo "Deployment ready! Push to Railway or your chosen platform."
