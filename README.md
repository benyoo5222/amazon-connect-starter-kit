# Amazon Connect Starter Kit

This is a starter kit for building a contact center using Amazon Connect.

## Prerequisites

- AWS Account
- Enabled AWS IAM Identity Center
- AWS IAM User in Identity Center with AdministratorAccess + Access to Account
- AWS CLI installed (Version 2.27.2 or higher)
- Node.js installed (Version 22.3.0 or higher)
- pnpm installed (Version 9.11.0 or higher)
- LocalStack

## AWS CLI Authentication (SSO)

By using SSO, you can avoid having to manage long-term credentials for your AWS account.

For more info, check out the [AWS CLI SSO docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html)

### Configuring your SSO Profile

1. Run `aws configure sso`
2. Enter a session name (e.g. `AmazonConnectStarterKit-<Environment>`)
3. Enter the SSO Start URL (e.g. `https://d-906766655d.awsapps.com/start/#`)
4. Enter the SSO Region (e.g. `us-east-1`)
5. Enter the SSO Registration Scope (Press Enter for `sso:account:access`)
6. Select the AWS account attached to the user
7. Select the appropriate role from the list (e.g. `AdministratorAccess`)
8. Enter the Default Client Region (e.g. `us-east-1`)
9. Enter the Default Output Format (Press enter for `json`)
10. Enter a profile name (e.g. `<YourName>-<Environment>`)

You can check your configuration by running `aws configure list` or looking at the `~/.aws/config` file

### Logging in to an IAM Identity Center Session (AWS CLI SSO)

1. Run `aws sso login --profile <profile-name>` (e.g. `aws sso login --profile <YourName>-<Environment>`)

This will recache your profile's credentials and place them in `~/.aws/sso/cache`

## Setup

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turborepo.com/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
