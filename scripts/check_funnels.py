#!/usr/bin/env python3
"""DOMINUS static funnel contract checks; no network access or dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = {
    "index.html": ("en", "www.amazon.com"),
    "dominus-band1-de.html": ("de", "www.amazon.de"),
    "dominus-volume1-fr.html": ("fr", "www.amazon.fr"),
    "dominus-volume1-it.html": ("it", "www.amazon.it"),
    "dominus-volumen1-es.html": ("es", "www.amazon.es"),
}
class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = None
        self.canonical = []
        self.links = []
        self.scripts = []
        self.images = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        if tag == "link" and a.get("rel") == "canonical": self.canonical.append(a.get("href"))
        if tag == "a": self.links.append(a.get("href", ""))
        if tag == "script" and a.get("src"): self.scripts.append(a["src"])
        if tag == "img": self.images.append(a.get("src", ""))

errors = []
for filename, (lang, marketplace) in PAGES.items():
    path = ROOT / filename
    if not path.is_file():
        errors.append(f"{filename}: missing")
        continue
    parser = Audit()
    parser.feed(path.read_text(encoding="utf-8"))
    if parser.lang != lang: errors.append(f"{filename}: expected lang={lang}, got {parser.lang}")
    expected = "https://dominusbooks.com/" + ("" if filename == "index.html" else filename)
    if parser.canonical != [expected]: errors.append(f"{filename}: canonical mismatch: {parser.canonical}")
    if "assets/analytics.js" not in parser.scripts: errors.append(f"{filename}: analytics script missing")
    amazon = [urlparse(h) for h in parser.links if "amazon." in h]
    if not amazon: errors.append(f"{filename}: missing Amazon CTA")
    for link in amazon:
        if link.hostname != marketplace or not re.fullmatch(r"/dp/[A-Z0-9]{10}", link.path):
            errors.append(f"{filename}: invalid marketplace/ASIN link {link.geturl()}")
    for img in parser.images:
        if not img or urlparse(img).scheme: continue
        if not (ROOT / img.split("?")[0].lstrip("/")).is_file():
            errors.append(f"{filename}: missing local image {img}")
    print(f"{filename}: {len(amazon)} Amazon links, {len(parser.images)} images, canonical {expected}")
if (ROOT / "CNAME").read_text(encoding="utf-8").strip() != "dominusbooks.com":
    errors.append("CNAME: incorrect domain")
if errors:
    print("FAIL:\n" + "\n".join(errors), file=sys.stderr)
    sys.exit(1)
print("PASS: static funnel contracts. This does NOT verify production uptime, tracking delivery or sales.")
