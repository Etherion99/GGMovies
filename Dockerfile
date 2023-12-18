# Node image
FROM node:14

# setting the workdir
WORKDIR /app

# Install Meteor
RUN curl https://install.meteor.com/ | sh

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./


# Install dependencies
# RUN meteor npm install

# Copy all files
COPY . .

RUN chown -R node:node /app/.meteor

# Make port 3000 available
EXPOSE 3000

# Run app
CMD ["npm", "run", "docker:run"]
