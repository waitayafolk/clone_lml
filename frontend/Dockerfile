# build environment
FROM node:13.12.0-alpine as build

RUN mkdir myweb
WORKDIR /myweb

COPY /build /myweb/ 
# RUN npm install
# RUN npm run build
# production environment
FROM nginx:stable-alpine
COPY --from=build /myweb/ /usr/share/nginx/html
EXPOSE 3388
CMD ["nginx", "-g", "daemon off;"]