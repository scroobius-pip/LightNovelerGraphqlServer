FROM node:boron-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV SERVER_PORT 8080 
EXPOSE 8080
# CMD ["npm","run build"]
# CMD [ "npm","start"]
CMD npm run build && npm start