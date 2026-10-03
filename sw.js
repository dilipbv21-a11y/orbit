// Orbit service worker v2: shows notifications for new messages and opens the right chat when tapped.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

const APPLE = /iPhone|iPad|Macintosh/.test(self.navigator.userAgent) && !/Chrome|Chromium|Android/.test(self.navigator.userAgent);

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    // Skip the popup only if Orbit is open AND focused right now. Apple requires every push to show something.
    const looking = wins.some((w) => w.focused === true && w.visibilityState === 'visible');
    if (looking && !APPLE) return;
    await self.registration.showNotification(d.title || 'Orbit', {
      body: d.body || 'New message',
      tag: d.cid || 'orbit',
      renotify: true,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      data: { cid: d.cid || 'common' },
    });
  })());
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const cid = (e.notification.data && e.notification.data.cid) || 'common';
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const w of wins) {
      if ('focus' in w) { w.postMessage({ open: cid }); return w.focus(); }
    }
    return self.clients.openWindow(self.registration.scope + '?open=' + encodeURIComponent(cid));
  })());
});
