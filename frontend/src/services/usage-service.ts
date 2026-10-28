import { apiClient } from './api-client'

export interface BackendApiKeyItem {
  id: string
  name: string
  key_prefix: string
  created_at: string
  last_used?: string
  secret_key?: string
}

export const usageService = {
  async listKeys(): Promise<BackendApiKeyItem[]> {
    const res = await apiClient<{ keys: BackendApiKeyItem[] }>('/api/v1/user/keys')
    return res.keys || []
  },

  async createKey(name: string): Promise<BackendApiKeyItem> {
    return apiClient<BackendApiKeyItem>('/api/v1/user/keys', {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
  },
}
