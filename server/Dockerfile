FROM alpine

#app directory 
WORKDIR /app/

#copying and installing app dependencies
COPY openapi.yml .
COPY package*.json ./

RUN npm install

#bundling source app
COPY . .

#exposing port
EXPOSE 8000

#specifying command to run the docker app
CMD ["node", "server.js"]
