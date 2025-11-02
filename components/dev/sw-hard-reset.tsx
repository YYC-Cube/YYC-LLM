/**
 * @file 开发环境 Service Worker 硬重置组件
 * @description 强制注销所有 SW、清理所有缓存并刷新页面，用于解决旧 SW 导致的资源加载错配问题
 * @module dev-sw-hard-reset
 * @author YYC
 * @version 1.0.0
 * @created 2025-10-31
 * @updated 2025-10-31
 */
"use client"

import React, { useEffect } from "react"

/**
 * @description 开发环境下执行 SW 与缓存硬重置
 */
export default function DevSWHardReset() {
  useEffect(() => {
    const key = "__DEV_SW_HARD_RESET_DONE__"
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "1")

    const teardown = async () => {
      try {
        // 注销所有 Service Worker
        if ("serviceWorker" in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations()
          await Promise.all(regs.map((r) => r.unregister()))
          // 解除页面控制
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: "force-skip-waiting" })
          }
        }

        // 清理所有缓存
        if ("caches" in window) {
          const keys = await caches.keys()
          await Promise.all(keys.map((k) => caches.delete(k)))
        }

        // 清理本地离线数据痕迹
        try {
          localStorage.removeItem("yanyu-offline-content")
          localStorage.removeItem("yanyu-sync-queue")
        } catch {}

        // 刷新页面以重新获取最新 chunk
        setTimeout(() => {
          window.location.reload()
        }, 50)
      } catch (err) {
        // 🛡️ 统一错误处理
        console.error("🚨 [DevSWHardReset] 错误:", err)
      }
    }

    teardown()
  }, [])

  return null
}
