# First stage: Build the Angular app
FROM node:16-alpine AS builder
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files and build the app
COPY . .
RUN npm run build --prod

# Second stage: Serve the built app with an Nginx web server
FROM nginx:alpine
# Copy built files from the builder stage
COPY --from=builder /app/dist/angular-app /usr/share/nginx/html
# Expose port 80 for HTTP
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
