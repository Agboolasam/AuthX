FROM node:18-alpine
WORKDIR /home/app
COPY ./ ./home/app
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
