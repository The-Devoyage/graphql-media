FROM node:16.13.0
ARG GITHUB_TOKEN
WORKDIR /app
COPY package*.json ./
COPY .npmrc .npmrc
COPY media_config.json media_config.json
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "dev" ]
