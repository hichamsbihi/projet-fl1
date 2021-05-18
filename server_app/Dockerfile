
## For the webserver container there is no changes in the configs between dev & prod environment so we defined just one generic file.

# # stage1 as a base layer
FROM node:14

# Create app directory inside the container
WORKDIR /home/app/web



# copy the package.json to install dependencies
COPY ["package.json", "package-lock.json*", "./"]



# Install the dependencies
RUN npm install

RUN npm install -g nodemon
# If we are building the code for production
# RUN npm ci --only=production

#Copy all the source files of the project into the container
COPY . . 



RUN node src/app/esm.js