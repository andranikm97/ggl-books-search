FROM node:14.17.3-buster as build
WORKDIR /code
ENV REACT_APP_API_KEY=AIzaSyABIKseAUXlbFL9AbC2zmpZSDQu5tO_8gA
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --production
COPY . .
RUN npm run build
FROM nginx:1.12-alpine as prod
COPY --from=build /code/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]