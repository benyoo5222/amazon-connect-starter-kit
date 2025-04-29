#! /bin/bash

# Get the absolute path to the workspace root
WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../" && pwd)"
echo "Workspace root: $WORKSPACE_ROOT"

# Source the environment file using absolute path
. "$WORKSPACE_ROOT/packages/amazon-connect/scripts/sam/env.sh"

echo "Building the SAM template for the Connect Instance"
########################################################
# Build the SAM template for the Connect Instance
# Note: No parameter overrides at the build step. Only
#       done at the deploy step.
########################################################
sam build \
    --template-file "$WORKSPACE_ROOT/packages/amazon-connect/amazon-connect-instance-template.yml" \
    --profile $PROFILE


echo "Deploying the SAM template for the Connect Instance"
########################################################
# Deploy the SAM template for the Connect Instance
# Note: Sam Deploy automatically uses the template
#       built in the build step. (.aws-sam/build/template.yaml)
########################################################
sam deploy \
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
    --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
    --profile $PROFILE