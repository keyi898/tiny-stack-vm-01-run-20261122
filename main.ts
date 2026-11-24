import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function run(g, f) {
  const n = g.length;
  const d = new Int32Array(256);
  const k = new Int32Array(64);
  const w = new Int32Array(256);
  const o = new Uint8Array(65536);
  let t = 0, u = 0, l = 0, j = 0, p = 0, s = 0;
  const T = (c) => [o.slice(0, l), c];
  for (;;) {
    if (s === 1e6) return T(10);
    if (p < 0 || p >= n) return T(9);
    const c = g[p];
    const m = c === 1 ? 1 : c === 2 ? 4 : c >= 48 && c < 52 ? 2 : 0;
    if (p + m >= n) return T(9);
    s++;
    const q = p + 1 + m;
    p = q;
    switch (c) {
      default: return T(5);
      case 0: return T(0);
      case 1:
        if (t === 256) return T(3);
        d[t++] = (g[q - 1] << 24) >> 24;
        break;
      case 2:
        if (t === 256) return T(3);
        d[t++] = g[q - 4] | g[q - 3] << 8 | g[q - 2] << 16 | g[q - 1] << 24;
        break;
      case 3:
        if (t < 1) return T(2);
        t--;
        break;
      case 4:
        if (t < 1) return T(2);
        if (t === 256) return T(3);
        d[t] = d[t - 1]; t++;
        break;
      case 5: {
        if (t < 2) return T(2);
        const x = d[t - 1]; d[t - 1] = d[t - 2]; d[t - 2] = x;
        break;
      }
      case 6:
        if (t < 2) return T(2);
        if (t === 256) return T(3);
        d[t] = d[t - 2]; t++;
        break;
      case 7: {
        if (t < 3) return T(2);
        const x = d[t - 3]; d[t - 3] = d[t - 2]; d[t - 2] = d[t - 1]; d[t - 1] = x;
        break;
      }
      case 16: case 17: case 18: case 24: case 25: case 26: case 28: case 29: case 30: case 32: case 33: case 34: {
        if (t < 2) return T(2);
        const b = d[--t], a = d[t - 1];
        d[t - 1] = c === 16 ? a + b : c === 17 ? a - b : c === 18 ? Math.imul(a, b) : c === 24 ? a & b : c === 25 ? a | b : c === 26 ? a ^ b : c === 28 ? a << (b & 31) : c === 29 ? a >> (b & 31) : c === 30 ? a >>> (b & 31) : c === 32 ? (a === b ? 1 : 0) : c === 33 ? (a < b ? 1 : 0) : (a >>> 0) < (b >>> 0) ? 1 : 0;
        break;
      }
      case 19: case 20: case 21: case 22: {
        if (t < 2) return T(2);
        const b = d[--t], a = d[t - 1];
        if (b === 0) return T(4);
        d[t - 1] = c === 19 ? a / b : c === 20 ? a % b : c === 21 ? Math.floor((a >>> 0) / (b >>> 0)) : (a >>> 0) % (b >>> 0);
        break;
      }
      case 23:
        if (t < 1) return T(2);
        d[t - 1] = -d[t - 1];
        break;
      case 27:
        if (t < 1) return T(2);
        d[t - 1] = ~d[t - 1];
        break;
      case 48: case 49: case 50: {
        const r = (g[q - 2] | g[q - 1] << 8) << 16 >> 16;
        if (c !== 48) {
          if (t < 1) return T(2);
          const v = d[--t];
          if ((c === 49) !== (v === 0)) break;
        }
        p = q + r;
        break;
      }
      case 51:
        if (u === 64) return T(7);
        k[u++] = q;
        p = g[q - 2] | g[q - 1] << 8;
        break;
      case 52:
        if (u === 0) return T(8);
        p = k[--u];
        break;
      case 64: {
        if (t < 1) return T(2);
        const a = d[t - 1];
        if (a < 0 || a > 255) return T(6);
        d[t - 1] = w[a];
        break;
      }
      case 65: {
        if (t < 2) return T(2);
        const a = d[t - 1], v = d[t - 2];
        if (a < 0 || a > 255) return T(6);
        t -= 2;
        w[a] = v;
        break;
      }
      case 80: {
        if (t < 1) return T(2);
        const y = String(d[t - 1]);
        if (l + y.length > 65536) return T(11);
        t--;
        for (let i = 0; i < y.length; i++) o[l++] = y.charCodeAt(i);
        break;
      }
      case 81:
        if (t < 1) return T(2);
        if (l === 65536) return T(11);
        o[l++] = d[--t] & 255;
        break;
      case 82:
        if (t === 256) return T(3);
        d[t++] = j < f.length ? f[j++] : -1;
        break;
      case 83:
        if (t < 1) return T(2);
        return T(d[--t] & 255);
    }
  }
}

const I = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const O = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for (const id of readdirSync(I).sort()) {
  const [b, e] = run(readFileSync(join(I, id, 'program.bin')), readFileSync(join(I, id, 'input.bin')));
  const d = join(O, id);
  mkdirSync(d, { recursive: true });
  writeFileSync(join(d, 'stdout.bin'), b);
  writeFileSync(join(d, 'exit.txt'), e + '\n');
}
