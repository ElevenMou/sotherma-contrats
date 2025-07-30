# Use official Node.js Windows Server Core image
FROM mcr.microsoft.com/windows/nanoserver:ltsc2019 AS base

# Download and install Node.js
# ADD https://nodejs.org/dist/v20.15.1/node-v20.15.1-win-x64.zip C:/nodejs.zip
# RUN powershell -Command "Expand-Archive C:/nodejs.zip C:/; Move-Item C:/node-v20.15.1-win-x64 C:/nodejs; Remove-Item C:/nodejs.zip"

# Set environment variables
# ENV PATH="C:/nodejs;${PATH}"

WORKDIR C:/app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]