# Custom domain activation: dominusbooks.com

## Status
Prepared in a DRAFT pull request. Neither the live GitHub Pages configuration nor DNS at Hostinger has been modified.

## Safe order
1. Review stacked draft PRs and merge them sequentially into the GitHub Pages publishing source when author-approved. This branch includes the root CNAME file, updated canonical/og:url/hreflang/JSON-LD URLs, and refreshed sitemap.xml/robots.txt.
2. GitHub repository Settings → Pages → Custom domain: enter `dominusbooks.com` and save. If GitHub publishes via an Actions workflow, this setting is required and the CNAME file alone does not configure Pages. Consider GitHub custom-domain TXT ownership verification first.
3. Only after GitHub Pages recognizes the domain, open Hostinger Domains → DNS / Nameservers → dominusbooks.com → DNS records. Keep existing nameservers lunar.dns-parking.com and solar.dns-parking.com.
4. Back up existing DNS records. Preserve **MX**, **SPF TXT**, **DKIM**, **DMARC**, other email/verification TXT/CNAME records unchanged. Remove only root parking A entries or website-related conflicts.
5. Create four apex A records, each name `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. Use Hostinger's default TTL.
6. Create `www` CNAME target `pavelvialiki84-afk.github.io` (no scheme, path, or repo suffix). Remove conflicting `www` records only.
7. Wait for DNS check and certificate issuance. In GitHub Settings → Pages enable `Enforce HTTPS` when available (can take 24 hours).
8. Test `https://dominusbooks.com/`, `https://www.dominusbooks.com/`, the eight languages, images, social links, `/robots.txt`, `/sitemap.xml`, and one inbound email to each of the four aliases and the principal contact mailbox.
9. In Google Search Console add and verify the new domain property and submit `https://dominusbooks.com/sitemap.xml`. Historical site property can remain for monitoring migration.

Do not change nameservers or overwrite the full DNS zone. Do not activate the domain in DNS before GitHub Pages accepts it. If GitHub Pages custom-domain ownership verification is required, copy exactly the TXT value GitHub supplies, rather than inventing one.

GitHub authoritative instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Hostinger DNS instructions: https://www.hostinger.com/support/1583249-how-to-manage-dns-records-at-hostinger/
