FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
# RUN apt-get update && apt-get upgrade -y && \
#     apt-get install -y nodejs \
#     npm                       
CMD ["npm","start"]