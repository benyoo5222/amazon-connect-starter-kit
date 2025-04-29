# Amazon Connect Starter Kit

This is a starter kit for building a contact center using Amazon Connect.

## Prerequisites

- Docker
- AWS Account
- Enabled AWS IAM Identity Center
- AWS IAM User in Identity Center with AdministratorAccess + Access to Account
- AWS CLI installed (Version 2.27.2 or higher)
- AWS SAM CLI installed (Version 1.137.1)
- Node.js installed (Version 22.3.0 or higher)
- Python installed (Version 3.12 or higher)
- pnpm installed (Version 9.11.0 or higher)
- LocalStack account - (Hobby plan for personal or Starter plan for business)
- LocalStack CLI installed (Version 4.3.0 or higher)
- LocalStack AWS CLI installed - venv
- LocalStack SAM CLI installed - venv

### AWS CLI Authentication (SSO)

By using SSO, you can avoid having to manage long-term credentials for your AWS account.

For more info, check out the [AWS CLI SSO docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html)

#### Configuring your SSO Profile

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

#### Logging in to an IAM Identity Center Session (AWS CLI SSO)

1. Run `aws sso login --profile <profile-name>` (e.g. `aws sso login --profile <YourName>-<Environment>`)

This will recache your profile's credentials and place them in `~/.aws/sso/cache`

## Setup

For runnning LocalStack, run the following commands:

```sh
localstack auth set-token <YOUR_AUTH_TOKEN>
localstack start -d
```

If you run into issues pulling down the localstack pro image, try running:

```sh
sudo /Applications/Docker.app/Contents/MacOS/install vmnetd
```

Try the `localstack start -d` command again.

## Creating an Amazon Connect Instance (SAM)

> [!IMPORTANT]
> Your user should have the `AmazonConnect_FullAccess` policy to create an Amazon Connect Instance.

> [!NOTE]
> As of 05-25, this CloudFormation Amazon Connect Instance Resource is under preview and can change.

> [!NOTE]
> The `UseCustomTTSVoices` attribute is only for customers who are on the allowed list. Please contact AWS to get access.

> [!NOTE]
> Creating an Amazon Connect Instance is only supported on AWS; LocalStack does not support it yet.

Following parameters are used to create an Amazon Connect Instance:

| Parameter                      | Description                                                                                                     | Type                          | Required                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------- |
| IdentityManagementType         | Specifies whether the instance uses Connect-managed or SAML-based identity management                           | String (CONNECT_MANAGED/SAML) | Optional (Default: CONNECT_MANAGED) |
| InstanceAliasName              | The alias for the Connect instance (must start with a letter/number, can contain letters, numbers, and hyphens) | String                        | Required                            |
| IsAutoResolveBestVoicesEnabled | Enables automatic resolution of best voices for text-to-speech                                                  | Boolean                       | Optional (Default: true)            |
| IsContactflowLogsEnabled       | Enables logging for contact flows                                                                               | Boolean                       | Optional (Default: true)            |
| IsContactLensEnabled           | Enables Amazon Connect Contact Lens features                                                                    | Boolean                       | Optional (Default: true)            |
| IsEarlyMediaEnabled            | Enables early media for calls                                                                                   | Boolean                       | Optional (Default: true)            |
| IsInboundCallsEnabled          | Enables inbound calling capabilities                                                                            | Boolean                       | Optional (Default: true)            |
| IsOutboundCallsEnabled         | Enables outbound calling capabilities                                                                           | Boolean                       | Optional (Default: true)            |
| IsUseCustomTTSVoicesEnabled    | Enables custom text-to-speech voices                                                                            | Boolean                       | Optional (Default: true)            |

Please note that this only supports `CONNECT_MANAGED` or `SAML` for Identity Management Type.
It does not support `Existing Directory`.

## What gets created?

- Amazon Connect Instance
  - Identity Management
  - Voice, Chat, and Tasks enabled
  - For Voice:
    - Inbound and Outbound calls enabled (Unless otherwise specified)
    - Early Media enabled (Unless otherwise specified)
    - Multi-Party Calls and Enhanced Monitoring (Auto-enabled)
  - For Chat:
    - Multi-Party Calls and Enhanced Monitoring (Auto-enabled)
  - Contact Lens enabled (Auto-enabled)
  - Cases enabled (Auto-enabled) But no domain
  - Contact Flow Logs enabled (Unless otherwise specified)
  - Use the best available voices for TTS (Unless otherwise specified)
