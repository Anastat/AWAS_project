FROM node:10.15.0-alpine
EXPOSE 3000

WORKDIR /home/app

COPY . /home/app/

RUN npm ci

CMD ["npm", "run", "docker"]