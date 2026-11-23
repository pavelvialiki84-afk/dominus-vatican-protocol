import copy
import importlib.util
import unittest
from datetime import datetime, timezone
from pathlib import Path

spec = importlib.util.spec_from_file_location('packets', Path(__file__).resolve().parents[1] / 'scripts/marketing_packets.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
NOW = datetime(2026, 11, 15, 17, tzinfo=timezone.utc)

class ApprovalBoundaryTests(unittest.TestCase):
    def packet(self):
        p = {'id': 'example-en', 'language': 'en', 'title': 'A record', 'body': 'An unresolved attribution.', 'publish_at': '2026-11-15T16:00:00+01:00', 'fiction': True, 'approval': None}
        return p

    def data(self, p):
        return {'schema_version': 1, 'timezone': 'Europe/Berlin', 'packets': [p]}

    def approve(self, p):
        p['approval'] = {'approved_by': 'Pavel Velichii', 'approved_at': '2026-11-15T12:00:00Z', 'channels': ['website'], 'sha256': m.digest(p)}
        return p

    def test_unapproved_content_is_not_rendered(self):
        ready, held = m.inspect(self.data(self.packet()), NOW)
        self.assertFalse(ready)
        self.assertEqual(held[0][1], 'approval missing')

    def test_approved_due_content_is_ready(self):
        ready, held = m.inspect(self.data(self.approve(self.packet())), NOW)
        self.assertEqual(len(ready), 1)
        self.assertFalse(held)

    def test_edited_approved_body_rejected(self):
        p = self.approve(self.packet())
        p['body'] += ' An added sentence.'
        with self.assertRaisesRegex(ValueError, 'changed since approval'):
            m.inspect(self.data(p), NOW)

    def test_future_not_rendered(self):
        p = self.packet()
        p['publish_at'] = '2026-11-16T18:00:00+01:00'
        ready, held = m.inspect(self.data(self.approve(p)), NOW)
        self.assertFalse(ready)
        self.assertEqual(held[0][1], 'scheduled for future')

    def test_no_cross_channel_approval(self):
        p = self.approve(self.packet())
        p['approval']['channels'] = ['instagram']
        with self.assertRaisesRegex(ValueError, 'website approval'):
            m.inspect(self.data(p), NOW)

    def test_naive_timestamp_rejected(self):
        p = self.packet()
        p['publish_at'] = '2026-11-15T16:00:00'
        with self.assertRaisesRegex(ValueError, 'UTC offset'):
            m.inspect(self.data(p), NOW)

    def test_html_escaped(self):
        p = self.packet()
        p['body'] = '<script>alert(1)</script>'
        markup = m.render([p])
        self.assertNotIn('<script>', markup)
        self.assertIn('&lt;script&gt;', markup)

    def test_personal_email_rejected(self):
        p = self.packet()
        p['body'] = 'Contact someone@example.org'
        with self.assertRaisesRegex(ValueError, 'editorial review'):
            m.inspect(self.data(p), NOW)

    def test_machine_agency_rejected(self):
        p = self.packet()
        p['body'] = 'The machine decides who may speak.'
        with self.assertRaisesRegex(ValueError, 'editorial review'):
            m.inspect(self.data(p), NOW)

    def test_duplicate_id_rejected(self):
        p = self.packet()
        data = self.data(p)
        data['packets'].append(copy.deepcopy(p))
        with self.assertRaisesRegex(ValueError, 'duplicate'):
            m.inspect(data, NOW)

if __name__ == '__main__':
    unittest.main()
