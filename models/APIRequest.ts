import { APIRequestContext } from '@playwright/test'

export interface APIRequest {
  request: APIRequestContext
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, any>
}
