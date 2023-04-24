# Contributing to sourcify

Great that you are here and you want to contribute to sourcify

## Contents

- [Contributing to sourcify](#contributing-to-sourcify)
  - [Contents](#contents)
  - [Code of conduct](#code-of-conduct)
  - [Directory structure](#directory-structure)
  - [Development setup](#development-setup)
    - [Requirements](#requirements)
      - [Node.js](#nodejs)
      - [pnpm](#pnpm)
        - [pnpm workspaces](#pnpm-workspaces)
      - [corepack](#corepack)
      - [Build tools](#build-tools)
    - [Actual sourcify setup](#actual-sourcify-setup)
    - [Start](#start)
  - [Development cycle](#development-cycle)
    - [Test suite](#test-suite)
  - [Releasing](#releasing)
  - [Create custom nodes](#create-custom-nodes)
  - [Extend documentation](#extend-documentation)
  - [Contributor License Agreement](#contributor-license-agreement)

## Code of conduct

This project and everyone participating in it are governed by the Code of
Conduct which can be found in the file [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report
unacceptable behavior to Parsa@Sourcify.cloud.

## Directory structure

sourcify is split up in different modules which are all in a single mono repository.

The most important directories:

- [/docker/image](/docker/images) - Dockerfiles to create sourcify containers
- [/docker/compose](/docker/compose) - Examples Docker Setups
- [/packages](/packages) - The different sourcify modules
- [/packages/cli](/packages/cli) - CLI code to run front- & backend
- [/packages/core](/packages/core) - Core code which handles workflow
  execution, active webhooks and
  workflows. **Contact sourcify before
  starting on any changes here**
- [/packages/design-system](/packages/design-system) - Vue frontend components
- [/packages/editor-ui](/packages/editor-ui) - Vue frontend workflow editor
- [/packages/node-dev](/packages/node-dev) - CLI to create new sourcify-nodes
- [/packages/nodes-base](/packages/nodes-base) - Base sourcify nodes
- [/packages/workflow](/packages/workflow) - Workflow code with interfaces which
  get used by front- & backend

## Development setup

If you want to change or extend sourcify you have to make sure that all needed
dependencies are installed and the packages get linked correctly. Here a short guide on how that can be done:

### Requirements

#### Node.js

[Node.js](https://nodejs.org/en/) version 16.9 or newer is required for development purposes.

#### pnpm

[pnpm](https://pnpm.io/) version 7.18 or newer is required for development purposes. We recommend installing it with [corepack](#corepack).

##### pnpm workspaces

sourcify is split up in different modules which are all in a single mono repository.
To facilitate the module management, [pnpm workspaces](https://pnpm.io/workspaces) are used.
This automatically sets up file-links between modules which depend on each other.

#### corepack

We recommend enabling [Node.js corepack](https://nodejs.org/docs/latest-v16.x/api/corepack.html) with `corepack enable`.

With Node.js v16.17 or newer, you can install the latest version of pnpm: `corepack prepare pnpm@latest --activate`. If you use an older version install at least version 7.18 of pnpm via: `corepack prepare pnpm@7.18.0 --activate`.

**IMPORTANT**: If you have installed Node.js via homebrew, you'll need to run `brew install corepack`, since homebrew explicitly removes `npm` and `corepack` from [the `node` formula](https://github.com/Homebrew/homebrew-core/blob/master/Formula/node.rb#L66).

**IMPORTANT**: If you are on windows, you'd need to run `corepack enable` and `corepack prepare pnpm --activate` in a terminal as an administrator.

#### Build tools

The packages which sourcify uses depend on a few build tools:

Debian/Ubuntu:

```
apt-get install -y build-essential python
```

CentOS:

```
yum install gcc gcc-c++ make
```

Windows:

```
npm add -g windows-build-tools
```

MacOS:

No additional packages required.

### Actual sourcify setup

> **IMPORTANT**: All the steps below have to get executed at least once to get the development setup up and running!

Now that everything sourcify requires to run is installed the actual sourcify code can be
checked out and set up:

1. [Fork](https://guides.github.com/activities/forking/#fork) the sourcify repository

2. Clone your forked repository

   ```
   git clone https://github.com/<your_github_username>/sourcify.git
   ```

3. Go into repository folder

   ```
   cd sourcify
   ```

4. Add the original sourcify repository as `upstream` to your forked repository

   ```
   git remote add upstream https://github.com/sourcifycloud/sourcify.git
   ```

5. Install all dependencies of all modules and link them together:

   ```
   pnpm install
   ```

6. Build all the code:
   ```
   pnpm build
   ```

### Start

To start sourcify execute:

```
pnpm start
```

To start sourcify with tunnel:

```
./packages/cli/bin/sourcify start --tunnel
```

## Development cycle

While iterating on sourcify modules code, you can run `pnpm dev`. It will then
automatically build your code, restart the backend and refresh the frontend
(editor-ui) on every change you make.

1. Start sourcify in development mode:
   ```
   pnpm dev
   ```
1. Hack, hack, hack
1. Check if everything still runs in production mode
   ```
   pnpm build
   pnpm start
   ```
1. Create tests
1. Run all [tests](#test-suite)
   ```
   pnpm test
   ```
1. Commit code and [create a pull request](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

### Test suite

The tests can be started via:

```
pnpm test
```

If that gets executed in one of the package folders it will only run the tests
of this package. If it gets executed in the sourcify-root folder it will run all
tests of all packages.

## Releasing

To start a release, trigger [this workflow](https://github.com/sourcifycloud/sourcify/actions/workflows/release-create-pr.yml) with the SemVer release type, and select a branch to cut this release from. This workflow will then

1. Bump versions of packages that have changed or have dependencies that have changed
2. Update the Changelog
3. Create a new branch called `release/${VERSION}`, and
4. Create a new pull-request to track any further changes that need to be included in this release

Once ready to release, simply merge the pull-request.
This triggers [another workflow](https://github.com/sourcifycloud/sourcify/actions/workflows/release-publish.yml), that will

1. Build and publish the packages that have a new version in this release
2. Create a new tag, and GitHub release from squashed release commit
3. Merge the squashed release commit back into `master`

## Create custom nodes

Learn about [building nodes](https://docs.Sourcify.cloud/integrations/creating-nodes/) to create custom nodes for sourcify. You can create community nodes and make them available using [npm](https://www.npmjs.com/).

## Extend documentation

The repository for the sourcify documentation on [docs.Sourcify.cloud](https://docs.Sourcify.cloud) can be found [here](https://github.com/sourcifycloud/sourcify-docs).

## Contributor License Agreement

That we do not have any potential problems later it is sadly necessary to sign a [Contributor License Agreement](CONTRIBUTOR_LICENSE_AGREEMENT.md). That can be done literally with the push of a button.

We used the most simple one that exists. It is from [Indie Open Source](https://indieopensource.com/forms/cla) which uses plain English and is literally only a few lines long.

A bot will automatically comment on the pull request once it got opened asking for the agreement to be signed. Before it did not get signed it is sadly not possible to merge it in.
