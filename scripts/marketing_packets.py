#!/usr/bin/env python3
"""Validate approved public marketing packets and render a local HTML preview.

No network calls, publication, email, paid actions or account credentials.
Draft prose must stay outside a public repository: this source accepts only
content already cleared for public storage, even when not cleared for delivery.
"""
import argparse
import hashlib
import html
import json
import re
from datetime import datetime, timezone
from pathlib import Path

LANGUAGES = {'en', 'de', 'it', 'fr', 'es', 'pt-BR', 'nl', 'pl'}
FIELDS = {'id', 'language', 'title', 'body', 'publish_at', 'fiction', 'approval'}
PRIVATE = re.compile(r'\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b')
FORBIDDEN = re.compile(r'\b(Russian|RU|translated|translation|übersetzt|Übersetzung)\b', re.I)
AGENCY = re.compile(r'\b(DOMINUS|machine|system|Maschine|System)\b[^.!?\n]{0,40}\b(feels?|wants?|repents?|decides?|fühlt|will|bereut|entscheidet)\b', re.I)

def instant(value):
    if not isinstance(value, str):
        raise ValueError('timestamp must be text')
    dt = datetime.fromisoformat(value.replace('Z', '+00:00'))
    if dt.tzinfo is None or dt.utcoffset() is None:
        raise ValueError('timestamp must include UTC offset')
    return dt.astimezone(timezone.utc)

def digest(packet):
    payload = {k: packet[k] for k in sorted(FIELDS - {'approval'})}
    raw = json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
    return hashlib.sha256(raw.encode('utf-8')).hexdigest()

def inspect(data, now):
    if not isinstance(data, dict) or data.get('schema_version') != 1:
        raise ValueError('unsupported schema')
    if data.get('timezone') != 'Europe/Berlin' or not isinstance(data.get('packets'), list):
        raise ValueError('invalid timezone or packets list')
    if now.tzinfo is None:
        raise ValueError('now must be timezone-aware')
    ids, ready, held = set(), [], []
    for p in data['packets']:
        if not isinstance(p, dict) or set(p) != FIELDS:
            raise ValueError('packet keys must match schema exactly')
        if not isinstance(p['id'], str) or not re.fullmatch(r'[a-z0-9][a-z0-9-]{0,79}', p['id']) or p['id'] in ids:
            raise ValueError('invalid or duplicate packet ID')
        ids.add(p['id'])
        if p['language'] not in LANGUAGES or p['fiction'] is not True:
            raise ValueError('language or fiction label invalid')
        for key, limit in [('title', 160), ('body', 8000)]:
            if not isinstance(p[key], str) or not p[key].strip() or len(p[key]) > limit:
                raise ValueError(f'{p["id"]}: invalid {key}')
        text = p['title'] + '\n' + p['body']
        if PRIVATE.search(text) or FORBIDDEN.search(text) or AGENCY.search(text):
            raise ValueError(f'{p["id"]}: editorial review required')
        due = instant(p['publish_at'])
        a = p['approval']
        if a is None:
            held.append((p['id'], 'approval missing'))
            continue
        if not isinstance(a, dict) or set(a) != {'approved_by', 'approved_at', 'sha256', 'channels'}:
            raise ValueError(f'{p["id"]}: malformed approval')
        if a['approved_by'] != 'Pavel Velichii' or a['channels'] != ['website']:
            raise ValueError(f'{p["id"]}: website approval required')
        if not isinstance(a['sha256'], str) or a['sha256'] != digest(p):
            raise ValueError(f'{p["id"]}: content changed since approval')
        approved_at = instant(a['approved_at'])
        if approved_at > now or approved_at > due:
            raise ValueError(f'{p["id"]}: invalid approval time')
        if due > now:
            held.append((p['id'], 'scheduled for future'))
            continue
        ready.append(p)
    return sorted(ready, key=lambda p: (instant(p['publish_at']), p['id'])), held

def render(packets):
    blocks = []
    for p in packets:
        title = html.escape(p['title'])
        body = '<br>'.join(html.escape(p['body']).splitlines())
        lang = html.escape(p['language'], quote=True)
        ident = html.escape(p['id'], quote=True)
        blocks.append(f'<article id="{ident}" lang="{lang}"><h2>{title}</h2><p>Fiction · DOMINUS</p><p>{body}</p></article>')
    return '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DOMINUS — Archivum preview</title><main><h1>ARCHIVUM</h1>' + (''.join(blocks) or '<p>No approved packets are due.</p>') + '</main></html>\n'

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--source', default='marketing/packets.json')
    ap.add_argument('--output', default='generated-marketing')
    ap.add_argument('--now', help='ISO timestamp with UTC offset; defaults to current UTC')
    args = ap.parse_args()
    data = json.loads(Path(args.source).read_text(encoding='utf-8'))
    now = instant(args.now) if args.now else datetime.now(timezone.utc)
    ready, held = inspect(data, now)
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    (out / 'archivum-preview.html').write_text(render(ready), encoding='utf-8')
    report = {'generated_at': now.isoformat(), 'ready': [p['id'] for p in ready], 'held': [{'id': i, 'reason': r} for i, r in held], 'delivery_performed': False}
    (out / 'readiness.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Validated {len(ready) + len(held)} packets; {len(ready)} ready; {len(held)} held. No delivery performed.')

if __name__ == '__main__':
    main()
