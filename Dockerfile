# Dockerfile

# Pulling image
FROM node:12
# Set up work dir
WORKDIR /app
# Copy application data
COPY . /app
# Install global depencies, project depencies and pm2 globally,
RUN npm install
RUN npm install pm2 -g
RUN npm run install:all

# Running all tests (regenerating snapshots)
RUN cd client && npm run test -- -u
RUN cd client && npm run stylelint
RUN cd server && npm run test -- -u

# Building client app
RUN npm run build

# Exposing application ports
EXPOSE 8439
EXPOSE 4789

# Executing
CMD ["pm2-runtime", "./process.yml"]
