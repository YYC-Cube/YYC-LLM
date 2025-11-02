import React, { useState, useEffect } from "react"
import { useModelManagement } from "@/lib/ai/model-management-center"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrainCircuit, RefreshCw } from "lucide-react"

export default function ModelEnginePage() {
  const { models, refreshModels } = useModelManagement() || {}
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("discovery")

  const handleRefresh = async () => {
    if (refreshModels) {
      setIsRefreshing(true)
      await refreshModels()
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-blue-500" />
            本地模型引擎
          </h1>
          <p className="text-gray-500">发现、调用和优化本地AI模型</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing || !refreshModels} variant="default">
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          刷新模型列表
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="discovery">模型发现</TabsTrigger>
          <TabsTrigger value="favorites">收藏模型</TabsTrigger>
        </TabsList>

        <TabsContent value="discovery">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">模型列表</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(models || []).map((model) => (
                  <div key={model.id} className="border p-3 rounded-lg">
                    <h3 className="font-medium">{model.name}</h3>
                    <p className="text-sm text-gray-500">{model.id}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">收藏模型</h2>
              <p>暂无收藏的模型</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}