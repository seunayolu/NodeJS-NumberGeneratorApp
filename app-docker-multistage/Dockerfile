# Stage 1: Build Stage
FROM node:22-alpine AS build

# Set working directory in the build stage
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Stage 2: Runtime Stage
FROM node:22-alpine

# Set working directory in the runtime stage
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Expose the application's port
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]