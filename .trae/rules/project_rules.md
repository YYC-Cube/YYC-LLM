# 🎯 项目智能编程自动化规范 (Node.js + Next.js)

## 一、架构健康度保障体系

### 1.1 核心健康指标监控

```typescript
interface HealthMetrics {
  // 运行时健康指标
  memoryUsage: {
    heapUsed: number;
    heapTotal: number; 
    external: number;
    rss: number;
  };
  cpuUsage: {
    user: number;
    system: number;
  };
  eventLoop: {
    lag: number;
    utilization: number;
  };
  
  // 应用健康指标
  apiHealth: {
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
  
  // 数据库健康指标
  database: {
    connectionPool: number;
    queryPerformance: number;
    replicationLag: number;
  };
}

1.2 稳定性防护机制

class StabilityGuard {
  private static readonly MAX_MEMORY = 1024 * 1024 * 512; // 512MB
  private static readonly MAX_EVENT_LOOP_LAG = 1000; // 1秒
  
  // 内存泄漏防护
  static memoryLeakProtection(): void {
    if (process.memoryUsage().heapUsed > this.MAX_MEMORY) {
      this.triggerGarbageCollection();
      this.alertMemoryLeak();
    }
  }
  
  // 事件循环阻塞防护
  static eventLoopProtection(): void {
    const start = Date.now();
    setImmediate(() => {
      const lag = Date.now() - start;
      if (lag > this.MAX_EVENT_LOOP_LAG) {
        this.alertEventLoopBlock(lag);
      }
    });
  }
}

二、Node.js 自动化命令规范
2.1 命令执行健康检查

interface CommandHealthCheck {
  preExecution: {
    memoryCheck: boolean;
    dependencyCheck: boolean;
    permissionCheck: boolean;
  };
  duringExecution: {
    resourceMonitoring: boolean;
    timeoutControl: boolean;
    errorBoundary: boolean;
  };
  postExecution: {
    cleanup: boolean;
    healthReport: boolean;
    rollbackPlan: boolean;
  };
}

class NodeJsCommandExecutor {
  constructor(private command: string, private config: CommandConfig) {}
  
  async executeSafely(): Promise<CommandResult> {
    try {
      // 执行前健康检查
      await this.preHealthCheck();
      
      // 资源监控执行
      const result = await this.executeWithMonitoring();
      
      // 执行后健康报告
      await this.postHealthReport(result);
      
      return result;
    } catch (error) {
      await this.emergencyRollback(error);
      throw error;
    }
  }
}

2.2 自动化脚本安全规范

#!/bin/bash
# 脚本健康检查头文件
set -euo pipefail  # 严格错误处理
trap "cleanup_on_exit" EXIT  # 退出时清理

# 资源限制
ulimit -n 65536  # 文件描述符限制
ulimit -u 65536  # 进程数限制

# 健康监控函数
check_system_health() {
    local memory_threshold=85
    local cpu_threshold=80
    
    local memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    
    if [ $memory_usage -gt $memory_threshold ] || [ $cpu_usage -gt $cpu_threshold ]; then
        echo "🚨 系统资源紧张，暂停执行"
        exit 1
    fi
}

三、Next.js 应用自动化规范
3.1 构建健康度保障

// next.config.js 健康配置
const nextConfig = {
  // 构建健康监控
  webpack: (config, { buildId, dev, isServer, webpack }) => {
    // 构建资源监控
    config.plugins.push(new webpack.ProgressPlugin());
    
    // 包大小健康检查
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // 运行时健康配置
  compiler: {
    removeConsole: !process.env.DEV,
  },
  
  // 性能健康配置
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;

3.2 API 路由健康监控

// lib/api-health.ts
import { NextApiRequest, NextApiResponse } from 'next';

export class ApiHealthMonitor {
  static monitor(handler: Function) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const startTime = Date.now();
      try {
        await this.preApiCheck(req);
        await handler(req, res);
        this.recordMetrics(req, res, Date.now() - startTime);
      } catch (error) {
        await this.handleApiError(error, req, res);
      }
    };
  }
}

4.1 多维度健康评分

interface HealthScoreWeights {
  performance: number;      // 性能健康 30%
  stability: number;        // 稳定性健康 25% 
  security: number;         // 安全健康 20%
  maintainability: number;  // 可维护性 15%
  efficiency: number;       // 执行效率 10%
}

class HealthScoringSystem {
  private weights: HealthScoreWeights = {
    performance: 0.3,
    stability: 0.25,
    security: 0.2,
    maintainability: 0.15,
    efficiency: 0.1
  };
  
  calculateHealthScore(metrics: HealthMetrics): number {
    const scores = {
      performance: this.calculatePerformanceScore(metrics),
      stability: this.calculateStabilityScore(metrics),
      security: this.calculateSecurityScore(metrics),
      maintainability: this.calculateMaintainabilityScore(metrics),
      efficiency: this.calculateEfficiencyScore(metrics)
    };
    
    return Object.entries(scores).reduce((total, [key, score]) => {
      return total + (score * this.weights[key as keyof HealthScoreWeights]);
    }, 0);
  }
  
  private calculatePerformanceScore(metrics: HealthMetrics): number {
    const { apiHealth, memoryUsage } = metrics;
    let score = 10;
    
    // 响应时间评分
    if (apiHealth.responseTime > 1000) score -= 3;
    else if (apiHealth.responseTime > 500) score -= 2;
    else if (apiHealth.responseTime > 200) score -= 1;
    
    // 内存使用评分
    const memoryRatio = memoryUsage.heapUsed / memoryUsage.heapTotal;
    if (memoryRatio > 0.9) score -= 3;
    else if (memoryRatio > 0.8) score -= 2;
    else if (memoryRatio > 0.7) score -= 1;
    
    return Math.max(0, score);
  }
}

4.2 智能建议生成器

class IntelligentAdvisor {
  generateRecommendations(healthScore: number, metrics: HealthMetrics): Recommendation[] {
    const recommendations: Recommendation[] = [];
    
    // 性能优化建议
    if (metrics.apiHealth.responseTime > 500) {
      recommendations.push({
        type: 'performance',
        priority: 'high',
        title: 'API响应时间优化',
        description: `当前API平均响应时间 ${metrics.apiHealth.responseTime}ms，建议优化数据库查询或添加缓存`,
        action: '优化数据库索引，添加Redis缓存层',
        expectedImprovement: '响应时间降低40%',
        effort: 'medium'
      });
    }
    
    // 内存优化建议
    const memoryRatio = metrics.memoryUsage.heapUsed / metrics.memoryUsage.heapTotal;
    if (memoryRatio > 0.8) {
      recommendations.push({
        type: 'stability',
        priority: 'high', 
        title: '内存使用优化',
        description: `堆内存使用率 ${(memoryRatio * 100).toFixed(1)}%，存在内存泄漏风险`,
        action: '检查内存泄漏，优化大对象处理',
        expectedImprovement: '内存使用降低30%',
        effort: 'high'
      });
    }
    
    return this.prioritizeRecommendations(recommendations);
  }
}

5.1 命令健康执行流程

class HealthyExecutionFlow {
  async executeCommand(command: AutomatedCommand): Promise<ExecutionResult> {
    const executionId = this.generateExecutionId();
    
    try {
      // 阶段1: 健康预检
      await this.healthPreCheck(command);
      
      // 阶段2: 安全执行
      const result = await this.safeExecution(command, executionId);
      
      // 阶段3: 健康后检
      await this.healthPostCheck(result);
      
      // 阶段4: 智能报告
      const report = await this.generateHealthReport(result);
      
      return { success: true, data: result, report };
      
    } catch (error) {
      // 健康异常处理
      await this.healthEmergencyHandle(error, executionId);
      throw error;
    }
  }
  
  private async healthPreCheck(command: AutomatedCommand): Promise<void> {
    const checks = [
      this.checkSystemResources(),
      this.checkDependencies(),
      this.checkPermissions(),
      this.checkConflicts()
    ];
    
    const results = await Promise.allSettled(checks);
    const failures = results.filter(r => r.status === 'rejected');
    
    if (failures.length > 0) {
      throw new HealthCheckError('健康预检失败', failures);
    }
  }
}

5.2 健康监控集成

// monitoring/health-monitor.ts
export class HealthMonitor {
  private static instance: HealthMonitor;
  private metrics: HealthMetrics[] = [];
  private alerts: Alert[] = [];
  
  static getInstance(): HealthMonitor {
    if (!HealthMonitor.instance) {
      HealthMonitor.instance = new HealthMonitor();
    }
    return HealthMonitor.instance;
  }
  
  startMonitoring(): void {
    // 内存监控
    setInterval(() => this.collectMemoryMetrics(), 5000);
    
    // CPU监控
    setInterval(() => this.collectCpuMetrics(), 5000);
    
    // 事件循环监控
    setInterval(() => this.collectEventLoopMetrics(), 1000);
    
    // API健康检查
    setInterval(() => this.checkApiHealth(), 30000);
  }
  
  private collectMemoryMetrics(): void {
    const memory = process.memoryUsage();
    this.metrics.push({
      memoryUsage: {
        heapUsed: memory.heapUsed,
        heapTotal: memory.heapTotal,
        external: memory.external,
        rss: memory.rss
      },
      timestamp: Date.now()
    } as HealthMetrics);
    
    // 内存警报
    if (memory.heapUsed / memory.heapTotal > 0.85) {
      this.triggerAlert('HIGH_MEMORY_USAGE', {
        usage: `${(memory.heapUsed / 1024 / 1024).toFixed(2)}MB`,
        threshold: '85%'
      });
    }
  }
}

六、安全与权限健康规范
6.1 权限健康检查

class PermissionHealthChecker {
  static async checkCommandPermissions(command: Command): Promise<PermissionHealth> {
    const requiredPermissions = this.analyzeRequiredPermissions(command);
    const currentPermissions = await this.getCurrentPermissions();
    
    return {
      hasRequiredPermissions: this.validatePermissions(requiredPermissions, currentPermissions),
      missingPermissions: this.findMissingPermissions(requiredPermissions, currentPermissions),
      riskLevel: this.assessPermissionRisk(requiredPermissions),
      recommendations: this.generatePermissionRecommendations(requiredPermissions, currentPermissions)
    };
  }
  
  private static assessPermissionRisk(permissions: string[]): RiskLevel {
    const highRiskPermissions = ['root', 'sudo', 'chmod', 'rm -rf'];
    const mediumRiskPermissions = ['write', 'delete', 'update'];
    
    if (permissions.some(p => highRiskPermissions.includes(p))) {
      return 'HIGH';
    } else if (permissions.some(p => mediumRiskPermissions.includes(p))) {
      return 'MEDIUM';
    } else {
      return 'LOW';
    }
  }
}

七、健康报告与可视化
7.1 自动化健康报告

interface HealthReport {
  summary: {
    overallScore: number;
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    timestamp: Date;
    duration: number;
  };
  metrics: {
    performance: MetricDetail;
    stability: MetricDetail;
    security: MetricDetail;
    efficiency: MetricDetail;
  };
  recommendations: Recommendation[];
  trends: {
    historicalScores: number[];
    improvementAreas: string[];
    regressionWarnings: string[];
  };
}

class HealthReporter {
  generateReport(executionResult: ExecutionResult): HealthReport {
    const score = this.scoringSystem.calculateHealthScore(executionResult.metrics);
    const recommendations = this.advisor.generateRecommendations(score, executionResult.metrics);
    
    return {
      summary: {
        overallScore: score,
        status: this.getHealthStatus(score),
        timestamp: new Date(),
        duration: executionResult.duration
      },
      metrics: this.getMetricDetails(executionResult.metrics),
      recommendations,
      trends: this.analyzeTrends(executionResult)
    };
  }
  
  private getHealthStatus(score: number): HealthStatus {
    if (score >= 8) return 'HEALTHY';
    if (score >= 6) return 'WARNING';
    return 'CRITICAL';
  }
}



3.3 分析监控配置（Analytics 环境条件启用）
- 目的：在本地/自托管环境避免加载 `_vercel/insights/script.js`；在 Vercel 生产环境启用 `@vercel/analytics/next`。
- 环境变量策略：
  - `VERCEL=1`：由 Vercel 平台自动注入（无需手动设置）。
  - `NEXT_PUBLIC_ENABLE_ANALYTICS`：在非 Vercel 环境下手动开启时设为 `true`。
  - 生效条件：`NODE_ENV=production` 且 `(VERCEL=1 或 NEXT_PUBLIC_ENABLE_ANALYTICS=true)`。

示例（`app/layout.tsx`）：
```tsx
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const shouldRenderAnalytics =
    process.env.NODE_ENV === "production" &&
    (process.env.VERCEL === "1" || process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true")

  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
        {shouldRenderAnalytics && <Analytics />}
      </body>
    </html>
  )
}
```

注意事项：
- 在本地运行 `next start` 时，若强制启用 Analytics，会请求 `_vercel/insights/script.js` 导致 `ERR_ABORTED/404`。
- 建议在自托管环境采用可替代的分析方案（Plausible/Umami 等）。
- 若需减少 `?_rsc=` 的预取噪音，可在不需要预取的链接上设置 `prefetch={false}`。🌹


## 八、UI 导航与构建前检查（项目特定）

### 8.1 面包屑使用规范（Breadcrumb）
- 统一使用 `BreadcrumbLink asChild` 包裹 `next/link`，并保持 `prefetch={false}`，减少 RSC 预取噪音与水合差异。
- 当前页使用 `BreadcrumbPage` 表示，不要用 `<a>` 充当当前页。
- 严禁 `<a>` 嵌套 `<a>`；如需原生 `<a>`，取消 `asChild` 并直接传入 `href`。
- 链接属性在组件中透传，无需在内外层重复设置同一属性。

### 8.2 文案统一
- 按配置统一按钮文案：`{texts.common.actionSearchLabel}`、`{texts.common.actionExportLabel}` 等，避免硬编码中文文案导致不一致。
- 评审检查：关注是否存在硬编码文案、属性重复或不一致。

### 8.3 构建前自动扫描（Diff 标记）
- 目的：阻止含有行首 `+ / -` 的误插入对比标记进入构建（补丁/对比残留）。
- 实施：`package.json` 已添加 `prebuild` 钩子执行 `scripts/check-diff-markers.js`，扫描 `app/` 与 `components/` 下 `*.tsx|*.ts|*.jsx|*.js`。
- 绕过（不建议）：临时设置 `ALLOW_DIFF_MARKERS=true` 或在必要行尾添加 `// diff-ignore-line` 注释，并在 PR 说明原因。

### 8.4 CI 集成
- 在 GitHub Actions 中执行 `pnpm run build`（自动触发 `prebuild` 扫描），将其作为 PR 与主分支构建的强制检查。
- 遇到误报：请在 PR 中标注忽略原因，并添加 `// diff-ignore-line` 至该行，后续再进行规则优化。🌹