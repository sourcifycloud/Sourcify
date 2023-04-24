#!/bin/sh

if [ -d /root/.sourcify ] ; then
  chmod o+rx /root
  chown -R node /root/.sourcify
  ln -s /root/.sourcify /home/node/
fi

chown -R node /home/node

if [ "$#" -gt 0 ]; then
  # Got started with arguments
  exec su-exec node "$@"
else
  # Got started without arguments
  exec su-exec node sourcify
fi
