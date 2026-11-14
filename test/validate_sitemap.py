#!/usr/bin/env python3
"""Validate multilingual sitemap and canonical page declarations."""
from pathlib import Path
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

ROOT = "https://pavelvialiki84-afk.github.io/dominus-vatican-protocol/"
PAGES = {"en":("index.html",ROOT),
         "de":("dominus-band1-de.html",ROOT+"dominus-band1-de.html"),
         "fr":("dominus-volume1-fr.html",ROOT+"dominus-volume1-fr.html")}
NS={"s":"http://www.sitemaps.org/schemas/sitemap/0.9",
    "x":"http://www.w3.org/1999/xhtml"}
class HeadLinks(HTMLParser):
    def __init__(self):
        super().__init__();self.links=[]
    def handle_starttag(self,tag,attrs):
        if tag=="link":self.links.append(dict(attrs))

root=ET.parse("sitemap.xml").getroot()
entries=root.findall("s:url",NS)
found={entry.findtext("s:loc",namespaces=NS):entry for entry in entries}
assert len(found)==len(entries),"duplicate sitemap URLs"
for language,(filename,url) in PAGES.items():
    assert url in found,f"URL missing from sitemap: {url}"
    entry=found[url]
    hrefs={(alt.attrib.get("hreflang"),alt.attrib.get("href")) for alt in entry.findall("x:link",NS)}
    expected={(lang,langurl) for lang,(_,langurl) in PAGES.items()} | {("x-default",ROOT)}
    assert expected==hrefs,f"Missing/mismatched hreflang links in sitemap for {language}"
    parser=HeadLinks();parser.feed(Path(filename).read_text(encoding="utf-8"))
    canonical=[a.get("href") for a in parser.links if a.get("rel")=="canonical"]
    assert canonical==[url],f"{filename}: incorrect canonical"
    alternates={(a.get("hreflang"),a.get("href")) for a in parser.links if a.get("rel")=="alternate"}
    assert alternates==expected,f"{filename}: hreflang links differ from sitemap"
print("PASS: XML valid; 3 canonicals and 12 reciprocal hreflang links confirmed.")
