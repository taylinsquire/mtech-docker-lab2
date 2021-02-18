FROM node

EXPOSE 8080
ENV PORT=8080

LABEL maintainer="Taylin Squire"
LABEL description="A simple user manager"
LABEL cohort="11"
LABEL animal="Lynx"

WORKDIR /app
COPY . .

RUN npm install
CMD [ "npm", "start" ]