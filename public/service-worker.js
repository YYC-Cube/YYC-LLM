const CACHE_NAME = "yyc-cache-v1"
const OFFLINE_URLS = ["/", "/offline"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 仅处理同源请求
  if (url.origin !== self.location.origin) return

  // ⚠️ 避免缓存或拦截 Next.js 的运行时代码和静态资源
  // 这些资源在开发模式下频繁变更，缓存会导致 webpack 运行时异常
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.includes("__webpack_hmr") ||
    url.pathname.includes("hot-update")
  ) {
    return // 交由网络层处理
  }

  // 对 HTML 页面使用网络优先，离线回退
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request)
          const cache = await caches.open(CACHE_NAME)
          cache.put(request, networkResponse.clone())
          return networkResponse
        } catch (err) {
          const cached = await caches.match(request)
          if (cached) return cached
          return caches.match("/offline")
        }
      })()
    )
    return
  }

  // 其他静态资源采用缓存优先，网络回退
  event.respondWith(
    (async () => {
      const cached = await caches.match(request)
      if (cached) return cached
      const response = await fetch(request)
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, response.clone())
      return response
    })()
  )
})