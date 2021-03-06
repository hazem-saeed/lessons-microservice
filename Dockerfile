FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --chown=node:node . package*.json ./
RUN npm ci --only=production
USER node
CMD ["node", "server.js"]