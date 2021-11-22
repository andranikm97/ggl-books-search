FROM node:14.17.3-buster
WORKDIR /code
ENV REACT_APP_API_KEY=AIzaSyABIKseAUXlbFL9AbC2zmpZSDQu5tO_8gA
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
CMD ["npm", "start"]
