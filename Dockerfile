# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /321-project-starter

# Copy the package.json and package-lock.json files to the container
COPY package.json .
COPY package-lock.json .

# Install the dependencies
RUN npm install


# Copy the source code to the container
COPY app.js .
COPY server/api.js server/
COPY server/database.js server/
COPY server/websocketserver.js server/
COPY client/index.html client/
COPY client/index.js client/
COPY client/style.css client/

# Start the server when the container starts
CMD ["node", "app.js"]
