# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV WORKOUTPAL_MONGO_URI="mongodb+srv://WorkoutPal:WorkoutPalPass@cluster0.yqtdrwy.mongodb.net/WorkoutPal?retryWrites=true&w=majority"
ENV TEST_MONGO_URI="mongodb+srv://WorkoutPal:WorkoutPalPass@cluster0.yqtdrwy.mongodb.net/test?retryWrites=true&w=majority"
ENV RAPIDAPI_KEY="e8e3fb66cbmshaef5afed116ccb9p1e2143jsnfc512be1f6bb"
ENV DB_NAME="WorkoutPal"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json ./
RUN npm install --production=false

# Copy application code
COPY . .

# Copy only necessary files to the final image
FROM base

# Copy node modules and built files from build stage
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]