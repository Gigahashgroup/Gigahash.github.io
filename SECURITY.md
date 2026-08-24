# Security at Gigahash Global

Gigahash Global welcomes responsible reports about security issues affecting this public website.

## Reporting a concern

Email `info@gigahashgroup.com` with the subject `Website security report`. Include the affected URL, a clear description, reproduction steps and the potential impact. Do not include unnecessary personal information, credentials or confidential third-party data.

Please do not publicly disclose a suspected vulnerability before Gigahash Global has had a reasonable opportunity to review it. Do not disrupt the website, access information that does not belong to you, submit automated traffic at scale or attempt social engineering.

## Scope

The current scope is the public corporate website at `gigahashgroup.com`. Third-party services, including Formspree and GitHub, should also be reported through their respective security programs when the issue originates in those services.

RewardsPlanet and other future applications may publish separate security policies before they introduce accounts, payments or other application functionality.

## Deployment hardening

This repository is deployed as a static corporate website. Before adding accounts, payments, Rewards functionality, or other transactional services, keep those capabilities in their designated application and place the public website behind a delivery layer that can enforce HTTPS redirects and response headers such as Content-Security-Policy, Permissions-Policy, Referrer-Policy, X-Content-Type-Options, and frame-embedding controls. Do not rely on this website for authentication, payment, account, or private-record handling.
