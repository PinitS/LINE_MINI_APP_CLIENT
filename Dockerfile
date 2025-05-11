# DOCKER BUILD REACT
# FROM node:20-alpine as build-stage

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Serve with nginx
# FROM nginx:alpine

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build-stage /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


# USING FILE BUILD IN DOCKER (FAST DEPLOY)
# ===========================
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY build/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# ===========================
# USING FILE BUILD IN DOCKER (FAST DEPLOY)
