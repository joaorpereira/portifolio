#!/usr/bin/env bash
# Deploy Astro static build to S3 and invalidate CloudFront.
#
# Option A — discovery from CloudFormation stack outputs:
#   CFN_STACK_NAME=joao-portfolio-site ./infra/deploy.sh
#
# Option B — explicit IDs (e.g. CI secrets):
#   S3_BUCKET=my-bucket CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC ./infra/deploy.sh
#
# Optional: AWS_PROFILE=myprofile

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "$REPO_ROOT"

if [[ -f "${REPO_ROOT}/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "${REPO_ROOT}/.env"
  set +a
fi

STACK_NAME="${CFN_STACK_NAME:-joao-portfolio-site}"
AWS_CLI=(aws)
if [[ -n "${AWS_PROFILE:-}" ]]; then
  AWS_CLI+=(--profile "${AWS_PROFILE}")
fi

if [[ -n "${S3_BUCKET:-}" && -n "${CLOUDFRONT_DISTRIBUTION_ID:-}" ]]; then
  BUCKET="${S3_BUCKET}"
  DIST_ID="${CLOUDFRONT_DISTRIBUTION_ID}"
else
  echo "Reading outputs from CloudFormation stack: ${STACK_NAME}"
  BUCKET="$("${AWS_CLI[@]}" cloudformation describe-stacks --stack-name "${STACK_NAME}" \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' --output text)"
  DIST_ID="$("${AWS_CLI[@]}" cloudformation describe-stacks --stack-name "${STACK_NAME}" \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' --output text)"
  if [[ -z "${BUCKET}" || "${BUCKET}" == "None" ]]; then
    echo "error: Could not read BucketName from stack ${STACK_NAME}. Set S3_BUCKET or create the stack." >&2
    exit 1
  fi
  if [[ -z "${DIST_ID}" || "${DIST_ID}" == "None" ]]; then
    echo "error: Could not read DistributionId from stack ${STACK_NAME}. Set CLOUDFRONT_DISTRIBUTION_ID." >&2
    exit 1
  fi
fi

echo "Building..."
npm run build

echo "Syncing dist/ to s3://${BUCKET}/ ..."
"${AWS_CLI[@]}" s3 sync ./dist "s3://${BUCKET}/" --delete

echo "Invalidating CloudFront (${DIST_ID})..."
"${AWS_CLI[@]}" cloudfront create-invalidation --distribution-id "${DIST_ID}" --paths '/*'

echo "Done. Propagation may take a few minutes."
