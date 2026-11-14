#!/usr/bin/env python3
"""DOMINUS: read-only public website quality gate (no credentials, no sales claims)."""
from __future__ import annotations
import json, re, sys, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path
from html.parser import HTMLParser
from xml.etree import ElementTree as ET

BASE = "https://pavelvialiki84-afk.github.io/dominus-vatican-protocol/"
PAGES = ["", "dominus-band1-de.html", "dominus-sample-en.html", "read.html"]
SITEMAP = BASE + "sitemap.xml"

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1=0; self.title=0; self.descriptions=0; self.links=[]; self.lang=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=="html": self.lang=a.get("lang")
        if tag=="h1": self.h1+=1
        if tag=="title": self.title+=1
        if tag=="meta" and a.get("name","").lower()=="description": self.descriptions+=1
        if tag=="a" and a.get("href"): self.links.append(a["href"])

def get(url):
    req=urllib.request.Request(url,headers={"User-Agent":"DOMINUS-ReadOnly-QA/1.0 (+github.com/pavelvialiki84-afk/dominus-vatican-protocol)"})
    with urllib.request.urlopen(req,timeout=18) as resp:
        return resp.status,resp.read(2000000).decode("utf-8","replace")

def audit():
    results=[]; failures=0; sitemap_urls=[]
    try:
        code,body=get(SITEMAP)
        root=ET.fromstring(body)
        sitemap_urls=[(e.text or "").strip() for e in root.iter() if e.tag.endswith("}loc") or e.tag=="loc"]
        sitemap_ok=code==200
    except Exception as e:
        sitemap_ok=False; results.append({"url":SITEMAP,"passed":False,"issues":["sitemap unavailable or not XML: "+str(e)[:100]]}); failures+=1
    for path in PAGES:
        url=BASE+path; issues=[]
        try:
            status,html=get(url)
            p=Page();p.feed(html)
            if status != 200: issues.append("HTTP "+str(status))
            if p.h1 != 1: issues.append("expected exactly one H1, found "+str(p.h1))
            if p.title != 1: issues.append("expected one TITLE")
            if p.descriptions != 1: issues.append("expected one meta description")
            if not p.lang: issues.append("missing HTML lang")
            if not p.links: issues.append("no links")
            if sitemap_ok and url not in sitemap_urls: issues.append("not in sitemap")
            if path=="dominus-band1-de.html" and p.lang!="de": issues.append("German page lang should be de")
            if path=="dominus-sample-en.html" and (p.lang!="en" or len(re.sub(r"<[^>]+>"," ",html).split())<50): issues.append("English book information appears empty")
        except Exception as e:
            issues.append("network/content error: "+str(e)[:120])
        results.append({"url":url,"passed":not issues,"issues":issues})
        failures+=bool(issues)
    return {"timestamp":datetime.now(timezone.utc).isoformat(),"pages":results,"sitemap_ok":sitemap_ok,"failure_count":failures,
      "note":"Read-only site QA; no access to KDP sales, German ASIN, Search Console or paid advertising."}

if __name__=="__main__":
    report=audit()
    target=Path("publishing-engine/reports/site-health-latest.json")
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print(json.dumps(report,ensure_ascii=False,indent=2))
    sys.exit(1 if report["failure_count"] else 0)
