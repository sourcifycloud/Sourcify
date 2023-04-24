# sourcify - Custom Image

Dockerfile which allows to package up the local sourcify code into
a docker image.

## Usage

Execute the following in the sourcify root folder:

```bash
docker build -t sourcify-custom -f docker/images/sourcify-custom/Dockerfile .
```
