ARG NODE_VERSION=16
FROM sourcifyio/base:${NODE_VERSION}

ARG sourcify_VERSION
RUN if [ -z "$sourcify_VERSION" ] ; then echo "The sourcify_VERSION argument is missing!" ; exit 1; fi

ENV sourcify_VERSION=${sourcify_VERSION}
ENV NODE_ENV=production
RUN set -eux; \
	apkArch="$(apk --print-arch)"; \
	case "$apkArch" in \
	'armv7') apk --no-cache add --virtual build-dependencies python3 build-base;; \
	esac && \
	npm install -g --omit=dev sourcify@${sourcify_VERSION} && \
	case "$apkArch" in \
	'armv7') apk del build-dependencies;; \
	esac && \
	find /usr/local/lib/node_modules/sourcify -type f -name "*.ts" -o -name "*.js.map" -o -name "*.vue" | xargs rm && \
	rm -rf /root/.npm

# Set a custom user to not have sourcify run as root
USER root
WORKDIR /data
RUN apk --no-cache add su-exec
COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
