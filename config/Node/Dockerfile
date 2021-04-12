# add image digest to the base image name - this ensures that you are getting deterministic Docker image builds from the base image
FROM node:lts-alpine@sha256:bdec2d4aa13450a2e2654e562df1d8a3016b3c4ab390ccd3ed09d861cbdb0d83

# add dumb-init that Snyk uses for PID 1... it is statically linked and has a small footprint
RUN apk add dumb-init

# ..................... own build instructions here....................................
# Clean up APT when done updating
# RUN apt-get update -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# set node environment, either development or production
# defaults to production, compose overrides this to development on build and on run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 for debug (tests)
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# install latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@latest -g


# create user dir
RUN mkdir /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

# copy package.json, install everything + change node_modules ownership and add them to the PATH
COPY --chown=node:node ./package.json ./package-lock.json ./

# Install as if you are building your code for production
RUN npm ci --only=production

# change ownership of the newly installed node_modules folder
RUN chown -R node:node /home/node/app/node_modules
ENV PATH /home/node/app/node_modules/.bin:$PATH

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s CMD node ./healthcheck.js

# copy everything to node folder last as it changes the most
COPY --chown=node:node ./ .

# copy starting script for FILE variables and make it executable
# COPY --chown=node:node ./config/Node/docker-entrypoint.sh /usr/local/bin/
# RUN chmod u+x,g+x /usr/local/bin/docker-entrypoint.sh

# chown for /root folder and /root/.config file for the correct functioning of npm 
RUN chown root:node /root && chmod g+rwx /root && chown -R node:$(id -gn node) /root/.config

# ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]

# run as a non-root user: node
USER node

# CMD ["dumb-init", "node", "bin/www.js"]
