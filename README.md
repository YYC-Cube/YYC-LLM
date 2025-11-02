# YanYu-DeepStack 应用

## 项目简介

言語云³深度堆栈全栈智创引擎 - 一个功能强大的AI开发平台，集成了模型管理、代码分析、代码生成等核心功能。

## 快速开始

### 开发环境

项目默认使用 Turbopack 开发模式，提供更快的开发体验：

```sh
npm run dev
# 或完整启动（包含环境设置）
npm run dev:full
```

### 构建与部署

```sh
# 构建项目
npm run build

# 启动生产服务器
npm start

# 打包应用（支持多种格式）
npm run package:web      # Web版
npm run package:docker   # Docker版
npm run package:electron # Electron版
npm run package:pwa      # PWA版
npm run package:all      # 所有版本
```

## 开发注意事项

### Webpack Dev 兼容注意事项

**⚠️ 重要提示：** 本项目在标准 Webpack 开发模式下存在已知兼容性问题，表现为：
- 浏览器控制台出现 `TypeError: Cannot read properties of undefined (reading 'call')` 错误
- Hydration 不匹配错误导致服务端渲染降级

**解决方法：**
1. **推荐方案：** 使用默认的 Turbopack 模式（已在 `dev` 脚本中配置）
2. **如必须使用 Webpack：** 尝试以下步骤：
   - 清除浏览器缓存和服务工作线程
   - 移除或修改 `next.config.mjs` 中的安全头配置
   - 暂时禁用 `public/service-worker.js`

## 端到端（E2E）测试

1. 启动本地服务（默认 http://localhost:3000）
2. 运行 E2E 测试：

   ```sh
   npm test:e2e
   ```

3. 查看报告：

   ```sh
   npx playwright show-report
   ```

E2E 测试脚本位于 `e2e/` 目录，覆盖主要页面的交互和功能。
