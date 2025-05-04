#! /bin/bash

# Get the absolute path to the workspace root
WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../" && pwd)"
echo "Workspace root: $WORKSPACE_ROOT"

# environment variables file using absolute path
. "$WORKSPACE_ROOT/packages/amazon-connect/scripts/sam/env.sh"

# Set SAM command based on environment
if [ "$ENVIRONMENT" = "local" ]; then
    SAM_CMD="samlocal"
else
    SAM_CMD="sam"
fi

echo "Building the SAM template for the Connect Instance"
########################################################
# Build the SAM template for the Connect Instance
# Note: No parameter overrides at the build step. Only
#       done at the deploy step.
########################################################
$SAM_CMD build \
    --template-file "$WORKSPACE_ROOT/packages/amazon-connect/amazon-connect-instance-template.yml" \
    --profile $PROFILE


echo "Deploying the SAM template for the Connect Instance"
########################################################
# Deploy the SAM template for the Connect Instance
# Note: Sam Deploy automatically uses the template
#       built in the build step. (.aws-sam/build/template.yaml)
########################################################
$SAM_CMD deploy \
    $([ "$IS_GUIDED" = "true" ] && echo "--guided") \
    --stack-name $STACK_NAME \
    --region $REGION \
    --parameter-overrides \
        IdentityManagementType=$IdentityManagementType \
        InstanceAliasName=$InstanceAliasName \
        IsAutoResolveBestVoicesEnabled=$IsAutoResolveBestVoicesEnabled \
        IsContactflowLogsEnabled=$IsContactflowLogsEnabled \
        IsContactLensEnabled=$IsContactLensEnabled \
        IsEarlyMediaEnabled=$IsEarlyMediaEnabled \
        IsInboundCallsEnabled=$IsInboundCallsEnabled \
        IsOutboundCallsEnabled=$IsOutboundCallsEnabled \
        IsUseCustomTTSVoicesEnabled=$IsUseCustomTTSVoicesEnabled \
        Environment=$ENVIRONMENT \
        CallRecordingsS3BucketPrefix=$CallRecordingsS3BucketPrefix \
        ChatTranscriptsS3BucketPrefix=$ChatTranscriptsS3BucketPrefix \
        ScheduledReportsS3BucketPrefix=$ScheduledReportsS3BucketPrefix \
        CRStreamRetentionPeriod=$CRStreamRetentionPeriod \
        IsCRStreamServerSideEncryptionEnabled=$IsCRStreamServerSideEncryptionEnabled \
        AgentEventStreamRetentionPeriod=$AgentEventStreamRetentionPeriod \
        IsAgentEventStreamServerSideEncryptionEnabled=$IsAgentEventStreamServerSideEncryptionEnabled \
        KinesisVideoStreamRetentionPeriod=$KinesisVideoStreamRetentionPeriod \
        KinesisVideoStreamPrefix=$KinesisVideoStreamPrefix \
        ConnectVoiceIDDomainName=$ConnectVoiceIDDomainName \
        UseDeadLetterQueueForCustomerProfile=$UseDeadLetterQueueForCustomerProfile \
        ConnectCustomerProfileDeadLetterQueueMessageRetentionPeriodInSeconds=$ConnectCustomerProfileDeadLetterQueueMessageRetentionPeriodInSeconds \
        ConnectCustomerProfileDomainName=$ConnectCustomerProfileDomainName \
        ConnectCustomerProfileDataExpirationPeriodInDays=$ConnectCustomerProfileDataExpirationPeriodInDays \
        ConnectQAssistantName=$ConnectQAssistantName \
    --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM \
    $([ "$DEBUG_DEPLOYMENT" = "true" ] && echo "--debug") \
    --profile $PROFILE