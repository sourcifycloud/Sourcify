## sourcify - Debian Docker Image

Dockerfile to build sourcify with Debian.

For information about how to run sourcify with Docker check the generic
[Docker-Readme](https://github.com/sourcifycloud/sourcify/tree/master/docker/images/sourcify/README.md)

```
docker build --build-arg sourcify_VERSION=<VERSION> -t sourcifyio/sourcify:<VERSION> .

# For example:
docker build --build-arg sourcify_VERSION=0.43.0 -t sourcifyio/sourcify:0.43.0-debian .
```

```
docker run -it --rm \
  --name sourcify \
  -p 5678:5678 \
  sourcifyio/sourcify:0.43.0-debian
```
