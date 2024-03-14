# Use an official Node.js runtime as a parent image
FROM node:20
# Set the working directory to /app
WORKDIR /app
# Copy the content of the local src directory to the working directory
COPY . .
# Install any needed packages specified in package.json
RUN npm i
# Expose the port that your app will run on
EXPOSE 3000
# Define environment variable(s), if needed
# ENV NODE_ENV=production
# Command to run your application
CMD ["node", "app.js"]
