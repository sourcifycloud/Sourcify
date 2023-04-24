## Build Docker-Image

```
docker build --build-arg sourcify_VERSION=<VERSION> -t sourcifyio/sourcify:<VERSION> .

# For example:
docker build --build-arg sourcify_VERSION=0.36.1 -t sourcifyio/sourcify:0.36.1-rhel7 .
```

```
docker run -it --rm \
  --name sourcify \
  -p 5678:5678 \
  sourcifyio/sourcify:0.25.0-ubuntu
```
