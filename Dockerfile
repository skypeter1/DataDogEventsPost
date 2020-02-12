FROM node

# ARG VERSION=1.0.0
ENV NODE_ENV dev
WORKDIR /usr/src/app

# Define API KEY as Enviroment variables
ENV DATADOG_APIKEY=607cb962dc483d8989f499dafbe1c54d
ENV DATADOG_APPLICATION_KEY=185dfd7b51e745382fed7f7ba682c9ab75e7e828

# Add files to the directory
ADD router ./router 
ADD tests ./tests
ADD app.js ./app.js
ADD package.json ./package.json

EXPOSE 80
RUN npm install 

CMD ["npm","start"]