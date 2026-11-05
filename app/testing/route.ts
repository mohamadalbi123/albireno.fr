import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Emit the standalone HTML at build time, outside the website layout and CSS.
export const dynamic = 'force-static';
export async function GET() {
  const html = await readFile(join(process.cwd(), 'testing-planner/index.html'), 'utf8');
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'no-cache',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
