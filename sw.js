const CACHE='chassis-pro-v5';
const SHELL=['./','./index.html','./manifest.webmanifest','./assets/mockup.png','./assets/icon-192.png','./assets/icon-512.png','./assets/chassis-pro-logo.jpg','./assets/car-81.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return resp}).catch(()=>caches.match('./index.html')));return;}e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(r,copy));return resp})));});
