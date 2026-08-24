# Corporate Website Launch Checklist

Use this checklist immediately before approving a production release of the Gigahash Global corporate website.

## Owner decisions

- The canonical public domain is `https://gigahashgroup.com`. The `CNAME` file, canonical URLs, Open Graph URLs, structured data, `robots.txt`, and `sitemap.xml` use this address. Keep `www.gigahashgroup.com` redirecting to the apex domain.
- Obtain legal approval for the current privacy policy and terms before launch.
- Confirm that the corporate website remains separate from Gigahash Rewards. Do not add account creation, authentication, balances, campaigns, marketplace, checkout, payment, order, seller, or contributor workflows here.

## Production verification

- Confirm the Formspree recipient, spam controls, retention settings, and a non-sensitive test submission.
- Place the public site behind a delivery layer that enforces HTTPS redirects and security headers, including Content-Security-Policy, Permissions-Policy, Referrer-Policy, X-Content-Type-Options, and frame-embedding protection.
- Verify that `www.gigahashgroup.com` redirects consistently to `gigahashgroup.com`.
- Test the homepage, all division pages, both inquiry forms, the thank-you page, the 404 page, and the digital contact cards on desktop and mobile devices.
- Review all public statements, partnerships, certifications, inventory, delivery commitments, and investment claims against approved owner decisions before publishing.

## Verification record

- On August 24, 2026, public checks confirmed HTTPS for `gigahashgroup.com` and a `301` redirect from `www.gigahashgroup.com` to the apex domain.
- The current GitHub Pages response does not provide server-enforced security headers. The page-level Content Security Policy and referrer policy remain useful defense in depth, but they do not replace a managed delivery layer.
- The public Formspree endpoint responds to a no-data request. Recipient routing, spam settings, retention, and an end-to-end test remain restricted to the authorized Formspree administrator; do not verify them with sensitive information.

## Release gate

- Ensure the `Static site security` workflow passes on the exact commit proposed for release.
- Do not publish until an owner approves the release and the production verification items above are complete.
