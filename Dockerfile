# flight-status-frontend/Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Install serve to serve the build
RUN npm install -g serve

# Command to run the app
CMD ["serve", "-s", "build"]
