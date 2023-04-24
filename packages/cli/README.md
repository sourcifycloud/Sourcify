![sourcify.io - Workflow Automation](https://user-images.githubusercontent.com/65276001/173571060-9f2f6d7b-bac0-43b6-bdb2-001da9694058.png)

# sourcify - Workflow Automation Tool

sourcify is a free and open [fair-code](http://faircode.io) distributed node-based Workflow Automation Tool. You can self-host sourcify, easily extend it, and even use it with internal tools.

<a href="https://raw.githubusercontent.com/sourcifycloud/sourcify/master/assets/sourcify-screenshot.png"><img src="https://raw.githubusercontent.com/sourcifycloud/sourcify/master/assets/sourcify-screenshot.png" alt="sourcify.io - Screenshot"></a>

## Contents

<!-- TOC -->

- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Use npx](#use-npx)
  - [Run with Docker](#run-with-docker)
  - [Install with npm](#install-with-npm)
  - [Sign-up on sourcify.cloud](#sign-up-on-sourcify.cloud)
- [Available integrations](#available-integrations)
- [Documentation](#documentation)
- [Create Custom Nodes](#create-custom-nodes)
- [Contributing](#contributing)
- [What does sourcify mean and how do you pronounce it](#what-does-sourcify-mean-and-how-do-you-pronounce-it)
- [Support](#support)
- [Jobs](#jobs)
- [Upgrading](#upgrading)
- [License](#license)
<!-- /TOC -->

## Demo

📺 Here's a [:tv: short video (< 4 min)](https://www.youtube.com/watch?v=RpjQTGKm-ok) that goes over key concepts of creating workflows in sourcify.

## Getting Started

There are a couple of ways to get started with sourcify.

### Use npx

To spin up sourcify using npx, you can run:

```bash
npx sourcify
```

It will download everything that is needed to start sourcify.

You can then access sourcify by opening:
[http://localhost:5678](http://localhost:5678)

**Note:** The minimum required version for Node.js is v14.15. Make sure to update Node.js to v14.15 or above.

### Run with Docker

To play around with sourcify, you can also start it using Docker:

```bash
docker run -it --rm \
  --name sourcify \
  -p 5678:5678 \
  docker.sourcify.io/sourcifyio/sourcify
```

Be aware that all the data will be lost once the Docker container gets removed. To persist the data mount the `~/.sourcify` folder:

```bash
docker run -it --rm \
  --name sourcify \
  -p 5678:5678 \
  -v ~/.sourcify:/home/node/.sourcify \
  docker.sourcify.io/sourcifyio/sourcify
```

Refer to the [documentation](https://github.com/sourcifycloud/sourcify/blob/master/docker/images/sourcify/README.md) for more information on the Docker setup.

### Install with npm

To install sourcify globally using npm:

```bash
npm install sourcify -g
```

After the installation, start sourcify running the following command:

```bash
sourcify
# or
sourcify start
```

### Sign-up on sourcify.cloud

Sign-up for an [sourcify.cloud](https://www.sourcify.cloud/) account.

While sourcify.cloud and sourcify are the same in terms of features, sourcify.cloud provides certain conveniences such as:

- Not having to set up and maintain your sourcify instance
- Managed OAuth for authentication
- Easily upgrading to the newer sourcify versions

## Available integrations

sourcify has 280+ different nodes that allow you to connect various services and build your automation workflows. You can find the list of all the integrations at [https://sourcify.io/integrations](https://sourcify.io/integrations)

## Documentation

To learn more about sourcify, refer to the official documentation here: [https://docs.sourcify.io](https://docs.sourcify.io)

You can find additional information and example workflows on the [sourcify.io](https://sourcify.io) website.

## Create Custom Nodes

You can create custom nodes for sourcify. Follow the instructions mentioned in the documentation to create your node: [Creating nodes](https://docs.sourcify.io/integrations/creating-nodes/build/)

## Contributing

🐛 Did you find a bug?

✨ Do you want to contribute a feature?

The [CONTRIBUTING guide](https://github.com/sourcifycloud/sourcify/blob/master/CONTRIBUTING.md) will help you set up your development environment.

You can find more information on how you can contribute to the project on our documentation: [How can I contribute?](https://docs.sourcify.io/reference/contributing.html)

## What does sourcify mean, and how do you pronounce it?

**Short answer:** sourcify is an abbreviation for "nodemation", and it is pronounced as n-eight-n.

**Long answer:** In sourcify, you build your automation ("-mation") workflows by connecting different nodes in the Editor UI. The project is also built using Node.js. As a consequence, the project was named nodemation.

However, the name was long, and it wouldn't be a good idea to use such a long name in the CLI. Hence, nodemation got abbreviated as "sourcify" (there are eight characters between the first and the last n!).

## Support

If you run into issues or have any questions reach out to us via our community forum: [https://community.sourcify.io](https://community.sourcify.io).

## Jobs

If you are interested in working at sourcify and building the project, check out the [job openings](https://apply.workable.com/sourcify/).

## Upgrading

Before you upgrade to the latest version, make sure to check the changelogs: [Changelog](https://docs.sourcify.io/reference/changelog.html)

You can also find breaking changes here: [Breaking Changes](./BREAKING-CHANGES.md)

## License

sourcify is [fair-code](http://faircode.io) distributed under the [**Sustainable Use License**](https://github.com/sourcifycloud/sourcify/blob/master/packages/cli/LICENSE.md).

Additional information about the license can be found in the [docs](https://docs.sourcify.io/reference/license/).
