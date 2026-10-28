import { apiClient } from './api-client'

export interface BackendModelCard {
  id: string
  name: string
  provider: string
  tier_badge: string
  partner_badge?: string
  price_input: number
  price_output: number
  latency_ms: number
  throughput_tps: number
  uptime_percent: number
  context_window: number
  status: 'Ready' | 'Degraded' | 'Down'
}

interface ModelListResponse {
  object: string
  data: BackendModelCard[]
}

export const modelService = {
  async listModels(): Promise<BackendModelCard[]> {
    const res = await apiClient<ModelListResponse>('/v1/models')
    return res.data || []
  },

  async getModel(id: string): Promise<BackendModelCard> {
    const normalizedId = id.replace(/claude-3-5/g, 'claude-3.5').replace(/llama-3-3/g, 'llama-3.3').replace(/gemini-1-5/g, 'gemini-1.5').replace(/qwen-2-5/g, 'qwen-2.5')
    return apiClient<BackendModelCard>(`/v1/models/${encodeURIComponent(normalizedId)}`)
  },
}
