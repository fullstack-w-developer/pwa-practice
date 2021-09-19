const CACHE_NAME ="V-1"
const urlToCaches = ["ofline.html", "index.html"]


// install sw
self.addEventListener("install", (event)=>{
   event.waitUntil(
       caches.open(CACHE_NAME)
       .then((cache)=>{
           console.log("opened");
           return  cache.addAll(urlToCaches)
       })
   )
})
// fetch sw
self.addEventListener("fetch", (event)=>{
   event.respondWith(
       caches.match(event.request)
       .then(()=>{
           return fetch(event.request)
           .catch(()=> caches.match("offline.html"))
       })
   )
})
// activatw

self.addEventListener("activate", (event)=>{
 const cacheWhiteList = []
 cacheWhiteList.push(CACHE_NAME)

 event.waitUntil(
     caches.keys().then((cacheNames)=> Promise.all(
         cacheNames.map((cacheName)=>{
             if(!cacheWhiteList.includes(cacheName)){
                 return caches.delete(cacheName)
             }
         })
     ))
 )
})