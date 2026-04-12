# AWS static hosting (S3 + CloudFront)

Minimal **CloudFormation** stack: private **S3** bucket + **CloudFront** with **Origin Access Control** (OAC). No public bucket ACLs; objects are only readable through CloudFront.

## Prerequisites

- AWS account, [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) configured (`aws configure` or `AWS_PROFILE`).
- **Globally unique** S3 bucket name (see parameter below).

## Create the stack

From the repo root:

```bash
aws cloudformation deploy \
  --stack-name joao-portfolio-site \
  --template-file infra/cloudformation/static-site.yaml \
  --parameter-overrides SiteBucketName=YOUR-UNIQUE-BUCKET-NAME
```

Replace `YOUR-UNIQUE-BUCKET-NAME` with a name you own (e.g. `joaorpereira-portfolio-prod`).

After deploy, note **Outputs** (bucket name, distribution ID, `SiteURL`).

## Deploy site files

The script **sources a repo-root `.env`** if present (same file Astro uses for `PUBLIC_*` at build time). You can also set variables in the shell.

```bash
chmod +x infra/deploy.sh
CFN_STACK_NAME=joao-portfolio-site ./infra/deploy.sh
```

Optional in `.env` or the environment:

- `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID` — skip CloudFormation lookup when set.
- `AWS_PROFILE` — AWS CLI profile.

Or pass IDs explicitly:

```bash
S3_BUCKET=your-bucket CLOUDFRONT_DISTRIBUTION_ID=E1234567890ABC ./infra/deploy.sh
```

This runs `npm run build`, `aws s3 sync ./dist` with `--delete`, and invalidates `/*` on CloudFront.

## Custom domain (optional, manual next steps)

1. Request an **ACM certificate in `us-east-1`** (required for CloudFront) for `example.com` and `www.example.com`.
2. Update the distribution in the console (or extend the template) with **Aliases** + **ACM certificate ARN**.
3. In **Route 53** (or your DNS provider), create **A/AAAA alias** records to the distribution.

## Security notes

- Bucket **Block Public Access** stays on; access is **only** via CloudFront using the bucket policy + OAC.
- **Static** HTML is still world-readable once deployed; client-side “gates” do not hide content from someone who downloads objects or reads the bucket if misconfigured. Keep real secrets off the site.

## Costs

S3 storage/requests, CloudFront data transfer, and invalidations beyond the free tier. **PriceClass_100** limits edge locations to reduce cost.
