########################################################
# Connect Instance Parameters
########################################################
IdentityManagementType=CONNECT_MANAGED
InstanceAliasName=amazon-connect-starter-kit
IsAutoResolveBestVoicesEnabled=true
IsContactflowLogsEnabled=true
IsContactLensEnabled=true
IsEarlyMediaEnabled=true
IsInboundCallsEnabled=true
IsOutboundCallsEnabled=true
IsUseCustomTTSVoicesEnabled=true
ENVIRONMENT=dev # dev, prod, etc. But local means localstack

########################################################
# Connect Storage Configuration Parameters
########################################################
EnableCallRecordingsStorage=true # When true, the call recordings are stored in S3  
CallRecordingsS3BucketPrefix=CallRecordings
EnableChatTranscriptsStorage=true # When true, the chat transcripts are stored in S3
ChatTranscriptsS3BucketPrefix=ChatTranscripts
EnableScheduledReportsStorage=true # When true, the scheduled reports are stored in S3
ScheduledReportsS3BucketPrefix=Reports

########################################################
# Connect Stream Configuration Parameters
########################################################
EnableContactRecordsStream=true # When true, the contact records are stored in Kinesis
CRStreamRetentionPeriod=24
IsCRStreamServerSideEncryptionEnabled=true
EnableAgentEventStream=true # When true, the agent event stream is enabled
AgentEventStreamRetentionPeriod=24
IsAgentEventStreamServerSideEncryptionEnabled=true

########################################################
# Connect Kinesis Video Stream Configuration Parameters
########################################################
EnableKinesisVideoStream=true # When true, the Kinesis video stream is enabled with Amazon Connect
KinesisVideoStreamRetentionPeriod=4 # 0 [No retention] to 87600 [10 years]
KinesisVideoStreamPrefix=customer-audio

########################################################
# Voice ID Configuration Parameters
########################################################
EnableVoiceID=true # When true, the Voice ID is enabled with Amazon Connect
ConnectVoiceIDDomainName=amazon-connect-starter-kit-callers

########################################################
# Customer Profile Configuration Parameters
########################################################
EnableCustomerProfile=true # Only creates the Customer Profile domain for now
UseDeadLetterQueueForCustomerProfile=true # When true, the dead letter queue is used for the customer profile
ConnectCustomerProfileDeadLetterQueueMessageRetentionPeriodInSeconds=345600 # 4 days (1 minute to 14 days)
ConnectCustomerProfileDomainName=amazon-connect-starter-kit-customers
ConnectCustomerProfileDataExpirationPeriodInDays=365 # 1 year (1 day to 1098 days)

########################################################
# Amazon Connect Q Configuration Parameters
########################################################
EnableConnectQ=true # Only creates the Connect Q Assistant for now
ConnectQAssistantName=amazon-connect-starter-kit-assistant

########################################################
# Cognito Configuration for Customer Auth Parameters
########################################################
EnableCustomerAuth=true # Only creates the Cognito user pool for now
CognitoUserPoolTier=ESSENTIALS # LITE, ESSENTIALS, PLUS
CognitoUserPoolDeletionProtection=ACTIVE # ACTIVE, INACTIVE

########################################################
# CLI Specific Parameters
########################################################
PROFILE=default # Change this to your profile name (SSO)
IS_GUIDED=false # Set to true to enable guided prompts
STACK_NAME=amazon-connect-starter-kit # Change this to your stack name
REGION=us-east-1 # Change this to your region
DEBUG_DEPLOYMENT=true # Set to false to disable debug logging
DEBUG_DELETE=true # Set to false to disable debug logging