FROM node:lts-slim

WORKDIR /usr/app

COPY package.json ./

RUN npm install

# Copy all project files to container (except those listed in dockerignore)
COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]



