#!/usr/bin/env python3
"""Generate canonical DOMINUS organic campaign URLs. No tracking/network requests.
Usage: python3 marketing/revenue-ops/utm_links.py threads latin_hook_en_v01 read
"""
import argparse
import re
from urllib.parse import urlencode

SOURCE_MEDIUM = {
    "instagram": "organic_social", "facebook": "organic_social",
    "threads": "organic_social", "pinterest": "organic_social",
    "tiktok": "organic_video", "youtube": "organic_video",
    "substack": "newsletter", "reddit": "community",
    "goodreads": "referral",
}
LANDINGS = {
    "read": "https://dominusbooks.com/read.html",
    "dossier": "https://dominusbooks.com/dossier.html",
    "editions": "https://dominusbooks.com/editions.html",
    "witness": "https://dominusbooks.com/can-a-machine-speak-for-a-witness.html",
    "archive": "https://dominusbooks.com/why-archives-are-not-neutral.html",
    "de": "https://dominusbooks.com/dominus-band1-de.html",
    "fr": "https://dominusbooks.com/dominus-volume1-fr.html",
    "it": "https://dominusbooks.com/dominus-volume1-it.html",
    "es": "https://dominusbooks.com/dominus-volumen1-es.html",
}
def make_link(source: str, creative: str, landing: str) -> str:
    if source not in SOURCE_MEDIUM or landing not in LANDINGS:
        raise ValueError("Unsupported platform or landing")
    if not re.fullmatch(r"[a-z0-9]+(?:_[a-z0-9]+)*", creative):
        raise ValueError("Creative ID must be lowercase snake_case alphanumeric")
    return LANDINGS[landing] + "?" + urlencode({
        "utm_source": source,
        "utm_medium": SOURCE_MEDIUM[source],
        "utm_campaign": "schism_launch_2026q4",
        "utm_content": creative
    })
if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("source", choices=SOURCE_MEDIUM)
    p.add_argument("creative_id")
    p.add_argument("landing", choices=LANDINGS)
    args = p.parse_args()
    print(make_link(args.source, args.creative_id, args.landing))
