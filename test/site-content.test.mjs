import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('homepage exposes SEO metadata and policy navigation', () => {
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:description"/);
  assert.match(html, /href="#privacy"[^>]*>개인정보처리방침/);
  assert.match(html, /href="#terms"[^>]*>이용약관/);
  assert.match(html, /href="#contact"[^>]*>문의/);
});

test('homepage includes policy content matching browser-only processing', () => {
  assert.match(html, /개인정보처리방침/);
  assert.match(html, /파일은 서버로 전송되지 않습니다/);
  assert.match(html, /이용약관/);
});
