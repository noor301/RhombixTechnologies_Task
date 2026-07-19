# Backend container for Google Cloud Run
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Cloud Run injects PORT (defaults to 8080). server.js already reads
# process.env.PORT, so nothing else to configure here.
ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "server.js"]
