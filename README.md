<!-- 顶图 -->
<p align="center">
  <img src="public/Git-Nexus-Expansion.png" alt="YanYu Cloud³ · Nexus Expansion" width="100%" />
</p>

# YanYu Cloud³ · Nexus Expansion

面向深度智能应用的 Next.js 14+ 项目模板，专注于强健的构建流程、可观测性与端到端（E2E）质量保障。当前版本聚焦模型引擎演示、交互式 UI 组件集成与基础 CI/CD 工作流。

## 功能亮点

- 模型引擎页面与交互：整合 `Tabs/Card/Button` 等 UI 组件与状态管理。
- 可视化与交互库：`Radix UI`、`lucide-react`、`framer-motion`、`recharts`、`three`。
- 端到端质量保障：Playwright 配置与报告上传（GitHub Actions）。
- 强健构建：Node 20 环境，严格锁文件校验，`npm ci` 统一依赖安装。
- 工程实践：TypeScript 全面覆盖，Tailwind 工程化，组件桶文件与 Hook 目录规范。

## 技术栈

- 应用框架：`Next.js 14+ (App Router)` / `React 18`
- 语言与工具：`TypeScript 5`、`Tailwind CSS`、`tailwind-merge`
- UI/交互：`@radix-ui/*`、`lucide-react`、`framer-motion`
- 状态与表单：`zustand`、`react-hook-form`、`zod`
- 图表与三维：`recharts`、`three`

## 快速开始

1. 安装依赖：

   ```bash
   npm install
   ```

2. 启动开发：

   ```bash

   npm run dev
   # 访问 http://localhost:3000

   ```

3. 生产构建与启动：

   ```bash
   # 生产构建
   npm run build
   
   # 启动构建产物
   npm run start
   ```

## 常用脚本

- `npm run dev`：本地开发，含热更新
- `npm run build`：生产构建
- `npm run start`：启动构建产物
- E2E 测试（如未配置脚本，可直接使用）：
  
  ```bash

  npx playwright test
  npx playwright show-report
  ```

## 目录结构（节选）

src/
├── app/                 # Next.js App Router 页面与路由
├── components/          # 通用组件（含 /ui 桶文件）
├── lib/                 # 工具库与 hooks（如 lib/hooks）
├── types/               # TypeScript 类型定义
├── utils/               # 工具函数
└── styles/              # 样式文件
public/                  # 静态资源（含顶图 Git-Nexus-Expansion.png）
.github/workflows/       # CI/CD 工作流（ci.yml）

```

## 环境变量

建议使用 `.env.local` 管理敏感配置，并结合 Zod 做校验：
NODE_ENV="development|production|test"
CUSTOM_KEY="your-custom-key"

## CI/CD 工作流

工作流文件：`.github/workflows/ci.yml`

- 触发条件：`push` 到 `main` 与 `pull_request`
- 主要阶段：
  - 锁文件守卫：禁止非 `npm` 锁文件（`pnpm-lock.yaml` / `yarn.lock`）
  - Node 环境：`actions/setup-node@v4`（Node 20，缓存 npm）
  - 依赖安装：`npm ci`（可选对子项目如 `mobile/` 安装）
  - Playwright 浏览器安装：`npx playwright install --with-deps`
  - 运行 E2E 测试：默认执行 `npm run test:e2e`（如未设脚本，可改为 `npx playwright test`）
  - 报告上传：`actions/upload-artifact@v4`（`playwright-report`）

如需扩展：

- 增加 `lint / typecheck / unit` 作业以并行执行，缩短反馈周期。
- 引入构建缓存与产物缓存（如 Turborepo 或 GitHub Actions Cache）。
- 在 PR 上集成预览部署（如 Vercel 或自建容器环境）。

## E2E 测试

- 测试入口：`e2e/` 目录（如 `model-engine.spec.ts`）
- 本地运行：
  
  ```bash

  npx playwright test
  npx playwright show-report
  ```

- CI 报告：在 GitHub Actions 的构建产物中查看 `playwright-report`

## 构建与质量守护建议

- 统一包管理与锁文件，避免多锁并存导致依赖漂移。
- 在生产构建前执行 `typecheck / lint / e2e`，确保发布稳定性。
- 针对大型页面启用 `splitChunks` 与按需加载，控制包体体积。
- 引入监控（性能、错误、API健康度）与缓存策略（如 `zod` 输入校验、`react-query`/自建缓存层）。🌹

## GT 副驾（AI 协作）

- 智能补全与重构建议：提升迭代效率与代码一致性。
- 单测与 E2E 生成建议：减少漏测场景，强化质量基线。
- PR 评审提示：自动发现潜在问题（类型缺失、性能隐患、无用依赖）。

## 贡献指南

- 提交信息规范：`feat/fix/docs/style/refactor/test/chore` 等类别
- 提交前：请确保通过 `build` 与基础检查（lint/typecheck/测试）
- 分支策略：建议 `feature/*` → PR → `main`，保持变更原子化

---
如需开启预览部署、强化 CI 并行度或引入质量门禁（最低覆盖率与性能阈值），我可以继续为你配置工作流与相关脚本。
