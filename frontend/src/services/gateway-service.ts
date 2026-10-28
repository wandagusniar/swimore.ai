import { apiClient } from './api-client'

export interface IncidentReportPayload {
  model: string
  partner_handle?: string
  issue_type: string
  description?: string
  source?: string
}

export interface IncidentReportResponse {
  incident_id: string
  model: string
  partner_handle: string
  status: string
  dispatched_channels: string[]
  failover_action: string
  timestamp: string
}

export const gatewayService = {
  async checkHealth(): Promise<boolean> {
    try {
      await fetch('/health')
      return true
    } catch {
      return false
    }
  },

  async reportIncident(payload: IncidentReportPayload): Promise<IncidentReportResponse> {
    return apiClient<IncidentReportResponse>('/api/v1/incidents/report', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async getSystemOverview() {
    return apiClient<{
      system: string
      active_endpoints: number
      total_scu: number
      routing_mode: string
      log_policy: string
      incident_channels: string[]
    }>('/api/v1/admin/overview')
  },
}
