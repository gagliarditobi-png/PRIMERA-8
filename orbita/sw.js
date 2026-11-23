const C='orbita-v1795459123';const A=['./','index.html','app.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('orbita-')&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
 if(u.hostname.startsWith('countapi'))return;
 if(q.mode==='navigate'){e.respondWith(fetch(q).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(q,c));return r}).catch(()=>caches.match(q).then(r=>r||caches.match('app.html'))));return}
 e.respondWith(caches.match(q).then(r=>r||fetch(q).then(n=>{if(n&&(n.ok||n.type==='opaque')&&/^(https?:)$/.test(u.protocol)){const c=n.clone();caches.open(C).then(x=>x.put(q,c))}return n})))});
