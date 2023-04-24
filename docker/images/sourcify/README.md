![sourcify.io - Workflow Automation](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

# sourcify - Workflow automation tool

sourcify is an extendable workflow automation tool. With a [fair-code](http://faircode.io) distribution model, sourcify will always have visible source code, be available to self-host, and allow you to add your own custom functions, logic and apps. sourcify's node-based approach makes it highly versatile, enabling you to connect anything to everything.

<a href="https://raw.githubusercontent.com/sourcifycloud/sourcify/master/assets/sourcify-screenshot.png"><img src="https://raw.githubusercontent.com/sourcifycloud/sourcify/master/assets/sourcify-screenshot.png" alt="sourcify.io - Screenshot"></a>

## Contents

- [Demo](#demo)
- [Available integrations](#available-integrations)
- [Documentation](#documentation)
- [Start sourcify in Docker](#start-sourcify-in-docker)
- [Start with tunnel](#start-with-tunnel)
- [Securing sourcify](#securing-sourcify)
- [Persist data](#persist-data)
- [Passing Sensitive Data via File](#passing-sensitive-data-via-file)
- [Updating a Running docker-compose Instance](#updating-a-running-docker-compose-instance)
- [Example Setup with Lets Encrypt](#example-setup-with-lets-encrypt)
- [What does sourcify mean and how do you pronounce it](#what-does-sourcify-mean-and-how-do-you-pronounce-it)
- [Support](#support)
- [Jobs](#jobs)
- [Upgrading](#upgrading)
- [License](#license)

## Demo

[:tv: A short video (< 4 min)](https://www.youtube.com/watch?v=RpjQTGKm-ok) that goes over key concepts of creating workflows in sourcify.

## Available integrations

sourcify has 200+ different nodes to automate workflows. The list can be found on: [https://sourcify.io/nodes](https://sourcify.io/nodes)

## Documentation

The official sourcify documentation can be found under: [https://docs.sourcify.io](https://docs.sourcify.io)

Additional information and example workflows on the sourcify.io website: [https://sourcify.io](https://sourcify.io)

## Start sourcify in Docker

```bash
docker run -it --rm \
 --name sourcify \
 -p 5678:5678 \
 -v ~/.sourcify:/home/node/.sourcify \
 docker.sourcify.io/sourcifyio/sourcify
```

You can then access sourcify by opening:
[http://localhost:5678](http://localhost:5678)

## Start with tunnel

> **WARNING**: This is only meant for local development and testing. Should not be used in production!

To be able to use webhooks which all triggers of external services like Github
rely on sourcify has to be reachable from the web. To make that easy sourcify has a
special tunnel service (uses this code: [https://github.com/localtunnel/localtunnel](https://github.com/localtunnel/localtunnel)) which redirects requests from our servers to your local
sourcify instance.

To use it simply start sourcify with `--tunnel`

```bash
docker run -it --rm \
 --name sourcify \
 -p 5678:5678 \
 -v ~/.sourcify:/home/node/.sourcify \
 docker.sourcify.io/sourcifyio/sourcify \
 sourcify start --tunnel
```

## Securing sourcify

By default sourcify can be accessed by everybody. This is OK if you have it only running
locally but if you deploy it on a server which is accessible from the web you have
to make sure that sourcify is protected!
Right now we have very basic protection via basic-auth in place. It can be activated
by setting the following environment variables:

```text
sourcify_BASIC_AUTH_ACTIVE=true
sourcify_BASIC_AUTH_USER=<USER>
sourcify_BASIC_AUTH_PASSWORD=<PASSWORD>
```

## Persist data

The workflow data gets by default saved in an SQLite database in the user
folder (`/home/node/.sourcify`). That folder also additionally contains the
settings like webhook URL and encryption key.

```bash
docker run -it --rm \
 --name sourcify \
 -p 5678:5678 \
 -v ~/.sourcify:/home/node/.sourcify \
 docker.sourcify.io/sourcifyio/sourcify
```

### Start with other Database

By default sourcify uses SQLite to save credentials, past executions and workflows.
sourcify however also supports PostgresDB, MySQL and MariaDB. To use them simply a few
environment variables have to be set.

It is important to still persist the data in the `/root/.sourcify` folder. The reason
is that it contains sourcify user data. That is the name of the webhook
(in case) the sourcify tunnel gets used and even more important the encryption key
for the credentials. If none gets found sourcify creates automatically one on
startup. In case credentials are already saved with a different encryption key
it can not be used anymore as encrypting it is not possible anymore.

#### Use with PostgresDB

Replace the following placeholders with the actual data:

- POSTGRES_DATABASE
- POSTGRES_HOST
- POSTGRES_PASSWORD
- POSTGRES_PORT
- POSTGRES_USER
- POSTGRES_SCHEMA

```bash
docker run -it --rm \
 --name sourcify \
 -p 5678:5678 \
 -e DB_TYPE=postgresdb \
 -e DB_POSTGRESDB_DATABASE=<POSTGRES_DATABASE> \
 -e DB_POSTGRESDB_HOST=<POSTGRES_HOST> \
 -e DB_POSTGRESDB_PORT=<POSTGRES_PORT> \
 -e DB_POSTGRESDB_USER=<POSTGRES_USER> \
 -e DB_POSTGRESDB_SCHEMA=<POSTGRES_SCHEMA> \
 -e DB_POSTGRESDB_PASSWORD=<POSTGRES_PASSWORD> \
 -v ~/.sourcify:/home/node/.sourcify \
 docker.sourcify.io/sourcifyio/sourcify \
 sourcify start
```

A full working setup with docker-compose can be found [here](https://github.com/sourcifycloud/sourcify/blob/master/docker/compose/withPostgres/README.md)

#### Use with MySQL

Replace the following placeholders with the actual data:

- MYSQLDB_DATABASE
- MYSQLDB_HOST
- MYSQLDB_PASSWORD
- MYSQLDB_PORT
- MYSQLDB_USER

```bash
docker run -it --rm \
 --name sourcify \
 -p 5678:5678 \
 -e DB_TYPE=mysqldb \
 -e DB_MYSQLDB_DATABASE=<MYSQLDB_DATABASE> \
 -e DB_MYSQLDB_HOST=<MYSQLDB_HOST> \
 -e DB_MYSQLDB_PORT=<MYSQLDB_PORT> \
 -e DB_MYSQLDB_USER=<MYSQLDB_USER> \
 -e DB_MYSQLDB_PASSWORD=<MYSQLDB_PASSWORD> \
 -v ~/.sourcify:/home/node/.sourcify \
 docker.sourcify.io/sourcifyio/sourcify \
 sourcify start
```

## Passing Sensitive Data via File

To avoid passing sensitive information via environment variables "\_FILE" may be
appended to some environment variables. It will then load the data from a file
with the given name. That makes it possible to load data easily from
Docker- and Kubernetes-Secrets.

The following environment variables support file input:

- DB_POSTGRESDB_DATABASE_FILE
- DB_POSTGRESDB_HOST_FILE
- DB_POSTGRESDB_PASSWORD_FILE
- DB_POSTGRESDB_PORT_FILE
- DB_POSTGRESDB_USER_FILE
- DB_POSTGRESDB_SCHEMA_FILE
- sourcify_BASIC_AUTH_PASSWORD_FILE
- sourcify_BASIC_AUTH_USER_FILE

## Example Setup with Lets Encrypt

A basic step by step example setup of sourcify with docker-compose and Lets Encrypt is available on the
[Server Setup](https://docs.sourcify.io/#/server-setup) page.

## Updating a running docker-compose instance

1. Pull the latest version from the registry

    `docker pull docker.sourcify.io/sourcifyio/sourcify`

2. Stop the current setup

    `sudo docker-compose stop`

3. Delete it (will only delete the docker-containers, data is stored separately)

    `sudo docker-compose rm`

4. Then start it again

    `sudo docker-compose up -d`

## Setting Timezone

To define the timezone sourcify should use, the environment variable `GENERIC_TIMEZONE` can
be set. This gets used by for example the Cron-Node.
Apart from that can also the timezone of the system be set separately. Which controls what
some scripts and commands return like `$ date`. The system timezone can be set via
the environment variable `TZ`.

Example to use the same timezone for both:

```bash
docker run -it --rm \
 --name sourcify \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="Europe/Berlin" \
 -e TZ="Europe/Berlin" \
 docker.sourcify.io/sourcifyio/sourcify
```

## Build Docker-Image

```bash
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 --build-arg sourcify_VERSION=<VERSION> -t sourcify:<VERSION> .

# For example:
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 --build-arg sourcify_VERSION=0.114.0 -t sourcify:0.114.0 .
```

## What does sourcify mean and how do you pronounce it?

**Short answer:** It means "nodemation" and it is pronounced as n-eight-n.

**Long answer:** I get that question quite often (more often than I expected)
so I decided it is probably best to answer it here. While looking for a
good name for the project with a free domain I realized very quickly that all the
good ones I could think of were already taken. So, in the end, I chose
nodemation. "node-" in the sense that it uses a Node-View and that it uses
Node.js and "-mation" for "automation" which is what the project is supposed to help with.
However, I did not like how long the name was and I could not imagine writing
something that long every time in the CLI. That is when I then ended up on
"sourcify". Sure does not work perfectly but does neither for Kubernetes (k8s) and
did not hear anybody complain there. So I guess it should be ok.

## Support

If you have problems or questions go to our forum, we will then try to help you asap:

[https://community.sourcify.io](https://community.sourcify.io)

## Jobs

If you are interested in working for sourcify and so shape the future of the project
check out our [job posts](https://apply.workable.com/sourcify/)

## Upgrading

Before you upgrade to the latest version make sure to check here if there are any breaking changes which concern you:
[Breaking Changes](https://github.com/sourcifycloud/sourcify/blob/master/packages/cli/BREAKING-CHANGES.md)

## License

sourcify is [fair-code](http://faircode.io) distributed under the [**Sustainable Use License**](https://github.com/sourcifycloud/sourcify/blob/master/packages/cli/LICENSE.md).

Additional information about the license can be found in the [docs](https://docs.sourcify.io/reference/license/).
