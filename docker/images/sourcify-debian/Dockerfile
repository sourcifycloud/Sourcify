FROM node:16

ARG sourcify_VERSION

RUN if [ -z "$sourcify_VERSION" ] ; then echo "The sourcify_VERSION argument is missing!" ; exit 1; fi

ENV sourcify_VERSION=${sourcify_VERSION}
RUN \
	apt-get update && \
	apt-get -y install graphicsmagick gosu git

# Set a custom user to not have sourcify run as root
USER root

RUN npm_config_user=root npm install -g npm@8.19.2 full-icu sourcify@${sourcify_VERSION}

ENV NODE_ICU_DATA /usr/local/lib/node_modules/full-icu

WORKDIR /data

COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 5678/tcp
