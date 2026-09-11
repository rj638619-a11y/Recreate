import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = process.argv.includes('--dist') ? join(process.cwd(), 'dist') : process.cwd();
const port = Number(process.env.PORT || 5173);
const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml' };
function fileFor(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
  const requested = join(root, clean || 'index.html');
  if (existsSync(requested) && statSync(requested).isFile()) return requested;
  const publicAsset = join(root, 'public', clean);
  if (existsSync(publicAsset) && statSync(publicAsset).isFile()) return publicAsset;
  return join(root, 'index.html');
}
http.createServer((req, res) => {
  const file = fileFor(new URL(req.url, `http://${req.headers.host}`).pathname);
  res.writeHead(200, { 'Content-Type': `${types[extname(file)] || 'application/octet-stream'}; charset=utf-8` });
  createReadStream(file).pipe(res);
}).listen(port, '0.0.0.0', () => console.log(`GlassNotes preview: http://localhost:${port}`));
