#!/usr/bin/env node
/**
 * Envia todas as URLs do sitemap oficial da RUNA para o protocolo IndexNow
 * (Bing, ChatGPT Search, Copilot, Yandex, Seznam, Naver).
 */

const HOST = 'www.airuna.com.br';
const KEY = 'e8f4b2a9c1d74e3690a5b8c2d4f6e1a3';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function main() {
  console.log(`Buscando URLs em ${SITEMAP_URL}...`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Falha ao buscar sitemap: HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  // Inclui também llms.txt e llms-full.txt
  const urlList = Array.from(
    new Set([
      ...urls,
      `https://${HOST}/llms.txt`,
      `https://${HOST}/llms-full.txt`,
    ])
  );

  console.log(`Enviando ${urlList.length} URLs para IndexNow...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  for (const endpoint of [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ]) {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const text = await resp.text();
    console.log(`[${endpoint}] HTTP ${resp.status} ${resp.statusText}`, text || '(OK)');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
