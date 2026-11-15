# DOMINUS marketing preparation — approval-gated packet preview

This addition prepares marketing outputs. It does not deliver or publish them.
No existing site pages, prices, store records, social queue entries or newsletter
accounts are changed. The initial packets.json is empty by design.

## Local use

Run from repository root:

```sh
python3 -m unittest discover -s test -p 'test_marketing_packets.py' -v
python3 scripts/marketing_packets.py
```

Review generated-marketing/archivum-preview.html and readiness.json.
The Actions workflow uploads those as review artifacts only. Its UTC Monday
07:15 schedule is 08:15 in Berlin in winter, 09:15 in summer; it is not the
author's separate Monday 09:00 report. It sends no email and commits no files.
GitHub schedule execution can be delayed; a PR does not activate the scheduled
job until it is merged into the default branch.

## Packet contract

Every packet has exactly: id, language, title, body, publish_at, fiction,
approval. Languages: en, de, it, fr, es, pt-BR, nl, pl. Use ISO timestamps with
explicit offsets. fiction must be true. An absent approval holds a packet.

After actual author approval of a specific version, an operator records:
approved_by = Pavel Velichii; approved_at = actual ISO timestamp;
channels = [website]; sha256 = digest(packet).

The digest covers the ID, language, title, body, publication time and fiction
flag. Any change invalidates it. Approval metadata is an audit assertion by a
trusted repository maintainer, NOT cryptographic identity verification. Protect
the default branch and use the author review process before merging. Do not
invent approval dates or approve on the author's behalf.

Content in public repository branches and PRs is publicly readable, including
unapproved packets. Keep unpublished manuscripts, personal contact information
and private campaign drafts outside the repository. Add only text cleared for
public storage. Publication approval and public-storage permission are distinct.

## Editorial controls

Checks cover schema, duplicate IDs, timestamp awareness, explicit approval,
version integrity, selected privacy/canon terms, and safe HTML output.
Regex checks are limited and cannot verify plot accuracy, rights, factual
claims, all languages, legal duties, or every personal detail. Human review is
required. Raw HTML in packet text is rendered as text, never executed.

## Remaining integrations

- The website delivery step still requires an approved integration and merge.
- Instagram/Metricool delivery requires separate approved copy, licensed media
  and verified account connection. A website approval never authorizes it.
- Newsletter delivery requires a configured sender, consent, working unsubscribe
  and policy pages, tested forms and separately approved messages.
- No API keys are required by this workflow. Do not add secrets to packets.json.
- No paid tool subscription is introduced. Actual GitHub quota/billing depends
  on account settings and must be checked before enabling paid usage.

## Manual fallback: 15-minute review

Check store status changes (3 min); inspect existing social queue (4 min);
read readiness output (3 min); approve or hold one prepared item (3 min);
record blockers and known spend (2 min). This is a planning estimate, not a
measured time saving. Real editorial work may take longer.
