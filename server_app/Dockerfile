
## For the webserver container there is no changes in the configs between dev & prod environment so we defined just one generic file.

# # stage1 as a base layer
FROM node:latest

RUN mkdir /home/app/web

WORKDIR /home/app/web

# copy the package.json to install dependencies
COPY ["package.json", "package-lock.json*", "./"]



# Install the dependencies
RUN npm install

#Copy all the source files of the project
COPY . . 


# # Build the project and copy the files
RUN npm run build
