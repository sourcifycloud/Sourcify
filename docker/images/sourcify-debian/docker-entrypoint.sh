#!/bin/sh

if [ -d /root/.sourcify ] ; then
  chmod o+rx /root
  chown -R node /root/.sourcify
  ln -s /root/.sourcify /home/node/
fi

if [ "$#" -gt 0 ]; then
  # Got started with arguments
  exec gosu node "$@"
else
  # Got started without arguments
  exec gosu node sourcify
fi
