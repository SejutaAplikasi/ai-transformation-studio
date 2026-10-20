// scripts/generate-codes.mjs
// Pemakaian: node scripts/generate-codes.mjs 300
// Menghasilkan kode unik + hash-nya. TIDAK PERNAH commit folder .private ke GitHub.
import { randomInt, createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';

const count = Number(process.argv[2] || 100);
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // tanpa O,0,I,1,L agar tidak membingungkan
const group = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');

// Harus identik dengan normalizeCode/hashCode di lib/access.ts
const normalize = (c) => c.toUpperCase().replace(/[^A-Z0-9]/g, '');
const hash = (c) => createHash('sha256').update(normalize(c)).digest('hex').slice(0, 32);

const codes = new Set();
while (codes.size < count) codes.add(`ATS-${group()}-${group()}-${group()}`);
const list = [...codes];

mkdirSync('.private', { recursive: true });
writeFileSync('.private/codes.txt', list.join('\n') + '\n');
writeFileSync('.private/hashes.txt', list.map(hash).join(',') + '\n');

console.log(`${count} kode dibuat.`);
console.log('  .private/codes.txt  -> kode asli, bagikan ke pembeli (jangan di-commit)');
console.log('  .private/hashes.txt -> tempel ke env var PREMIUM_CODE_HASHES di Vercel');
