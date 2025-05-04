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
CallRecordingsS3BucketPrefix=CallRecordings
ChatTranscriptsS3BucketPrefix=ChatTranscripts
ScheduledReportsS3BucketPrefix=Reports

########################################################
# Connect Stream Configuration Parameters
########################################################
CRStreamRetentionPeriod=24
IsCRStreamServerSideEncryptionEnabled=true
AgentEventStreamRetentionPeriod=24
IsAgentEventStreamServerSideEncryptionEnabled=true

########################################################
# Connect Kinesis Video Stream Configuration Parameters
########################################################
KinesisVideoStreamRetentionPeriod=4 # 0 [No retention] to 87600 [10 years]
KinesisVideoStreamPrefix=customer-audio

########################################################
# Voice ID Configuration Parameters
########################################################
ConnectVoiceIDDomainName=amazon-connect-starter-kit-callers

########################################################
# CLI Specific Parameters
########################################################
PROFILE=default # Change this to your profile name (SSO)
IS_GUIDED=false # Set to true to enable guided prompts
STACK_NAME=amazon-connect-starter-kit # Change this to your stack name
REGION=us-east-1 # Change this to your region
DEBUG_DEPLOYMENT=true # Set to false to disable debug logging
DEBUG_DELETE=true # Set to false to disable debug logging