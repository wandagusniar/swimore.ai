import { apiClient } from './api-client'
import { PlanTier, QuotaState, UserProfile } from '@/store/session-store'

interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    plan: PlanTier
    is_partner: boolean
  }
}

interface MeResponse {
  id: string
  name: string
  email: string
  plan: PlanTier
  is_partner: boolean
}

interface QuotasResponse {
  plan: PlanTier
  pools: {
    basic: { used: number; limit: number }
    pro: { used: number; limit: number }
    max: { used: number; limit: number }
  }
  resets_at: string
}

export const authService = {
  async login(email?: string, password?: string): Promise<{ token: string; user: UserProfile }> {
    const data = await apiClient<LoginResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    return {
      token: data.token,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        plan: data.user.plan,
        isPartner: data.user.is_partner,
      },
    }
  },

  async getCurrentUser(): Promise<UserProfile> {
    const data = await apiClient<MeResponse>('/api/v1/auth/me')
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      plan: data.plan,
      isPartner: data.is_partner,
    }
  },

  async getQuotas(): Promise<{ plan: PlanTier; quota: QuotaState }> {
    const data = await apiClient<QuotasResponse>('/api/v1/user/quotas')
    return {
      plan: data.plan,
      quota: {
        basicPoolUsed: data.pools.basic.used,
        basicPoolLimit: data.pools.basic.limit,
        proPoolUsed: data.pools.pro.used,
        proPoolLimit: data.pools.pro.limit,
        maxPoolUsed: data.pools.max.used,
        maxPoolLimit: data.pools.max.limit,
        resetsAt: data.resets_at,
      },
    }
  },
}
