/**
 * @file 测试页面 - 最小化客户端组件
 * @description 用于隔离验证 webpack 运行时与 hydration 错误是否与首页/布局相关
 * @module app/test/page
 * @author YYC
 * @version 1.0.0
 * @created 2025-10-31
 * @updated 2025-10-31
 */
"use client"

export default function TestPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 rounded-lg border">
        <h1 className="text-2xl font-bold">测试页面</h1>
        <p className="mt-2 text-gray-600">这是一个最小化客户端页面。</p>
      </div>
    </main>
  )
}
