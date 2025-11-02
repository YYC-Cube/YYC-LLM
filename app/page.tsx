"use client"

import React from "react"

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">最小页面调试：Hello YYC³</h1>
      <p className="text-sm text-gray-500 mt-2">纯客户端组件渲染，用于排查 RSC/webpack 运行时问题</p>
    </main>
  )
}
