"use client"

/**
 * @file 开发环境 Service Worker 清理组件
 * @description 在开发模式下自动注销已注册的 Service Worker 并清空缓存，避免缓存的 _next 资源导致运行时异常
 * @author YYC
 * @created 2025-10-31
 */
import { useEffect } from "react"

export default function DevSWCleanup() {
  useEffect(() => {
    // 仅在开发环境执行清理
    if (process.env.NODE_ENV === "production") return

    const cleanup = async () => {
      try {
        let hadSW = false
        if ("serviceWorker" in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations()
          hadSW = regs.length > 0
          for (const reg of regs) {
            try {
              await reg.unregister()
            } catch {}
          }
        }
        let hadCaches = false
        if ("caches" in window) {
          const names = await caches.keys()
          hadCaches = names.length > 0
          await Promise.all(names.map((name) => caches.delete(name)))
        }
        console.info("🧹 已清理开发环境的 Service Worker 与缓存")
        // 首次清理后自动刷新一次，确保剔除 SW 控制
        const shouldReload = (hadSW || hadCaches) && !sessionStorage.getItem("__sw_cleanup_reloaded__")
        if (shouldReload) {
          sessionStorage.setItem("__sw_cleanup_reloaded__", "1")
          location.reload()
        }
      } catch (err) {
        console.warn("清理 Service Worker 失败:", err)
      }
    }

    cleanup()
  }, [])

  return null
}
