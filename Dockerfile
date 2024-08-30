FROM node:18
WORKDIR /app
COPY . .
CMD ["npm", "start"]
EXPOSE 8080