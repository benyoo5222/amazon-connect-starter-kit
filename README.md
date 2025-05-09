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

## Deploying the CloudFormation stack to AWS

> [!IMPORTANT]
> Your aws user needs to have the `AmazonConnect_FullAccess` policy to create an Amazon Connect Instance.
> To enable `Voice ID`, your aws user needs to have the `AmazonConnectVoiceIDFullAccess` policy.
> To view customer authentication page on the console, check out the [Customer Authentication IAM Policies](https://docs.aws.amazon.com/connect/latest/adminguide/security-iam-amazon-connect-permissions.html#customer-authentication-page) documentation.

> [!IMPORTANT]
> Please look at the [Configuration Parameters](#configuration-parameters) section to set the correct parameters for your deployment.

> [!IMPORTANT]
> Please look at the [AWS CLI Configuration](#aws-cli-configuration) section prior to deploying this template.

> [!NOTE]
> As of 05-25, this CloudFormation Amazon Connect Instance Resource is under preview and can change.

> [!NOTE]
> The `UseCustomTTSVoices` attribute is only for customers who are on the allowed list. Please contact AWS to get access.

> [!NOTE]
> As of 05-25, using Kinesis Firehose as Data Streaming source is not supported through CloudFormation. Use Kinesis Stream instead.

> [!NOTE]
> Creating an Amazon Connect Instance is only supported on AWS; LocalStack does not support it yet.

> [!NOTE]
> This only supports `CONNECT_MANAGED` or `SAML` for Identity Management Type.
> It does not support `Existing Directory`.

First, create an `env.sh` file in the `packages/amazon-connect/scripts/sam` directory.

You can use the `setenv.sh` file as a template to set the correct parameters for your deployment.

From the root of the project, run the following command:

```sh
sh ./packages/amazon-connect/scripts/sam/build-deploy.sh
```

## Deleting the CloudFormation stack

> [!IMPORTANT]
> This will not delete the following resources. Please delete them manually:
>
> - S3 bucket [ConnectStorageBucket]
> - KMS key [ConnectKMSKey]

From the root of the project, run the following command:

```sh
sh ./packages/amazon-connect/scripts/sam/delete-stack.sh
```

This will delete the SAM/CloudFormation stack.

## What gets created?

> [!IMPORTANT]
> Resources are only created in Regions that support Amazon Connect.
> Please check the Mapping section in the Template or go to the [Amazon Connect Regions](https://docs.aws.amazon.com/connect/latest/adminguide/regions.html) page to see which regions support it.

> [!IMPORTANT]
> Kinesis Video Stream is not supported in all Regions.
> Kinesis Video Stream Integration (for Live Media Streaming) is only created in Regions that support both Amazon Connect and Kinesis Video Streams.
> Please check the Mapping section in the Template or go to the [Amazon Kinesis Video Stream Regions](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/availability.html) page to see which regions support it.

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
- S3 Bucket for Amazon Connect Data Storage
- KMS Key for Amazon Connect Data (Encryption and Decryption)
- KMS Key Alias (`alias/{Your Stack Name}/connect/{Environment}`)
- Amazon Connect Instance Storage Configurations
  - Call Recordings
    - Encrypted with KMS Key created by this template
  - Chat Transcripts
    - Encrypted with KMS Key created by this template
  - Scheduled Reports
    - Encrypted with KMS Key created by this template
- Kinesis Stream for Amazon Connect Data (CR and Agent Event)
- Kinesis Firehose for Amazon Connect Data (CR)
- Kinesis Video Stream for Amazon Connect Data
  - Encrypted by KMS Key created by this template
- Voice ID Domain
  - Encrypted by KMS Key created by this template
- Customer Profile Domain
  - Encrypted by KMS Key created by this template
- Connect Q Assistant
  - Encrypted by KMS Key created by this template
- Cognito User Pool
  - Purely Skeleton - Please change for your own use case
- Cognito User Pool Client
  - Purely Skeleton - Please change for your own use case

## Resources/Configurations not created using Cloudformation

- Enabling next generation Connect [Manual]
- Accepting BIPA Consent for Voice ID [Manual]
- Enabling Attachments [API - AssociateInstanceStorageConfig]
- Enabling exporting Screen recordings [API - AssociateInstanceStorageConfig]
- Enabling exporting Contact Evaluations [API - AssociateInstanceStorageConfig]
- Enabling Email by Service Role [Manual - It looks like the ARN format it's looking for is role/service-role/ which is only supported through the console]
- Enabling exporting Email messages [API - AssociateInstanceStorageConfig]
- Associating Email Domain with Connect Instance [API - CreateIntegrationAssociation + SES_IDENTITY]
- Enable Outbound Campaigns V2 [API - StartInstanceOnboardingJob]
- Enable Automated Interaction Logs [Not Supported & Not in Docs but uses UpdateInstanceAttribute API with AUTOMATED_INTERACTION_LOG type]
- Integrating Domain with Voice ID [API - CreateIntegrationAssociation](Use the Domain created in the template)
- Enabling forecasting, capacity planning, and scheduling [Not Supported & Not in Docs but uses UpdateInstanceAttribute API with FORECASTING_PLANNING_SCHEDULING type]
- Associating Customer Profile Domain with Connect Instance [Manual - `It is not possible to associate a Customer Profiles domain with an Amazon Connect Instance directly from the API. If you would like to create a domain and associate a Customer Profiles domain, use the Amazon Connect admin website.`](https://docs.aws.amazon.com/connect/latest/APIReference/API_connect-customer-profiles_CreateDomain.html)
- Integrating with Amazon Connect Q Assistant (Wisdom) with Amazon Connect Instant [API - CreateIntegrationAssociation]
- Creating Amazon Connect Case Domain [API - CreateDomain]
- Associating Case Domain with Connect Instance [API - CreateIntegrationAssociation]
- Associating Customer Authentication [API - CreateIntegrationAssociation + COGNITO_USER_POOL]
- Associating Cognito User Pool with Connect Instance for Customer Authentication [API - CreateIntegrationAssociation + COGNITO_USER_POOL]

## AWS CLI Configuration

This section is for configuring the AWS CLI.

This will allow you to access your AWS resources from the command line.

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

## LocalStack Setup

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

## Configuration Parameters

The following parameters can be configured in `packages/amazon-connect/scripts/sam/env.sh`:

### Connect Instance Parameters

| Parameter                      | Description                                                                                                     | Default Value              | Required |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------- | -------- |
| IdentityManagementType         | Specifies whether the instance uses Connect-managed or SAML-based identity management                           | CONNECT_MANAGED            | Optional |
| InstanceAliasName              | The alias for the Connect instance (must start with a letter/number, can contain letters, numbers, and hyphens) | amazon-connect-starter-kit | Required |
| ENVIRONMENT                    | The deployment environment (e.g., dev, prod)                                                                    | dev                        | Required |
| IsAutoResolveBestVoicesEnabled | Enables automatic resolution of best voices for text-to-speech                                                  | true                       | Optional |
| IsContactflowLogsEnabled       | Enables logging for contact flows                                                                               | true                       | Optional |
| IsContactLensEnabled           | Enables Amazon Connect Contact Lens features                                                                    | true                       | Optional |
| IsEarlyMediaEnabled            | Enables early media for calls                                                                                   | true                       | Optional |
| IsInboundCallsEnabled          | Enables inbound calling capabilities                                                                            | true                       | Optional |
| IsOutboundCallsEnabled         | Enables outbound calling capabilities                                                                           | true                       | Optional |
| IsUseCustomTTSVoicesEnabled    | Enables custom text-to-speech voices                                                                            | true                       | Optional |

### Connect Storage Configuration Parameters

| Parameter                      | Description                                        | Default Value   | Required |
| ------------------------------ | -------------------------------------------------- | --------------- | -------- |
| EnableCallRecordingsStorage    | Whether to store call recordings in S3             | true            | Optional |
| CallRecordingsS3BucketPrefix   | Prefix for the S3 bucket storing call recordings   | CallRecordings  | Optional |
| EnableChatTranscriptsStorage   | Whether to store chat transcripts in S3            | true            | Optional |
| ChatTranscriptsS3BucketPrefix  | Prefix for the S3 bucket storing chat transcripts  | ChatTranscripts | Optional |
| EnableScheduledReportsStorage  | Whether to store scheduled reports in S3           | true            | Optional |
| ScheduledReportsS3BucketPrefix | Prefix for the S3 bucket storing scheduled reports | Reports         | Optional |

### Connect Stream Configuration Parameters

| Parameter                                     | Description                                                                         | Default Value | Required |
| --------------------------------------------- | ----------------------------------------------------------------------------------- | ------------- | -------- |
| EnableContactRecordsStream                    | Whether to enable contact records stream                                            | true          | Optional |
| CRStreamRetentionPeriod                       | The number of hours for the data records to be available in the CR stream.          | 24            | Optional |
| IsCRStreamServerSideEncryptionEnabled         | Whether to enable server-side encryption for the CR stream.                         | true          | Optional |
| EnableAgentEventStream                        | Whether to enable agent event stream                                                | true          | Optional |
| AgentEventStreamRetentionPeriod               | The number of hours for the data records to be available in the Agent Event stream. | 24            | Optional |
| IsAgentEventStreamServerSideEncryptionEnabled | Whether to enable server-side encryption for the Agent Event stream.                | true          | Optional |

### Connect Kinesis Video Stream Configuration Parameters

| Parameter                         | Description                                                                           | Default Value  | Required |
| --------------------------------- | ------------------------------------------------------------------------------------- | -------------- | -------- |
| EnableKinesisVideoStream          | Whether to enable Kinesis video stream                                                | true           | Optional |
| KinesisVideoStreamRetentionPeriod | The number of hours for the data records to be available in the Kinesis Video Stream. | 4              | Optional |
| KinesisVideoStreamPrefix          | The prefix for the Kinesis Video Stream.                                              | customer-audio | Required |

### Connect Voice ID Configuration Parameters

| Parameter                | Description                       | Default Value                      | Required |
| ------------------------ | --------------------------------- | ---------------------------------- | -------- |
| EnableVoiceID            | Whether to enable Voice ID        | true                               | Optional |
| ConnectVoiceIDDomainName | The name for the Voice ID Domain. | amazon-connect-starter-kit-callers | Required |

### Connect Customer Profile Configuration Parameters

| Parameter                                                            | Description                                                                               | Default Value                        | Required |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| EnableCustomerProfile                                                | Whether to enable Customer Profile                                                        | true                                 | Optional |
| UseDeadLetterQueueForCustomerProfile                                 | Whether to use a dead letter queue for the Customer Profile Queue.                        | true                                 | Optional |
| ConnectCustomerProfileDeadLetterQueueMessageRetentionPeriodInSeconds | The number of seconds for the data records to be available in the Customer Profile Queue. | 345600                               | Optional |
| ConnectCustomerProfileDomainName                                     | The name for the Customer Profile Domain.                                                 | amazon-connect-starter-kit-customers | Required |
| ConnectCustomerProfileDataExpirationPeriodInDays                     | The number of days for the data records to be available in the Customer Profile Domain.   | 365                                  | Required |

### Connect Q Configuration Parameters

| Parameter             | Description                           | Default Value                        | Required |
| --------------------- | ------------------------------------- | ------------------------------------ | -------- |
| EnableConnectQ        | Whether to enable Connect Q           | true                                 | Optional |
| ConnectQAssistantName | The name for the Connect Q Assistant. | amazon-connect-starter-kit-assistant | Required |

### Cognito Configuration for Customer Auth Parameters

| Parameter                         | Description                                             | Default Value | Required |
| --------------------------------- | ------------------------------------------------------- | ------------- | -------- |
| EnableCustomerAuth                | Whether to enable Customer Auth                         | true          | Optional |
| CognitoUserPoolTier               | The tier for the Cognito User Pool                      | ESSENTIALS    | Optional |
| CognitoUserPoolDeletionProtection | Whether to enable deletion protection for the User Pool | ACTIVE        | Optional |

### CLI Specific Parameters

| Parameter        | Description                                    | Default Value              | Required |
| ---------------- | ---------------------------------------------- | -------------------------- | -------- |
| PROFILE          | AWS CLI profile name for authentication        | default                    | Required |
| IS_GUIDED        | Whether to use guided deployment mode          | false                      | Required |
| STACK_NAME       | Name of the CloudFormation stack               | amazon-connect-starter-kit | Required |
| REGION           | AWS region for deployment                      | us-east-1                  | Required |
| DEBUG_DEPLOYMENT | Whether to enable debug logging for deployment | true                       | Optional |
| DEBUG_DELETE     | Whether to enable debug logging for deletion   | true                       | Optional |
