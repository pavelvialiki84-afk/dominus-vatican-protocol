#!/usr/bin/env python3
"""DOMINUS release control: audits *public metadata only*, never publishes books.

Run: python3 scripts/publishing_audit.py
Outputs generated-publishing/release-board.md and .csv.
No accounts, network or credentials needed.
"""
import csv
import json
from collections import Counter
from datetime import date
from pathlib import Path

SOURCE = Path("publishing-engine/catalogue.json")
OUTPUT = Path("generated-publishing")
FORMATS = ("kindle", "paperback", "hardcover")
ALLOWED = {"LIVE", "IN_REVIEW", "NOT_CREATED", "NOT_VERIFIED", "DRAFT", "BLOCKED", "REJECTED"}
LANGS = {"en", "de", "fr", "it", "es", "pt-BR", "nl", "pl"}

def audit(data):
    problems, entries, ids = [], [], set()
    editions = data.get("editions", [])
    if len(editions) != 16:
        problems.append(f"Expected exactly 16 language x volume records, got {len(editions)}")
    for item in editions:
        ident, lang, vol = item.get("id"), item.get("language"), item.get("volume")
        if ident in ids:
            problems.append(f"Duplicate ID: {ident}")
        ids.add(ident)
        if lang not in LANGS or vol not in (1, 2) or ident != f"{lang}-{vol}":
            problems.append(f"Unknown language / volume or invalid ID: {ident}")
        if not item.get("series") or (vol == 1 and not item.get("volume_title")):
            problems.append(f"Missing title/series: {ident}")
        kdp = item.get("kdp", {})
        for fmt in FORMATS:
            state = kdp.get(fmt)
            if state not in ALLOWED:
                problems.append(f"{ident}/{fmt} invalid KDP status {state!r}")
            asin = kdp.get("asins", {}).get(fmt)
            if state == "LIVE" and (not asin or len(asin) != 10):
                problems.append(f"{ident}/{fmt} LIVE without a valid 10-character ASIN")
            if state != "LIVE" and asin:
                problems.append(f"{ident}/{fmt} ASIN is recorded but KDP state is {state}; verify")
            entries.append({"id": ident, "language": lang, "volume": vol, "format": fmt, "kdp": state,
                            "asin": asin or "", "editorial_gate": item.get("editorial_gate", ""),
                            "technical_gate": item.get("technical_gate", ""),
                            "author_approval": bool(item.get("author_release_approval")),
                            "evidence": item.get("evidence", "")})
        if item.get("editorial_gate") == "HOLD_CHRONOLOGY_RECONCILIATION" and item.get("author_release_approval"):
            problems.append(f"{ident} author release approval inconsistent with chronology HOLD")
        if item.get("author_release_approval") and (item.get("editorial_gate") != "PASSED" or item.get("technical_gate") != "PASSED"):
            problems.append(f"{ident} approved without two PASSED QA gates")
    return problems, entries

def main():
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    problems, entries = audit(data)
    counters = Counter(row["kdp"] for row in entries if row["volume"] == 1 and row["language"] in ("en", "de", "fr"))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with (OUTPUT / "editions.csv").open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(entries[0]))
        writer.writeheader()
        writer.writerows(entries)
    report = [
        "# DOMINUS — publication readiness board",
        "",
        f"Registry source date: {data.get('as_of')}; generated: {date.today().isoformat()}",
        "",
        "## Verified KDP Book I EN/DE/FR snapshot",
        "",
        f"**{counters['LIVE']} live · {counters['IN_REVIEW']} in review · {counters['NOT_CREATED']} not created** (9 book/format slots).",
        "",
        "These states are **historical snapshot metadata**, not a live KDP synchronization.",
        "",
        "## Publishing gates",
        "",
        "| Edition | Story / translation | Production | Author approved | Kindle | Paperback | Hardcover |",
        "|---|---|---|---|---|---|---|",
    ]
    for item in data["editions"]:
        k = item["kdp"]
        report.append(f"| {item['id']} | {item['editorial_gate']} | {item['technical_gate']} | {'YES' if item['author_release_approval'] else 'NO'} | {k['kindle']} | {k['paperback']} | {k['hardcover']} |")
    report += [
        "", "## Editorial stop", "",
        data.get("editorial_stop", "None"), "",
        "**This workflow deliberately cannot upload to KDP, submit books, spend on ads or override rights approvals.**",
        "", "## Validation", "",
        f"{len(problems)} registry errors." if problems else "PASS: metadata schema and approval gates coherent.",
    ]
    report += [f"- {item}" for item in problems]
    (OUTPUT / "release-board.md").write_text("\n".join(report) + "\n", encoding="utf-8")
    print("\n".join(report[:14]))
    if problems:
        raise SystemExit(1)

if __name__ == "__main__":
    main()
