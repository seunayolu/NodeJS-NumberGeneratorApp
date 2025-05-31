# Use the official Node.js image
FROM node:23-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]