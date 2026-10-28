import { apiClient } from './api-client'

export interface PartnerEndpoint {
  handle: string
  model: string
  type: 'TYPE_A' | 'TYPE_B' | 'TYPE_C'
  status: string
  latency_ms: number
  uptime: string
  scu_allocated: number
}

export interface PartnerRegistrationPayload {
  handle: string
  model: string
  endpoint_type: string
  input_price_1m: number
  output_price_1m: number
  seabank_account: string
}

export const partnerService = {
  async listEndpoints(): Promise<PartnerEndpoint[]> {
    const res = await apiClient<{ endpoints: PartnerEndpoint[] }>('/api/v1/partner/endpoints')
    return res.endpoints || []
  },

  async registerPartner(payload: PartnerRegistrationPayload) {
    return apiClient<{
      message: string
      handle: string
      model: string
      status: string
      seabank_account: string
      tax_platform_fee: string
      created_at: string
    }>('/api/v1/partner/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async sendHeartbeat() {
    return apiClient<{ status: string; timestamp: number }>('/api/v1/partner/heartbeat', {
      method: 'POST',
      body: JSON.stringify({}),
    })
  },
}
