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
# CLI Specific Parameters
########################################################
PROFILE=default # Change this to your profile name (SSO)
IS_GUIDED=true # Set to false to disable guided prompts
STACK_NAME=amazon-connect-starter-kit # Change this to your stack name
REGION=us-east-1 # Change this to your region