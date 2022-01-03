FROM node

#app directory 
WORKDIR /server/

#copying app dependencies
COPY package*.json ./
#installing dependencies
run npm install

#bundling source app
COPY . .

#exposing port
EXPOSE 8000

#specifying command to run the docker app
CMD ["node", "server.js"]
