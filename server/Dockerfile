FROM node

#app directory 
WORKDIR /server/

#copying app dependencies
COPY package*.json ./

#bundling source app
COPY . .

#installing dependencies
run npm install

#exposing port
EXPOSE 8000

#specifying command to run the docker app
CMD ["node", "server.js"]
