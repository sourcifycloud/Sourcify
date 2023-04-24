FROM richxsl/rhel7

ARG sourcify_VERSION

RUN if [ -z "$sourcify_VERSION" ] ; then echo "The sourcify_VERSION argument is missing!" ; exit 1; fi

ENV sourcify_VERSION=${sourcify_VERSION}
RUN \
	yum install -y gcc-c++ make

RUN \
	curl -sL https://rpm.nodesource.com/setup_12.x | sudo -E bash -

RUN \
	sudo yum install nodejs

# Set a custom user to not have sourcify run as root
USER root

RUN npm_config_user=root npm install -g npm@8.19.2 sourcify@${sourcify_VERSION}

WORKDIR /data

CMD "sourcify"
