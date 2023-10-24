# syntax=docker/dockerfile:1.4

FROM node:lts-buster-slim AS development
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci


COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM development as dev-envs
RUN apt-get update \
    && apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m server && \
    groupadd docker && \
    usermod -aG docker server

COPY --from=gloursdocker/docker / /
CMD ["npm", "run", "dev"]