FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY routes/ ./routes/
COPY models/ ./models/
COPY *.js ./
EXPOSE 3000
CMD ["node", "start"]
