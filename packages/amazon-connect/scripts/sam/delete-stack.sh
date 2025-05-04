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

echo "Deleting the SAM/CloudFormation stack for the Connect Template"

$SAM_CMD delete \
    --stack-name $STACK_NAME \
    --region $REGION \
    --no-prompts \
    $([ "$DEBUG_DELETE" = "true" ] && echo "--debug") \
    --profile $PROFILE

echo "Deleted the SAM/CloudFormation stack for the Connect Template"
