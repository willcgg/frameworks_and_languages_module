FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY ./ ./
EXPOSE 8001
RUN npm i
CMD ["npm", "start"]