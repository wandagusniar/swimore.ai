import { apiClient } from './api-client'

export interface MidtransWebhookRequest {
  order_id: string
  gross_amount: number | string
  payment_type: string
  transaction_status: string
  signature_key?: string
}

export interface MidtransWebhookResponse {
  order_id: string
  status: string
  payment_type: string
  gross_amount_idr: number
  platform_fee: string
  platform_fee_idr: number
  net_amount_idr: number
  split_action: string
  plan_entitlement: string
}

export const billingService = {
  async processWebhook(payload: MidtransWebhookRequest): Promise<MidtransWebhookResponse> {
    return apiClient<MidtransWebhookResponse>('/api/v1/billing/webhook', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
