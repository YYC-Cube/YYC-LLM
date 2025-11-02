import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YYC³ Deep Stack Full-Stack Intelligent Creation Engine",
  description: "万象归元于云枢，深栈智启新纪元",
  icons: { icon: "/favicon.ico" },
};

// 开发环境 SW 硬重置（仅开发）
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DevSWHardReset from "../components/dev/sw-hard-reset"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        {/* 开发模式下执行 SW 与缓存硬重置 */}
        {process.env.NODE_ENV === "development" ? <DevSWHardReset /> : null}
        {children}
      </body>
    </html>
  )
}