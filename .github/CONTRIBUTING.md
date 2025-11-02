# 贡献指南

感谢您考虑为 YYC³-LLM 项目做出贡献！本指南将帮助您了解如何参与本项目的开发和维护。

## 行为准则

参与本项目意味着您同意遵守我们的[行为准则](CODE_OF_CONDUCT.md)。请确保您阅读并理解这些指南。

## 贡献流程

### 1. 提出问题

如果您发现 bug 或有新功能建议，请先在 [GitHub Issues](https://github.com/yourusername/YYC³-LLM/issues) 中提出，确保没有类似的问题已经被提出。

提交问题时，请提供以下信息：
- 简明扼要的标题
- 详细的问题描述
- 重现步骤（针对 bug）
- 期望行为和实际行为的对比
- 环境信息（操作系统、Node.js 版本等）
- 相关截图或日志（如适用）

### 2. 开发流程

1. **Fork 项目仓库**

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YYC³-LLM.git
   cd YYC³-LLM
   ```

3. **设置开发环境**
   ```bash
   # 安装依赖
   npm ci
   
   # 启动开发服务器
   npm run dev
   ```

4. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或修复分支
   git checkout -b fix/your-bugfix-name
   ```

5. **进行开发**
   - 遵循项目的代码风格和规范
   - 为新功能添加适当的测试
   - 确保现有测试通过

6. **提交更改**
   - 使用清晰、描述性的提交信息
   - 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范
   - 示例：`feat: 添加用户认证功能` 或 `fix: 修复登录页面样式问题`

7. **推送更改**
   ```bash
   git push origin your-branch-name
   ```

8. **创建 Pull Request**
   - 提供清晰的 PR 描述
   - 引用相关的 Issue（如果有）
   - 确保所有 CI 检查通过

### 3. 代码审查流程

1. 项目维护者会审查您的 PR
2. 可能会提出修改建议，请及时响应
3. 一旦获得批准，您的代码将会被合并

## 开发规范

### 代码风格

- 遵循 TypeScript 最佳实践
- 使用 ESLint 和 Prettier 保持代码风格一致
- 为所有函数和组件添加适当的注释和文档

### 测试要求

- 为新功能添加单元测试
- 确保 100% 的测试覆盖率（尽可能）
- 运行 `npm run test` 确保测试通过

### 提交信息规范

使用以下格式的提交消息：

```
<类型>: <描述>

<可选的详细说明>

<可选的引用>
```

类型可以是：
- `feat`: 添加新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码风格更改（不影响功能）
- `refactor`: 代码重构（不添加功能或修复 bug）
- `perf`: 性能优化
- `test`: 添加或更新测试
- `chore`: 构建过程或辅助工具的更改

## 环境设置

### 必要工具

- Node.js 20+
- npm 10+
- Git

### 开发命令

```bash
# 安装依赖
npm ci

# 启动开发服务器
npm run dev

# 运行 TypeScript 类型检查
npm run type-check

# 运行 ESLint 检查
npm run lint

# 运行单元测试
npm run test

# 运行 E2E 测试
npm run test:e2e

# 构建项目
npm run build

# 检查代码格式化
npm run format:check

# 格式化代码
npm run format
```

## 报告安全问题

如果您发现安全漏洞，请直接通过电子邮件联系项目维护者，而不是公开提出问题。我们将迅速回应并采取适当的措施。

## 项目维护者

- YanYu Cloud Team

感谢您的贡献！您的参与使这个项目变得更加出色。