# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /321-project-starter

# Copy the package.json and package-lock.json files to the container
COPY package.json .
COPY package-lock.json .

# Install the dependencies
RUN yarn install

EXPOSE 3000

# Copy the source code to the container
COPY . .

# Start the server when the container starts
CMD ["yarn", "prod"]



