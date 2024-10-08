FROM node:18-alpine

WORKDIR /app

# set current working directory set by workdir

COPY package*.json ./ 

RUN npm install 


# Copy everything from current directory of host machine to docker working container of host 
COPY . .


EXPOSE 8000

ENTRYPOINT [ "node" , "app.js"]