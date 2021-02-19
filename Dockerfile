FROM node:14

WORKDIR /home/node/app

CMD ["npm", "start"]

COPY package*.json ./
RUN npm install
COPY . .
# VOLUME for timelapse images
VOLUME ./snapshots:./snapshots
