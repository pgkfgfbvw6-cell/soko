self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
self.addEventListener('push',e=>{
let d={};
try{d=e.data?e.data.json():{}}catch(x){}
e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
if(l.some(c=>c.visibilityState==='visible'))return;
return self.registration.showNotification(d.title||'Soko',{body:d.body||'Nouvelle notification',icon:'/icon-192.png',badge:'/icon-192.png',data:{url:d.url||'/'},tag:d.tag||'soko'});
}));
});
self.addEventListener('notificationclick',e=>{
e.notification.close();
e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
for(const c of l){if('focus' in c)return c.focus()}
return self.clients.openWindow((e.notification.data&&e.notification.data.url)||'/');
}));
});
