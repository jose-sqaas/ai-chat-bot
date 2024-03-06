FROM node:16.14.2-alpine AS node

# Build
FROM node AS build

WORKDIR /app       
RUN apk add --no-cache bash
COPY package*.json ./ 
RUN npm i               
COPY . .                
RUN npm run build    
EXPOSE 9000

# Run Build
FROM node AS run

RUN apk --no-cache -U upgrade
RUN mkdir -p /home/node/app/build && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node

COPY --chown=node:node package.json ./package.json
COPY --chown=node:node CHECKS ./CHECKS
COPY --chown=node:node --from=build /app/build ./build
COPY --chown=node:node --from=build /app/node_modules ./node_modules
EXPOSE 9000

CMD [ "npm", "start" ]
