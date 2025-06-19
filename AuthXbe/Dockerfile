FROM node:18-alpine
COPY package*.json ./home/app
RUN npm install
COPY ./ ./home/app
EXPOSE 3000
CMD ["node", "app.js"]
