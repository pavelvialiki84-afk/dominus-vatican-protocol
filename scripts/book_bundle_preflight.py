#!/usr/bin/env python3
"""Private local DOMINUS preflight. Does NOT upload manuscripts anywhere.

Usage:
python3 scripts/book_bundle_preflight.py --locale it --volume 1 \
  --epub /private/IT1.epub --reading-pdf /private/IT1-reading.pdf \
  --interior-pdf /private/IT1-interior.pdf --cover-pdf /private/IT1-cover.pdf \
  --publisher-copy /private/IT1-blurb.txt --output /private/IT1-audit.json

Validates structure only; no literary certification, KDP submission or cloud upload.
"""
import argparse
import hashlib
import json
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

XMLNS = {"opf": "http://www.idpf.org/2007/opf", "dc": "http://purl.org/dc/elements/1.1/"}
EXPECTED = {"en", "de", "it", "fr", "es", "pt-BR", "nl", "pl"}

def signature(path, header):
    with path.open("rb") as fh:
        return fh.read(len(header)) == header

def analyze_epub(path, expected_lang, findings):
    details = {}
    if not zipfile.is_zipfile(path):
        findings.append("ERROR: EPUB is not a ZIP archive")
        return details
    with zipfile.ZipFile(path) as z:
        errors = z.testzip()
        if errors:
            findings.append(f"ERROR: corrupt EPUB member {errors}")
        names = z.namelist()
        if not names or names[0] != "mimetype" or z.read("mimetype").strip() != b"application/epub+zip":
            findings.append("ERROR: EPUB mimetype must be first and correct")
        elif z.getinfo("mimetype").compress_type != zipfile.ZIP_STORED:
            findings.append("ERROR: EPUB mimetype must not be compressed")
        try:
            container = ET.fromstring(z.read("META-INF/container.xml"))
            rootfile = container.find(".//{urn:oasis:names:tc:opendocument:xmlns:container}rootfile")
            opf_name = rootfile.attrib["full-path"]
            opf = ET.fromstring(z.read(opf_name))
        except (KeyError, ValueError, ET.ParseError, AttributeError) as exc:
            findings.append(f"ERROR: Cannot parse OPF/container: {exc}")
            return details
        langs = [n.text for n in opf.findall(".//dc:language", XMLNS) if n.text]
        titles = [n.text for n in opf.findall(".//dc:title", XMLNS) if n.text]
        creators = [n.text for n in opf.findall(".//dc:creator", XMLNS) if n.text]
        details.update({"languages": langs, "titles": titles, "creators": creators, "epub_members": len(names)})
        match = expected_lang == "pt-BR" and any(x.lower() in ("pt-br", "pt") for x in langs)
        if not (match or any(x.lower().split("-")[0] == expected_lang.lower().split("-")[0] for x in langs)):
            findings.append(f"ERROR: EPUB languages {langs} do not match {expected_lang}")
        if expected_lang == "pt-BR" and not any(x.lower() == "pt-br" for x in langs):
            findings.append("WARN: Brazilian edition should explicitly use pt-BR language metadata")
        if not titles:
            findings.append("ERROR: EPUB missing dc:title")
        if not any("Pavel Velichii" in c for c in creators):
            findings.append("WARN: EPUB dc:creator differs from expected Pavel Velichii")
        opf_prefix = str(Path(opf_name).parent)
        for elem in opf.findall(".//opf:item", XMLNS):
            href = elem.attrib.get("href", "")
            if not href or href.startswith(("https:", "http:", "data:")):
                continue
            import posixpath
            from urllib.parse import unquote
            p = posixpath.normpath(posixpath.join(opf_prefix, unquote(href.split("#",1)[0])))
            if p not in names:
                findings.append(f"ERROR: EPUB manifest missing member {p}")
        for name in names:
            if name.endswith((".xhtml", ".html", ".xml", ".opf", ".ncx")):
                try:
                    ET.fromstring(z.read(name))
                except ET.ParseError:
                    findings.append(f"ERROR: malformed XML/XHTML in {name}")
    return details

def inspect_pdf(path, label, findings):
    if not signature(path, b"%PDF-"):
        findings.append(f"ERROR: {label} does not have a PDF header")
        return {}
    try:
        import fitz
    except ImportError:
        findings.append(f"WARN: {label} page count/dimensions not assessed (pip install pymupdf)")
        return {}
    try:
        with fitz.open(path) as document:
            size = [[round(p.rect.width,2), round(p.rect.height,2)] for p in document]
            if not size:
                findings.append(f"ERROR: {label} has zero pages")
            dims = sorted(set(tuple(s) for s in size))
            if len(dims) > 1 and label == "print interior":
                findings.append(f"WARN: print interior contains {len(dims)} page sizes")
            return {"pages": len(document), "dimensions_points": [list(x) for x in dims]}
    except Exception as exc:
        findings.append(f"ERROR: {label} cannot open as PDF: {exc}")
        return {}

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--locale", required=True)
    p.add_argument("--volume", type=int, choices=(1, 2), required=True)
    for name in ["epub", "reading_pdf", "interior_pdf", "cover_pdf", "publisher_copy"]:
        p.add_argument("--" + name.replace("_", "-"), required=True, type=Path)
    p.add_argument("--output", type=Path, required=True)
    a = p.parse_args()
    if a.locale not in EXPECTED:
        p.error("locale must be one of " + ", ".join(sorted(EXPECTED)))
    files = {k: getattr(a, k) for k in ["epub","reading_pdf","interior_pdf","cover_pdf","publisher_copy"]}
    findings, outputs = [], {}
    for label, file in files.items():
        if not file.is_file():
            findings.append(f"ERROR: Missing {label} at {file}")
            continue
        if file.stat().st_size == 0:
            findings.append(f"ERROR: Empty {label}")
            continue
        digest = hashlib.sha256(file.read_bytes()).hexdigest()
        outputs[label] = {"filename": file.name, "bytes": file.stat().st_size, "sha256": digest}
    if "epub" in outputs:
        outputs["epub"]["structure"] = analyze_epub(files["epub"], a.locale, findings)
    for key, label in [("reading_pdf","reading PDF"),("interior_pdf","print interior"),("cover_pdf","print cover")]:
        if key in outputs:
            outputs[key]["pdf"] = inspect_pdf(files[key], label, findings)
    if "publisher_copy" in outputs:
        try:
            copy = files["publisher_copy"].read_text(encoding="utf-8-sig")
            if len(copy.strip()) < 100:
                findings.append("WARN: Publisher copy is very short (<100 characters)")
        except UnicodeError:
            findings.append("WARN: Publisher copy not readable as UTF-8, check source format")
    errors = [x for x in findings if x.startswith("ERROR:")]
    report={"edition":f"{a.locale}-{a.volume}","structural_result":"FAIL" if errors else "STRUCTURAL_PASS_WITH_LIMITATIONS","files":outputs,"findings":findings,
            "limitations":"No literary/translation/canon approval; no print visual preview, EPUBCheck or Kindle Previewer; no upload to KDP; PDF page scan only if PyMuPDF installed."}
    a.output.parent.mkdir(parents=True, exist_ok=True)
    a.output.write_text(json.dumps(report, ensure_ascii=False, indent=2)+"\n",encoding="utf-8")
    print(f"{report['edition']}: {report['structural_result']} — {len(findings)} findings. Private report at {a.output}")
    for item in findings:
        print(item)
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())
